'use strict';
const menu = document.getElementById('menu');
const navigation = document.getElementById('navigation');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}));
document.querySelectorAll('[data-interest]').forEach(a => a.addEventListener('click', () => {
  document.getElementById('interest').value = a.dataset.interest;
  if (a.dataset.interest === 'Volunteering & community service') document.getElementById('role').value = 'Volunteer';
  if (a.dataset.interest === 'Children & young people') document.getElementById('role').value = 'Parent or guardian';
  if (a.dataset.interest === 'Adult learning') document.getElementById('role').value = 'Adult learner';
}));
document.querySelectorAll('[data-mode]').forEach(a => a.addEventListener('click', () => {
  document.getElementById('mode').value = a.dataset.mode;
}));
const form = document.getElementById('interest-form');
const review = document.getElementById('review');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  document.getElementById('review-title').textContent = 'Review your enquiry';
  document.getElementById('review-intro').textContent = 'Check your details before opening WhatsApp.';
  document.getElementById('review-note').textContent = 'Your place is not confirmed by sending an enquiry.';
  const data = new FormData(form);
  const value = key => String(data.get(key) || '').trim();
  if (!value('name') || !value('phone')) {
    alert('Please enter your name and contact number.');
    return;
  }
  const lines = ["Assalamu alaikum. I would like to register my interest with Kanzuli Mo'arif Islamic Order.", '',
    'Name: ' + value('name'), 'Contact: ' + value('phone')];
  if (value('email')) lines.push('Email: ' + value('email'));
  lines.push('Enquiring as: ' + value('role'), 'Interest: ' + value('interest'), 'Preferred participation: ' + value('mode'));
  if (value('message')) lines.push('', 'Message: ' + value('message'));
  const message = lines.join('\n');
  document.getElementById('review-text').textContent = message;
  document.getElementById('send-whatsapp').href = 'https://wa.me/2348163823335?text=' + encodeURIComponent(message);
  review.showModal();
});
for (const id of ['close-review', 'edit-form']) document.getElementById(id).addEventListener('click', () => review.close());
review.addEventListener('click', event => { if (event.target === review) {const r = review.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) review.close();} });

