(() => {
  // Current voyage content remains in index.html. This script only restores
  // stable layout/behaviour and the voyage archive; it never rewrites day data.

  // Safe, scoped visual corrections. Kept here to avoid replacing the complete
  // minified stylesheet while preserving all existing site styles.
  if (!document.getElementById('day17-layout-fixes')) {
    const style = document.createElement('style');
    style.id = 'day17-layout-fixes';
    style.textContent = `
      .ship-roll > .wrap { border: 1px solid rgba(211,177,106,.55); padding: clamp(22px,4vw,42px); box-shadow: inset 0 0 0 1px rgba(211,177,106,.08); }
      #myth-day-17 { padding-top: 92px; padding-bottom: 92px; }
      #night-watch-day-17 { padding-top: 96px; }
      @media (max-width:800px) { .ship-roll > .wrap { padding: 22px 18px; } #myth-day-17 { padding-top: 82px; } #night-watch-day-17 { padding-top: 86px; } }
    `;
    document.head.appendChild(style);
  }

  const roll = document.querySelector('.ship-roll .roll-grid');
  if (roll && !document.querySelector('.captain-roll')) {
    const captain = document.createElement('article');
    captain.className = 'captain-roll';
    captain.innerHTML = '<span class="captain-label">THE CAPTAIN</span><span>Stefan</span><strong>HÁKON</strong><small class="old-norse">Hákon</small><small class="runes">ᚼᛅᚴᚢᚾ</small>';
    roll.parentNode.insertBefore(captain, roll);
  }

  const ourSaga = document.getElementById('our-saga-day-17');
  if (ourSaga && !ourSaga.querySelector('img[src="day-17-our-saga.jpg"]')) {
    const copy = ourSaga.querySelector('.copy');
    if (copy) {
      const figure = document.createElement('figure');
      figure.className = 'framed';
      figure.innerHTML = '<img class="zoomable" src="day-17-our-saga.jpg" alt="Our Saga — Day 17" loading="lazy"><figcaption>OUR SAGA — DAY 17</figcaption>';
      copy.appendChild(figure);
    }
  }

  const honors = document.getElementById('honors');
  if (honors) {
    const figure = honors.querySelector('figure');
    const naming = honors.querySelector('.naming-list');
    if (figure && naming) { figure.classList.add('light'); naming.parentNode.insertBefore(figure, naming); }
  }

  const archive = document.getElementById('voyage-archive');
  if (archive) {
    const days = [
      {day:17,title:'THE SEA CHANGED OUR COURSE',meta:'82 sailors · 25,877,873 steps · ≈ 16,820.6 km',img:'day-17-viking-dispatch.png',alt:'Viking Dispatch — Day 17',href:'#dispatch'},
      {day:16,title:'CHAPTER II HAS BEGUN',meta:'73 sailors · 20,646,067 steps · ≈ 13,419.9 km',img:'day-16-map.png',alt:'Viking Voyage II — Day 16',href:'archive/day-16.html'},
      {day:15,title:'CHAPTER I COMPLETE',meta:'72 sailors · 19,155,478 steps · ≈ 12,451.1 km',img:'wide_cinematic_promotional_poster_infographic_styl.png',alt:'Viking Dispatch — Day 15',href:'archive/day-15.html'},
      {day:14,title:'THE POWER OF SIXTY OARS',meta:'72 sailors · 17,840,511 steps · ≈ 11,596.3 km',img:'day-14-history.jpg',alt:'History — Day 14',href:'archive/day-14.html'},
      {day:13,title:'THE SILENCE AFTER THE STORM',meta:'71 sailors · 15,984,888 steps · ≈ 10,390.2 km',img:'day-13-dispatch.png',alt:'Viking Dispatch — Day 13',href:'archive/day-13.html'},
      {day:12,title:'THE OCEAN IS LOSING GROUND',meta:'69 sailors · 14,331,674 steps · ≈ 9,315.6 km',img:'day-12-dispatch.jpg',alt:'Viking Dispatch — Day 12',href:'archive/day-12.html'},
      {day:11,title:'THE SEA CHANGES',meta:'66 sailors · 12,567,373 steps · ≈ 8,168.8 km',img:'3603CAC6-D075-49DC-A4AC-C0DA57129282.png',alt:'Viking Dispatch — Day 11',href:'archive/day-11.html'},
      {day:10,title:'WESTWARD',meta:'65 sailors · 11,159,358 steps · ≈ 7,253.6 km',img:'day-10-dispatch.jpg',alt:'Viking Dispatch — Day 10',href:'archive/day-10.html'},
      {day:9,title:'THE TEN MILLION HORIZON',meta:'64 sailors · 9,904,699 steps · ≈ 6,438 km',img:'day-9-dispatch.jpg',alt:'The Ten Million Horizon — Day 9',href:'archive/day-9.html'},
      {day:8,title:'WHEN ONE OAR RESTS...',meta:'63 sailors · 8,765,483 steps',img:'day-8-dispatch.jpg',alt:'Viking Dispatch — Day 8',href:'archive/day-8.html'},
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
    archive.innerHTML = `<div class="wrap"><div class="kicker gold">THE VOYAGE ARCHIVE</div><h2>RELIVE THE JOURNEY — DAY BY DAY</h2><p class="archive-intro">Every completed day remains part of the voyage. Chapter I is frozen in the archive; Chapter II continues from the North American mainland toward Newfoundland.</p><div class="archive-days">${cards}</div></div>`;
  }

  const box = document.getElementById('lightbox');
  if (!box) return;
  const full = box.querySelector('img');
  const close = box.querySelector('button');
  const shut = () => { box.classList.remove('open'); box.setAttribute('aria-hidden','true'); if (full) full.removeAttribute('src'); document.body.classList.remove('lightbox-open'); };
  const openImage = img => { if (!full || !img) return; full.src = img.src; full.alt = img.alt || 'Enlarged voyage artwork'; box.classList.add('open'); box.setAttribute('aria-hidden','false'); document.body.classList.add('lightbox-open'); };
  document.querySelectorAll('img.zoomable, .framed img, .gallery-grid img, .archive-day img').forEach(img => {
    img.addEventListener('click', event => { if (img.closest('a.archive-day')) return; event.preventDefault(); openImage(img); });
  });
  if (close) close.addEventListener('click', shut);
  box.addEventListener('click', event => { if (event.target === box) shut(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') shut(); });
})();
