// main.js - small interactivity: responsive nav toggle & contact form validation

document.addEventListener('DOMContentLoaded', () => {
  // nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if(toggle){
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // simple accessible form validation for contact form
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      clearErrors();
      const name = contactForm.querySelector('input[name="name"]').value.trim();
      const email = contactForm.querySelector('input[name="email"]').value.trim();
      const phone = contactForm.querySelector('input[name="phone"]').value.trim();
      const role = contactForm.querySelector('input[name="role"]').value.trim();

      let valid = true;
      if(name.length < 2){ showError('name','Please enter your full name'); valid = false; }
      if(!validateEmail(email)){ showError('email','Please enter a valid email'); valid = false; }
      if(!/^\+?[\d\s\-]{7,15}$/.test(phone)){ showError('phone','Please enter a valid phone number'); valid = false; }
      if(role.length < 2){ showError('role','Please specify your role/relation'); valid = false; }

      if(valid){
        // If you are using Netlify forms, simply allow the form to submit.
        // For demo here we show success and reset.
        contactForm.querySelector('.form-status').textContent = 'Thanks — your message is received!';
        contactForm.reset();
      }
    });
  }

  function showError(fieldName, msg){
    const input = document.querySelector(`[name="${fieldName}"]`);
    if(!input) return;
    const err = document.createElement('div');
    err.className = 'error';
    err.textContent = msg;
    input.setAttribute('aria-invalid','true');
    input.parentNode.appendChild(err);
  }
  function clearErrors(){
    document.querySelectorAll('.error').forEach(e => e.remove());
    document.querySelectorAll('[aria-invalid="true"]').forEach(i => i.removeAttribute('aria-invalid'));
    const status = document.querySelector('.form-status');
    if(status) status.textContent = '';
  }
  function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
