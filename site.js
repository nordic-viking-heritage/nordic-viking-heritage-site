(() => {
  const roll = document.querySelector('.ship-roll .roll-grid');
  if (roll && !document.querySelector('.captain-roll')) {
    const captain = document.createElement('article');
    captain.className = 'captain-roll';
    captain.innerHTML = '<span class="captain-label">THE CAPTAIN</span><span>Stefan</span><strong>HÁKON</strong><small class="old-norse">Hákon</small><small class="runes">ᚼᛅᚴᚢᚾ</small>';
    roll.parentNode.insertBefore(captain, roll);
  }

  const archive = document.getElementById('voyage-archive');
  if (archive) {
    const days = [
      {day:15,title:'CHAPTER I COMPLETE',meta:'72 sailors · 19,155,478 steps · ≈ 12,451.1 km',img:'wide_cinematic_promotional_poster_infographic_styl.png',alt:'Viking Dispatch — Day 15',href:'#dispatch'},
      {day:14,title:'THE POWER OF SIXTY OARS',meta:'72 sailors · 17,840,511 steps · ≈ 11,596.3 km',img:'day-14-history.jpg',alt:'History — Day 14',href:'#history-day-14'},
      {day:13,title:'THE SILENCE AFTER THE STORM',meta:'71 sailors · 15,984,888 steps · ≈ 10,390.2 km',img:'day-13-dispatch.png',alt:'Viking Dispatch — Day 13',href:'archive/day-13.html'},
      {day:12,title:'THE OCEAN IS LOSING GROUND',meta:'69 sailors · 14,331,674 steps · ≈ 9,315.6 km',img:'day-12-dispatch.jpg',alt:'Viking Dispatch — Day 12',href:'archive/day-12.html'},
      {day:11,title:'THE SEA CHANGES',meta:'66 sailors · 12,567,373 steps · ≈ 8,168.8 km',img:'3603CAC6-D075-49DC-A4AC-C0DA57129282.png',alt:'Viking Dispatch — Day 11',href:'archive/day-11.html'},
      {day:10,title:'WESTWARD',meta:'65 sailors · 11,159,358 steps · ≈ 7,253.6 km',img:'day-10-dispatch.jpg',alt:'Viking Dispatch — Day 10',href:'archive/day-10.html'},
      {day:9,title:'THE TEN MILLION HORIZON',meta:'64 sailors · 9,904,699 steps · ≈ 6,438 km',img:'day-9-dispatch.jpg',alt:'The Ten Million Horizon — Day 9',href:'archive/day-9.html'},
      {day:8,title:'WHEN ONE OAR RESTS...',meta:'63 sailors · 8,765,483 steps',img:'day-8-dispatch.jpg',alt:'When One Oar Rests, The Others Pull Harder — Day 8',href:'archive/day-8.html'},
      {day:7,title:'THE CROSSING',meta:'7,446,095 steps · ≈ 4,840 km',img:'day-7-dispatch.jpg',alt:'The fleet at sea — Day 7',href:'archive/day-7.html'},
      {day:6,title:'5,185,209 STEPS',meta:'51 sailors · ≈ 3,370.4 km',img:'viking-dispatch-day-6.png',alt:'Viking Dispatch — Day 6',href:'archive/day-6.html'},
      {day:5,title:'3,972,538 STEPS',meta:'48 sailors · ≈ 2,582 km',img:'hero.png',alt:'Viking Voyage II opening artwork',href:'archive/day-5.html'},
      {day:4,title:'THE CROSSING',meta:'3,071,194 steps · ≈ 1,996 km',img:'hero.png',alt:'Viking Voyage II opening artwork',href:'archive/day-4.html'},
      {day:3,title:'1,859,699 STEPS',meta:'42 sailors · ≈ 1,208.8 km',img:'hero.png',alt:'Viking Voyage II opening artwork',href:'archive/day-3.html'},
      {day:2,title:'897,818 STEPS',meta:'29 sailors · ≈ 583.6 km',img:'hero.png',alt:'Viking Voyage II opening artwork',href:'archive/day-2.html'},
      {day:1,title:'THE JOURNEY BEGINS',meta:'29 sailors · 733,419 steps',img:'hero.png',alt:'Viking Voyage II opening artwork',href:'archive/day-1.html'}
    ];
    const cards = days.map(d => `<a class="archive-day" href="${d.href}"><div class="archive-day-image"><img src="${d.img}" alt="${d.alt}" loading="lazy"></div><div class="archive-day-copy"><span>DAY ${d.day}</span><strong>${d.title}</strong><small>${d.meta}</small></div></a>`).join('');
    archive.classList.add('voyage-archive','dark-section');
    archive.innerHTML = `<div class="wrap"><div class="kicker gold">THE VOYAGE ARCHIVE</div><h2>RELIVE THE JOURNEY — DAY BY DAY</h2><p class="archive-intro">Every completed day remains part of the voyage. The first five days share our opening artwork — before the daily Dispatch tradition began. From Day 6 onward, the archive carries the day's visual record. Open a chapter to return to the voyage.</p><div class="archive-days">${cards}</div></div>`;
  }

  const addDay15Artwork = (selector, src, alt, caption, placement = 'append', figureClass = 'framed') => {
    const section = document.querySelector(selector);
    if (!section || section.querySelector(`img[src="${src}"]`)) return;
    const figure = document.createElement('figure');
    figure.className = selector === '#honors' ? 'framed light' : figureClass;
    figure.innerHTML = `<img class="zoomable" src="${src}" alt="${alt}" loading="lazy" /><figcaption>${caption}</figcaption>`;
    if (placement === 'before-naming') {
      const list = section.querySelector('.naming-list');
      if (list) list.parentNode.insertBefore(figure, list); else section.querySelector('.wrap')?.appendChild(figure);
    } else {
      const copy = section.querySelector('.copy') || section.querySelector('.wrap');
      copy?.appendChild(figure);
    }
  };

  addDay15Artwork('#dispatch', 'wide_cinematic_promotional_poster_infographic_styl.png', 'Viking Dispatch — Day 15', 'VIKING DISPATCH — DAY 15');
  addDay15Artwork('#voyage-map', 'wide_cinematic_illustrated_infographic_map_poster.png', 'The Voyage Map — Day 15, Chapter I complete', 'THE VOYAGE MAP — DAY 15 · CHAPTER I COMPLETE', 'append', 'wide-map');
  addDay15Artwork('#our-saga-day-15', 'a_dramatic_cinematic_nighttime_scene_over_a_dark.png', 'Our Saga — Day 15, The Empty Sky', 'OUR SAGA — DAY 15 · THE EMPTY SKY');
  addDay15Artwork('#honors', 'a_dramatic_cinematic_viking_themed_poster_image_i.png', 'Crew Honors — Day 15', 'CREW HONORS — DAY 15', 'before-naming');
  addDay15Artwork('#chapter-one-complete', 'a_dramatic_epic_poster_illustration_scene_a_cinem.png', 'Viking Voyage II — Chapter I finale', 'CHAPTER I · THE NORTH ATLANTIC CROSSING IS COMPLETE');

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
  const openImage = img => {
    full.src = img.src;
    full.alt = img.alt || 'Enlarged voyage artwork';
    box.classList.add('open');
    box.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    close.focus();
  };
  document.addEventListener('click', e => {
    const img = e.target.closest?.('img.zoomable');
    if (img) openImage(img);
  });
  document.addEventListener('keydown', e => {
    const img = e.target.closest?.('img.zoomable');
    if (img && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openImage(img); }
    if (e.key === 'Escape' && box.classList.contains('open')) shut();
  });
  document.querySelectorAll('img.zoomable').forEach(img => {
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `${img.alt || 'Voyage artwork'} — tap to enlarge`);
  });
  close.addEventListener('click', shut);
  box.addEventListener('click', e => { if (e.target === box) shut(); });
})();