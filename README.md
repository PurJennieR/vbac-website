# VBAC Modern Website (Lite, ปวส.ปี 2)

โครงเว็บตัวอย่างที่ทำให้ใช้งานจริงบน GitHub Pages ได้ทันที ครอบคลุมตามโจทย์ 10 ข้อ:
1) ยึดโครงสร้างจากเว็บเดิม (เมนู/หน้า) 2) Google Analytics (GA4) 3) UX/UI ทันสมัย
4) ลูกเล่น Animation 5) โฮสต์บน GitHub Pages 6) ข่าวสารอัตโนมัติจาก JSON/Google Sheet
7) Contact Form + Validation (Formspree/Google Forms) 8) Dark Mode
9) แบบสอบถาม/โพล (ฝัง Google Forms/Typeform) 10) FAQ แบบ collapsible

## วิธีติดตั้งอย่างย่อ
1. อัปโหลดโฟลเดอร์ทั้งหมดขึ้น GitHub → สร้าง repo ชื่อ `vbac-modern`
2. เปิดใช้งาน GitHub Pages: Settings → Pages → Source: `main` → `/root`
3. แก้ไขไฟล์ตามต้องการ เช่น โลโก้ ข้อความข่าว สี ฯลฯ
4. แทนที่ Measurement ID ของ GA4 (G-XXXXXXXXXX)

## ตั้งค่า Google Analytics 4 (GA4)
- ไปที่ analytics.google.com → สร้าง Property → ได้ Measurement ID รูปแบบ `G-VDE03CD77G`
- เปิดไฟล์ `index.html`, `news.html`, `contact.html`, `faq.html` แล้วแทนที่ `G-VDE03CD77G`

## ระบบข่าวจาก Google Sheets (ทางเลือก)
1) สร้าง Google Sheet โดยมีคอลัมน์: `date,title,content` (บรรทัดแรกเป็นหัวตาราง)
2) เมนู `ไฟล์` → `เผยแพร่ไปยังเว็บ` → เลือกชีต → รูปแบบ `CSV` → คัดลอก URL ที่ได้
3) เปิด `js/news.js` แล้วตั้งค่า
```js
window.SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1ebogKW8A_QapEt6fhiEp7TuJGPZtG8WYE8wTQRWDrj0/edit?usp=sharing';
```
4) เปิดหน้า `news.html` แล้วติ๊กสวิตช์ "ใช้ Google Sheet"

## แบบฟอร์มติดต่อ (Formspree)
1) ไปที่ formspree.io → Create form → ได้ลิงก์รูปแบบ `https://formspree.io/f/xwpqzolr`
2) เปิด `contact.html` แทนที่ action ของฟอร์มให้เป็นลิงก์ของคุณ
3) ทดสอบส่ง → ดูผลในแดชบอร์ด Formspree

## แบบสอบถาม/โพล
- ใช้ Google Forms: กด ส่ง → แท็บ `< >` → คัดลอก iframe → แทนที่ใน `contact.html`
- หรือ Typeform: ใช้โค้ดฝังที่ Typeform ให้มา

## แก้ไขหน้าตา/ธีม
- แก้ตัวแปรสีที่ `css/style.css` (section: Design Tokens)
- ปุ่ม Dark Mode จะจำค่าที่เลือกไว้ใน `localStorage` และอ้างอิงจาก system theme

## เงื่อนไข UX/UI ที่ใช้
- โครงสร้างแบบ mobile-first, เมนู hamburger, ปุ่มเข้าถึงเนื้อหา (skip link)
- คอนทราสต์สูง, โฟกัส ring ชัดเจน, ฟอร์มมีข้อความสถานะ (aria-live)
- การเปิด/ยุบ FAQ ใช้ `<details>`/`<summary>` เพื่อการเข้าถึงที่ดี

## โค้ดข่าวแบบ JSON
แก้ไขไฟล์ `data/news.json` ได้โดยไม่ต้องแตะโค้ด
