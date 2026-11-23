/* Adib Zobri portfolio: interactivity (menu, filter, modal, copy email) */
'use strict';

// Render Lucide icons (skipped safely if the CDN is blocked)
if (window.lucide) { lucide.createIcons(); }
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.getElementById('menuBtn'), mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('hidden') === false;
  menuBtn.setAttribute('aria-expanded', open);
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mobileMenu.classList.add('hidden'); menuBtn.setAttribute('aria-expanded', false); }));

// Project filter
const filterBtns = document.querySelectorAll('.filter-btn'), projects = document.querySelectorAll('.project');
filterBtns.forEach(btn => btn.addEventListener('click', () => {
  filterBtns.forEach(b => b.setAttribute('aria-pressed', b === btn));
  projects.forEach(p => p.classList.toggle('hidden', btn.dataset.filter !== 'all' && p.dataset.cat !== btn.dataset.filter));
}));

// Project modal
const data = {
  billsync: {
    meta: '2026 | Full-Stack Developer / Final Year Project',
    title: 'BillSync — Centralized Billing & Subscription Aggregation Platform',
    points: ['Built a full-stack billing aggregation platform using Laravel MVC, Tailwind CSS, JavaScript, and MySQL to help households manage recurring utilities and multi-commitment expenses.', 'Engineered automated bill categorization, due-date tracking, and a unified analytics dashboard for clear monthly financial visibility.'],
    stack: ['Laravel','PHP','Tailwind CSS','JavaScript','MySQL']
  },
  smartcampus: {
    meta: '2026 | Back-End Developer',
    title: 'Web-Based SmartCampus Directory & Room Reservation Hub',
    points: ['Architected a centralized campus directory and room reservation system for UiTM Arau across 6 core modules using Laravel and a 4-table MySQL relational database.', 'Implemented a secure RESTful API with Role-Based Access Control (RBAC), conditional booking validation logic to prevent scheduling conflicts, and an admin analytics dashboard.', 'Integrated an external QR Code Generator API linking physical campus spaces to real-time digital facility info and instant booking workflows.'],
    stack: ['Laravel','RESTful API','RBAC','MySQL','QR Code API']
  }
};
const modal = document.getElementById('modal');
let lastFocus;
function openModal(id) {
  const d = data[id]; lastFocus = document.activeElement;
  document.getElementById('modalMeta').textContent = d.meta;
  document.getElementById('modalTitle').textContent = d.title;
  document.getElementById('modalPoints').innerHTML = d.points.map(p => `<li>${p}</li>`).join('');
  document.getElementById('modalStack').innerHTML = d.stack.map(s => `<li class="chip rounded-full px-3 py-1">${s}</li>`).join('');
  modal.classList.remove('hidden'); modal.classList.add('flex');
  document.getElementById('closeModal').focus();
}
function closeModal() { modal.classList.add('hidden'); modal.classList.remove('flex'); if (lastFocus) lastFocus.focus(); }
document.querySelectorAll('.open-modal').forEach(b => b.addEventListener('click', () => openModal(b.dataset.id)));
document.getElementById('closeModal').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal(); });

// Copy email + toast
const toast = document.getElementById('toast');
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.remove('opacity-0', 'translate-y-4');
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => toast.classList.add('opacity-0', 'translate-y-4'), 2200);
}
document.getElementById('copyEmail').addEventListener('click', async () => {
  const email = document.getElementById('emailText').textContent.trim();
  try { await navigator.clipboard.writeText(email); showToast('Email copied to clipboard'); }
  catch (err) {
    const t = document.createElement('textarea'); t.value = email; document.body.appendChild(t); t.select();
    try { document.execCommand('copy'); showToast('Email copied to clipboard'); } catch (e) { showToast('Copy failed. Select the email and copy it manually.'); }
    t.remove();
  }
});