// ===== News loader =====
// Supports: Local JSON (data/news.json) or Google Sheets (published CSV link)
// Usage:
//   loadNews('newsList', { limit: 5, sort: 'desc', source: 'json' })
//   OR set window.SHEETS_CSV_URL and call with source: 'sheet'

async function fetchJSONNews() {
  const res = await fetch('data/news.json?_=' + Date.now());
  if (!res.ok) throw new Error('โหลด news.json ไม่สำเร็จ');
  return await res.json();
}

async function fetchSheetCSV() {
  if (!window.SHEETS_CSV_URL) throw new Error('ยังไม่ตั้งค่า SHEETS_CSV_URL');
  const res = await fetch(window.SHEETS_CSV_URL + '&_=' + Date.now());
  if (!res.ok) throw new Error('โหลด Google Sheet ไม่สำเร็จ');
  const text = await res.text();
  // Very small CSV parser for 3 columns: date,title,content (no commas inside fields)
  const lines = text.trim().split(/\r?\n/);
  const rows = lines.slice(1).map(line => line.split(','));
  return rows.map(r => ({ date: r[0], title: r[1], content: r.slice(2).join(',') }));
}

function normalizeNewsItem(n) {
  // Ensure has date, title, content
  return {
    title: n.title || '(ไม่มีหัวข้อ)',
    date: n.date || '',
    content: n.content || ''
  };
}

function renderNewsCard(n) {
  const date = n.date ? new Date(n.date) : null;
  const dateStr = date && !isNaN(date) ? date.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
  return `<article class="card reveal">
    <h3>${n.title}</h3>
    <p class="muted">${dateStr}</p>
    <p>${n.content}</p>
  </article>`;
}

async function loadNews(containerId, opts = {}) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const { limit = 0, sort = 'desc', source } = opts;
  let list = [];
  try {
    list = source === 'sheet' ? await fetchSheetCSV() : await fetchJSONNews();
  } catch (err) {
    el.innerHTML = `<p class="muted">โหลดข่าวไม่สำเร็จ: ${err.message}</p>`;
    return;
  }
  list = list.map(normalizeNewsItem).filter(n => n.title && n.date);
  list.sort((a,b) => (sort === 'asc' ? (new Date(a.date)-new Date(b.date)) : (new Date(b.date)-new Date(a.date))));
  if (limit > 0) list = list.slice(0, limit);
  el.innerHTML = list.map(renderNewsCard).join('');
  // trigger reveal observer for new cards
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.remove('visible');
    // rely on main.js observer automatically attached on DOMContentLoaded
  });
}

// ===== News page helpers =====
function initNewsPage() {
  const search = document.getElementById('searchNews');
  const sortSel = document.getElementById('sortNews');
  const useSheet = document.getElementById('useSheet');
  const container = document.getElementById('newsList');

  async function refresh() {
    const source = useSheet.checked ? 'sheet' : 'json';
    await loadNews('newsList', { sort: sortSel.value, source });
    // filter by text after load
    applyFilter();
  }

  function applyFilter() {
    const q = (search.value || '').toLowerCase();
    const cards = container.querySelectorAll('.card');
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
  }

  search.addEventListener('input', applyFilter);
  sortSel.addEventListener('change', refresh);
  useSheet.addEventListener('change', refresh);

  // Example: set your published CSV url here
  window.SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1ebogKW8A_QapEt6fhiEp7TuJGPZtG8WYE8wTQRWDrj0/edit?usp=sharinghttps://docs.google.com/spreadsheets/d/e/2PACX-1vTQH0u0jh4UPy1adRfwolTuKtHjydRT3qXuFQNDhEwPr7jLLiE8DsGn6FPHqTDuTKbhr1AYNTYd6QsC/pub?output=csv';
  refresh();
  
}
