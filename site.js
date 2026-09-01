(() => {
  const roll = document.querySelector('.ship-roll .roll-grid');
  if (roll && !document.querySelector('.captain-roll')) {
    const captain = document.createElement('article');
    captain.className = 'captain-roll';
    captain.innerHTML = '<span class="captain-label">THE CAPTAIN</span><span>Stefan</span><strong>HÁKON</strong><small class="old-norse">Hákon</small><small class="runes">ᚼᛅᚴᚢᚾ</small>';
    roll.parentNode.insertBefore(captain, roll);
  }

  const gallery = document.getElementById('gallery');
  if (gallery && !document.getElementById('voyage-archive')) {
    const archive = document.createElement('section');
    archive.className = 'voyage-archive dark-section';
    archive.id = 'voyage-archive';
    archive.innerHTML = '<div class="wrap"><div class="kicker gold">THE VOYAGE ARCHIVE</div><h2>RELIVE THE JOURNEY — DAY BY DAY</h2><p class="archive-intro">Yesterday remains visible above. Earlier chapters are kept here so the crew can return to the voyage and remember where we were, what we learned and what happened aboard the ship.</p><div class="archive-days"><a class="archive-day current-archive" href="#gallery"><span>DAY 10</span><strong>YESTERDAY\'S CROSSING</strong><small>Visible on this page</small></a><div class="archive-coming"><span>THE LOGBOOK GROWS WITH THE VOYAGE</span><p>As each new day begins, yesterday stays visible and the older days take their place in this archive.</p></div></div></div>';
    gallery.insertAdjacentElement('afterend', archive);
  }

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