(() => {
  const box = document.getElementById('lightbox');
  if (!box) return;
  const full = box.querySelector('img');
  const close = box.querySelector('button');
  const shut = () => {
    box.classList.remove('open');
    box.setAttribute('aria-hidden', 'true');
    full.removeAttribute('src');
    document.body.classList.remove('lightbox-open');
  };
  document.querySelectorAll('img.zoomable').forEach(img => {
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `${img.alt || 'Voyage artwork'} — tap to enlarge`);
    const open = () => {
      full.src = img.src;
      full.alt = img.alt || 'Enlarged voyage artwork';
      box.classList.add('open');
      box.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
      close.focus();
    };
    img.addEventListener('click', open);
    img.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });
  close.addEventListener('click', shut);
  box.addEventListener('click', e => { if (e.target === box) shut(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && box.classList.contains('open')) shut(); });
})();