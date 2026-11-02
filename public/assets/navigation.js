(() => {
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  if (!button || !nav) return;
  const setOpen = (open, focus = false) => {
    button.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    if (focus) button.focus();
  };
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (event) => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') setOpen(false, true); });
  document.addEventListener('click', (event) => { if (!event.target.closest('.site-header')) setOpen(false); });
  button.hidden = false;
  document.documentElement.classList.add('nav-ready');
})();
