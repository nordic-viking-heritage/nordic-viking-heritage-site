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
    archive.innerHTML = '<div class="wrap"><div class="kicker gold">THE VOYAGE ARCHIVE</div><h2>RELIVE THE JOURNEY — DAY BY DAY</h2><p class="archive-intro">Yesterday remains visible above. Earlier chapters are kept here so the crew can return to the voyage and remember where we were, what we learned and what happened aboard the ship.</p><div class="archive-days"><a class="archive-day current-archive" href="#gallery"><span>DAY 10</span><strong>YESTERDAY\'S CROSSING</strong><small>Visible on this page</small></a><a class="archive-day" href="archive/day-9.html"><span>DAY 9</span><strong>9,904,699 STEPS</strong><small>64 sailors · ≈ 6,438 km</small></a><a class="archive-day" href="archive/day-8.html"><span>DAY 8</span><strong>WHEN ONE OAR RESTS...</strong><small>63 sailors · 8,765,483 steps</small></a><a class="archive-day" href="archive/day-7.html"><span>DAY 7</span><strong>THE CROSSING</strong><small>7,446,095 steps · ≈ 4,840 km</small></a><a class="archive-day" href="archive/day-6.html"><span>DAY 6</span><strong>5,185,209 STEPS</strong><small>51 sailors · ≈ 3,370.4 km</small></a><a class="archive-day" href="archive/day-5.html"><span>DAY 5</span><strong>3,972,538 STEPS</strong><small>48 sailors · ≈ 2,582 km</small></a><a class="archive-day" href="archive/day-4.html"><span>DAY 4</span><strong>THE CROSSING</strong><small>3,071,194 steps · ≈ 1,996 km</small></a><a class="archive-day" href="archive/day-3.html"><span>DAY 3</span><strong>1,859,699 STEPS</strong><small>42 sailors · ≈ 1,208.8 km</small></a><a class="archive-day" href="archive/day-2.html"><span>DAY 2</span><strong>897,818 STEPS</strong><small>29 sailors · ≈ 583.6 km</small></a><a class="archive-day" href="archive/day-1.html"><span>DAY 1</span><strong>THE JOURNEY BEGINS</strong><small>29 sailors · 733,419 steps</small></a></div></div></div>';
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