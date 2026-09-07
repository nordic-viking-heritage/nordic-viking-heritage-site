(() => {
  // Generic site behaviour only. Current voyage content is rendered directly
  // from index.html and must never be overwritten by a previous day's script.

  const box = document.getElementById('lightbox');
  if (!box) return;

  const full = box.querySelector('img');
  const close = box.querySelector('button');

  const shut = () => {
    box.classList.remove('open');
    box.setAttribute('aria-hidden', 'true');
    if (full) full.removeAttribute('src');
    document.body.classList.remove('lightbox-open');
  };

  const openImage = (img) => {
    if (!full || !img) return;
    full.src = img.src;
    full.alt = img.alt || 'Enlarged voyage artwork';
    box.classList.add('open');
    box.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  };

  document.querySelectorAll('img.zoomable, .framed img, .gallery-grid img').forEach((img) => {
    img.addEventListener('click', () => openImage(img));
  });

  if (close) close.addEventListener('click', shut);
  box.addEventListener('click', (event) => {
    if (event.target === box) shut();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') shut();
  });
})();
