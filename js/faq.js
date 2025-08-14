const list = document.getElementById('faqList');
const searchFaq = document.getElementById('faqSearch');
if (searchFaq) {
  searchFaq.addEventListener('input', () => {
    const q = searchFaq.value.toLowerCase();
    list.querySelectorAll('.faq-item').forEach(item => {
      const txt = item.textContent.toLowerCase();
      item.style.display = txt.includes(q) ? '' : 'none';
    });
  });
}
