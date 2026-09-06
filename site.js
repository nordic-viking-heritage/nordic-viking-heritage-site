(() => {
  const roll = document.querySelector('.ship-roll .roll-grid');
  if (roll && !document.querySelector('.captain-roll')) {
    const captain = document.createElement('article');
    captain.className = 'captain-roll';
    captain.innerHTML = '<span class="captain-label">THE CAPTAIN</span><span>Stefan</span><strong>HÁKON</strong><small class="old-norse">Hákon</small><small class="runes">ᚼᛅᚴᚢᚾ</small>';
    roll.parentNode.insertBefore(captain, roll);
  }

  const shipRollSection = document.querySelector('.ship-roll');
  const honorsSection = document.getElementById('honors');
  if (shipRollSection && honorsSection) {
    shipRollSection.id = 'ship-roll';
    honorsSection.parentNode.insertBefore(shipRollSection, honorsSection);
    document.querySelectorAll('a[href="#honors"]').forEach(link => link.setAttribute('href', '#ship-roll'));
  }

  const status = document.getElementById('voyage');
  if (status) {
    const head = status.querySelector('.status-head > div');
    const stats = status.querySelector('.stats');
    if (head) head.innerHTML = '<div class="kicker red">THE SHIP\'S LOG — DAY 16</div><h1>CHAPTER II HAS BEGUN</h1><p>Real activity in Pacer moves the ship. Chapter I is frozen behind us; the fleet is now sailing south toward Newfoundland.</p>';
    if (stats) stats.innerHTML = '<article><strong>73</strong><small>SAILORS ABOARD</small><em>One crew</em></article><article><strong>20,646,067</strong><small>TOTAL STEPS</small><em>Steps toward Florida</em></article><article><strong>≈ 13,419.9 KM</strong><small>DISTANCE COVERED</small><em>From Greenland</em></article><article><strong>27.53%</strong><small>OF OUR GOAL</small><em>75,000,000 steps</em></article>';
  }

  const dispatch = document.getElementById('dispatch');
  if (dispatch) dispatch.innerHTML = '<div class="wrap"><div class="copy"><div class="kicker gold">VIKING DISPATCH — DAY 16</div><h2>CHAPTER II HAS BEGUN</h2><p><strong>73 Vikings</strong> have carried the fleet to <strong>20,646,067 steps</strong> — approximately <strong>13,419.9 km</strong> since Greenland.</p><p>Chapter I is now behind us and permanently written into the voyage. Since reaching the North American mainland, the crew has added <strong>1,490,589 steps</strong> — nearly <strong>969 km</strong>.</p><p>The fleet has completed <strong>27.53%</strong> of the full 75,000,000-step voyage. <strong>54,353,933 steps</strong> — approximately <strong>35,330.1 km</strong> — remain before Florida.</p><p>The bow has turned south. The next destination is <strong>Newfoundland</strong>.</p><p><strong>73 VIKINGS. ONE CREW. ONE SHIP.</strong><br><strong>CHAPTER II HAS BEGUN.</strong></p></div></div>';

  const map = document.getElementById('voyage-map');
  if (map) map.innerHTML = '<div class="wrap"><div class="kicker gold">THE VOYAGE MAP — DAY 16</div><h2>CHAPTER II — NORTH AMERICAN MAINLAND → NEWFOUNDLAND</h2><p class="intro">Chapter II is underway. The North American mainland lies behind our stern as the fleet turns south toward <strong>Newfoundland</strong>.</p><p class="intro"><strong>1,490,589 steps</strong> — nearly <strong>969 km</strong> — have already been carved into our new chapter. The coastline stretches ahead. The ship is moving.</p><div class="tags"><span>DAY 16</span><span>73 SAILORS</span><span>20,646,067 STEPS</span><span>≈ 13,419.9 KM</span><span>27.53% COMPLETE</span></div></div>';

  const oldSaga = document.getElementById('our-saga-day-15');
  if (oldSaga) {
    oldSaga.id = 'our-saga-day-16';
    oldSaga.innerHTML = '<div class="wrap"><div class="copy"><div class="kicker gold">OUR SAGA — DAY 16</div><h2>THE STORY IS OURS TO WRITE</h2><p>Tonight, a new page lies before us.</p><p>Chapter I can never be changed again. Those miles belong to the sailors who carried our ship across the cold waters from Greenland to the North American mainland.</p><p>But Chapter II is different.</p><p><strong>It is still unwritten.</strong></p><p>Every step we take from this moment becomes another line. Every difficult day, every personal victory, every sailor who refuses to stop — all of it becomes part of what we will one day look back upon as <strong>OUR SAGA</strong>.</p><p>Ahead lies Newfoundland.</p><p>We do not yet know what the sea will give us before we reach it.</p><p><strong>The destination is on the map.<br>The story of how we reach it is not.</strong></p><p>That story belongs to all of us.</p><p><strong>73 SAILORS. ONE SHIP. ONE SAGA.</strong></p><p><strong>WRITE THE NEXT LINE WITH YOUR STEPS.</strong></p></div></div>';
  }

  document.querySelectorAll('a[href="#our-saga-day-15"]').forEach(link => link.setAttribute('href', '#our-saga-day-16'));

  if (honorsSection) {
    honorsSection.innerHTML = '<div class="wrap"><div class="kicker red">CREW HONORS — DAY 16</div><h2>THREE MORE NAMES ENTER THE SHIP\'S ROLL</h2><div class="honors-explainer"><div class="kicker red">THE HONOR BEHIND THE NAME</div><h3>EVERY OAR MATTERS</h3><p>Crew Honors belongs to <strong>OUR SAGA</strong>. It is a Viking Voyage II tradition, not a claimed reconstruction of a documented Viking Age ceremony.</p><p>Every honored member receives an individual Viking name and a distinct appearance within our living saga. Once entered into <strong>THE SHIP\'S ROLL</strong>, both remain with that sailor for the rest of the voyage.</p></div><div class="naming-list"><article><span>GIACOMO</span><strong>ARNE <em>(Árni)</em></strong><small>ᛅᚱᚾᛁ</small></article><article><span>ТАТЬЯНА (TATYANA)</span><strong>THYRA <em>(Thyrwi)</em></strong><small>ᚦᚢᚱᚢᛁ</small></article><article><span>FROST WALKER ❄️</span><strong>HALFDAN <em>(Hálfdan)</em></strong><small>ᚼᛅᛚᚠᛏᛅᚾ</small></article></div></div>';
  }

  const addRollEntry = (display, modern, oldNorse, runes) => {
    if (!roll || [...roll.querySelectorAll('article span')].some(s => s.textContent.trim().toLowerCase() === display.toLowerCase())) return;
    const article = document.createElement('article');
    article.innerHTML = `<span>${display}</span><strong>${modern}</strong><small class="old-norse">${oldNorse}</small><small class="runes">${runes}</small>`;
    roll.appendChild(article);
  };
  addRollEntry('Giacomo','Arne','Árni','ᛅᚱᚾᛁ');
  addRollEntry('Татьяна (Tatyana)','Thyra','Thyrwi','ᚦᚢᚱᚢᛁ');
  addRollEntry('Frost Walker ❄️','Halfdan','Hálfdan','ᚼᛅᛚᚠᛏᛅᚾ');

  const myth = document.getElementById('myth-day-14');
  if (myth) {
    myth.id = 'myth-day-16';
    myth.innerHTML = '<div class="wrap"><div class="copy"><div class="kicker red">MYTH &amp; SAGA — DAY 16</div><h2>THE EMPTY PERCH</h2><p>In Odin\'s hall, one perch remains empty.</p><p>Hugin has returned from the world of men.</p><p>Munin has not.</p><p>At first, Odin waited. Ravens fly far. Storms delay even the strongest wings. And Memory has always travelled roads that Thought cannot see.</p><p>But another night has passed.</p><p>Odin stands before the empty perch.</p><p>He does not call Munin\'s name.</p><p>He simply watches the darkness beyond Asgard.</p><p>For the first time, even the Allfather begins to wonder:</p><p><strong>What has Memory found that keeps him from returning?</strong></p><p>Far below, unaware of the question being asked among the gods, 73 Vikings turn their ship south.</p><p>And somewhere beyond their horizon… <strong>Munin is still flying.</strong></p><p><strong>HUGIN HAS RETURNED. MUNIN HAS NOT.<br>TO BE CONTINUED…</strong></p></div></div>';
  }
  document.querySelectorAll('a[href="#myth-day-14"]').forEach(link => link.setAttribute('href', '#myth-day-16'));

  const archive = document.getElementById('voyage-archive');
  if (archive && !document.getElementById('night-watch-day-16')) {
    const night = document.createElement('section');
    night.className = 'dark-section';
    night.id = 'night-watch-day-16';
    night.innerHTML = '<div class="wrap"><div class="copy"><div class="kicker gold">NIGHT WATCH — DAY 16</div><h2>CHAPTER II</h2><p>The celebrations have faded.</p><p>The voices aboard the ship have grown quiet.</p><p>Behind us lies the first chapter of our voyage. Ahead, somewhere beyond the darkness, waits Newfoundland.</p><p>The sea is calm tonight.</p><p>Above the mast, <strong>Hugin circles alone</strong>.</p><p>The Captain stands at the rail, watching the coastline disappear into the night. Seventy-three Vikings rest behind him, gathering strength for another day at the oars.</p><p>No one knows what Chapter II will bring.</p><p>But the bow points south.</p><p>And the ship does not turn back.</p><p><strong>REST WELL, VIKINGS.</strong></p><p>Tomorrow, we write another line.</p><p><strong>THE WATCH CONTINUES.</strong></p></div></div>';
    archive.parentNode.insertBefore(night, archive);
  }

  if (archive) {
    const days = [
      {day:16,title:'CHAPTER II HAS BEGUN',meta:'73 sailors · 20,646,067 steps · ≈ 13,419.9 km',img:'wide_cinematic_promotional_poster_infographic_styl.png',alt:'Viking Voyage II — Day 16',href:'#dispatch'},
      {day:15,title:'CHAPTER I COMPLETE',meta:'72 sailors · 19,155,478 steps · ≈ 12,451.1 km',img:'wide_cinematic_promotional_poster_infographic_styl.png',alt:'Viking Dispatch — Day 15',href:'#chapter-one-complete'},
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
    archive.innerHTML = `<div class="wrap"><div class="kicker gold">THE VOYAGE ARCHIVE</div><h2>RELIVE THE JOURNEY — DAY BY DAY</h2><p class="archive-intro">Every completed day remains part of the voyage. Chapter I is now frozen in the archive; Chapter II begins with Day 16.</p><div class="archive-days">${cards}</div></div>`;
  }

  const closing = document.querySelector('.closing-saga');
  if (closing) closing.innerHTML = '<div class="wrap"><p>“Every step counts.<br>Every Viking matters.”</p><span>DAY 16 · 73 VIKINGS · CHAPTER II · ONE LIVING SAGA</span></div>';

  const box = document.getElementById('lightbox');
  if (!box) return;
  const full = box.querySelector('img');
  const close = box.querySelector('button');
  const shut = () => { box.classList.remove('open'); box.setAttribute('aria-hidden','true'); full.removeAttribute('src'); document.body.classList.remove('lightbox-open'); };
  const openImage = img => { full.src = img.src; full.alt = img.alt || 'Enlarged voyage artwork'; box.classList.add('open'); box.setAttribute('aria-hidden','false'); document.body.classList.add('lightbox-open'); close.focus(); };
  document.addEventListener('click', e => { const img = e.target.closest?.('img.zoomable'); if (img) openImage(img); });
  document.addEventListener('keydown', e => { const img = e.target.closest?.('img.zoomable'); if (img && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openImage(img); } if (e.key === 'Escape' && box.classList.contains('open')) shut(); });
  document.querySelectorAll('img.zoomable').forEach(img => { img.setAttribute('tabindex','0'); img.setAttribute('role','button'); img.setAttribute('aria-label', `${img.alt || 'Voyage artwork'} — tap to enlarge`); });
  close.addEventListener('click', shut);
  box.addEventListener('click', e => { if (e.target === box) shut(); });
})();