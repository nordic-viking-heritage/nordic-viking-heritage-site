(() => {
  const roll = document.querySelector('.ship-roll .roll-grid');
  if (roll && !document.querySelector('.captain-roll')) {
    const captain = document.createElement('article');
    captain.className = 'captain-roll';
    captain.innerHTML = '<span class="captain-label">THE CAPTAIN</span><span>Stefan</span><strong>HÁKON</strong><small class="old-norse">Hákon</small><small class="runes">ᚼᛅᚴᚢᚾ</small>';
    roll.parentNode.insertBefore(captain, roll);
  }

  const archiveAnchor = document.getElementById('archive') || document.getElementById('gallery');
  if (archiveAnchor && !document.getElementById('voyage-archive')) {
    const days = [
      {day:11,title:'THE SEA CHANGES',meta:'66 sailors · 12,567,373 steps · ≈ 8,168.8 km',img:'3603CAC6-D075-49DC-A4AC-C0DA57129282.png',alt:'Viking Dispatch — Day 11'},
      {day:10,title:'WESTWARD',meta:'65 sailors · 11,159,358 steps · ≈ 7,253.6 km',img:'day-10-dispatch.jpg',alt:'Viking Dispatch — Day 10'},
      {day:9,title:'THE TEN MILLION HORIZON',meta:'64 sailors · 9,904,699 steps · ≈ 6,438 km',img:'day-9-dispatch.jpg',alt:'The Ten Million Horizon — Day 9'},
      {day:8,title:'WHEN ONE OAR RESTS...',meta:'63 sailors · 8,765,483 steps',img:'day-8-dispatch.jpg',alt:'When One Oar Rests, The Others Pull Harder — Day 8'},
      {day:7,title:'THE CROSSING',meta:'7,446,095 steps · ≈ 4,840 km',img:'day-7-dispatch.jpg',alt:'The fleet at sea — Day 7'},
      {day:6,title:'5,185,209 STEPS',meta:'51 sailors · ≈ 3,370.4 km',img:'viking-dispatch-day-6.png',alt:'Viking Dispatch — Day 6'},
      {day:5,title:'3,972,538 STEPS',meta:'48 sailors · ≈ 2,582 km',img:'hero.png',alt:'Viking Voyage II opening artwork'},
      {day:4,title:'THE CROSSING',meta:'3,071,194 steps · ≈ 1,996 km',img:'hero.png',alt:'Viking Voyage II opening artwork'},
      {day:3,title:'1,859,699 STEPS',meta:'42 sailors · ≈ 1,208.8 km',img:'hero.png',alt:'Viking Voyage II opening artwork'},
      {day:2,title:'897,818 STEPS',meta:'29 sailors · ≈ 583.6 km',img:'hero.png',alt:'Viking Voyage II opening artwork'},
      {day:1,title:'THE JOURNEY BEGINS',meta:'29 sailors · 733,419 steps',img:'hero.png',alt:'Viking Voyage II opening artwork'}
    ];
    const cards = days.map(d => `<a class="archive-day" href="archive/day-${d.day}.html"><div class="archive-day-image"><img src="${d.img}" alt="${d.alt}" loading="lazy"></div><div class="archive-day-copy"><span>DAY ${d.day}</span><strong>${d.title}</strong><small>${d.meta}</small></div></a>`).join('');
    const archive = document.createElement('section');
    archive.className = 'voyage-archive dark-section';
    archive.id = 'voyage-archive';
    archive.innerHTML = `<div class="wrap"><div class="kicker gold">THE VOYAGE ARCHIVE</div><h2>RELIVE THE JOURNEY — DAY BY DAY</h2><p class="archive-intro">Every completed day remains part of the voyage. The first five days share our opening artwork — before the daily Dispatch tradition began. From Day 6 onward, the archive carries the day's own visual record. Open a chapter to return to the Captain's Log.</p><div class="archive-days">${cards}</div></div>`;
    archiveAnchor.insertAdjacentElement('afterend', archive);
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