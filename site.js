(() => {
  const q = (s) => document.querySelector(s);
  const qa = (s) => [...document.querySelectorAll(s)];
  const setHTML = (s, html) => { const el = q(s); if (el) el.innerHTML = html; };

  const applyDay20 = () => {
    document.title = 'Nordic Viking Heritage — Viking Voyage II — Day 20';
    const meta = q('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Nordic Viking Heritage — Viking Voyage II, Day 20. Chapter III: Newfoundland to Nova Scotia.');

    setHTML('#voyage .status-head > div:first-child', `<div class="kicker red">THE SHIP'S LOG — DAY 20</div><h1>THE SAILS RISE AGAIN</h1><p>Chapter III has begun. Newfoundland lies behind the fleet and Nova Scotia waits ahead.</p>`);
    setHTML('#voyage .stats', `<article><strong>94</strong><small>SAILORS ABOARD</small><em>One crew</em></article><article><strong>35,729,859</strong><small>TOTAL STEPS</small><em>Steps toward Florida</em></article><article><strong>≈ 23,224.4 KM</strong><small>DISTANCE COVERED</small><em>At 0.65 m per step</em></article><article><strong>47.64%</strong><small>OF OUR GOAL</small><em>75,000,000 steps</em></article>`);

    const ravens = q('.ravens-band .ravens-inner');
    if (ravens) ravens.innerHTML = `<img class="raven" src="assets/hugin.png" alt="Hugin the raven" /><div><strong>THE RAVENS FLY WITH THE FLEET.</strong><p>Memory has returned. The saga has a Keeper. Chapter III carries the crew south.</p></div><img class="raven" src="assets/munin.png" alt="Munin the raven" />`;

    setHTML('#dispatch .copy', `<div class="kicker gold">VIKING DISPATCH — DAY 20</div><h2>THE SAILS RISE AGAIN</h2><p>The fires of Newfoundland have burned long enough.</p><p>Tonight, <strong>94 Vikings</strong> return to the sea.</p><p>Our fleet now stands at <strong>35,729,859 steps</strong> — approximately <strong>23,224.4 km</strong> carried by one crew from the ice toward the sun.</p><p>Since yesterday, another <strong>1,888,773 steps</strong> have been added to our voyage — roughly <strong>1,227.7 km</strong>.</p><p>The rest was earned. The ships are ready. And now the coastline ahead calls us south.</p><p><strong>CHAPTER III BEGINS.</strong></p><p>Newfoundland falls behind us. Ahead lies Nova Scotia.</p><p><strong>ONE CREW. ONE SAGA.</strong></p>`);

    setHTML('#voyage-map .wrap', `<div class="kicker gold">THE VOYAGE MAP — CHAPTER III</div><h2>NEWFOUNDLAND → NOVA SCOTIA</h2><p class="intro">The fleet has left Newfoundland and is now sailing the waters of Chapter III. <strong>The new chart remains rolled up for now.</strong></p><p class="intro">Day 20 brings the voyage to <strong>35,729,859 steps</strong> — approximately <strong>23,224.4 km</strong> since Greenland.</p><div class="tags"><span>DAY 20</span><span>94 SAILORS</span><span>35,729,859 STEPS</span><span>≈ 23,224.4 KM</span><span>47.64% COMPLETE</span></div>`);

    const saga = q('#our-saga-day-19') || q('#our-saga-day-17') || q('#our-saga-day-20');
    if (saga) {
      saga.id = 'our-saga-day-20';
      setHTML('#our-saga-day-20 .copy', `<div class="kicker gold">OUR SAGA — DAY 20</div><h2>THE SHORE GREW QUIET BEHIND THEM</h2><p>One by one, the fires of Newfoundland disappeared into the darkness.</p><p>The longships were moving again.</p><p>Red-and-white sails filled above the fleet as <strong>94 Vikings</strong> returned to the sea, carrying new names, old friendships and stories still being written.</p><p>Somewhere among them sailed Ulf. No ceremony marked his place. Tonight, he was simply one Viking among many.</p><p>Ahead lay Nova Scotia. Between the fleet and that distant shore stretched only the dark Atlantic — calm for now, almost welcoming.</p><p>Hákon stood beneath the sail and watched the horizon.</p><p>Þóra would remember what came next.</p><p><strong>CHAPTER III HAD BEGUN.</strong></p><p><strong>ONE CREW. ONE SAGA.</strong></p>`);
    }

    const staleKeeper = q('#keeper-of-the-saga-day-19');
    if (staleKeeper) staleKeeper.remove();

    const history = q('#history-day-19') || q('#history-day-17') || q('#history-day-20');
    if (history) {
      history.id = 'history-day-20';
      const copy = history.querySelector('.copy') || history.querySelector('.wrap');
      if (copy) copy.innerHTML = `<div class="kicker gold">HISTORY — DAY 20</div><h2>THE CLUE THAT POINTED SOUTH</h2><p>Archaeology at <strong>L'Anse aux Meadows</strong> preserves evidence that the Norse travelled beyond their Newfoundland base.</p><p>Butternuts and butternut wood were found at the site. Butternut does not grow in northern Newfoundland; its northern range lies farther south, including parts of Nova Scotia and New Brunswick.</p><p>The finds do not tell us an exact destination. They do tell us something important: people using L'Anse aux Meadows travelled farther south and returned with material from those regions.</p><p><strong>SAGAN FÅR VARA VILD. HISTORIEN SKA VARA SANN.</strong></p>`;
    }

    const myth = q('#myth-day-19') || q('#myth-day-17') || q('#myth-day-20');
    if (myth) {
      myth.id = 'myth-day-20';
      const copy = myth.querySelector('.copy') || myth.querySelector('.wrap');
      if (copy) copy.innerHTML = `<div class="kicker red">MYTH &amp; SAGA — DAY 20</div><h2>THE WIND DOES NOT BELONG TO THE CAPTAIN</h2><p>The Vikings knew that well.</p><p>Among the gods was <strong>Njǫrðr</strong>, associated with the sea, the wind and the fortunes of those who sailed upon them.</p><p>Tonight, as Newfoundland disappeared behind our fleet, the red-and-white sails began to fill.</p><p>Was it simply the Atlantic wind? Or had Njǫrðr noticed 94 Vikings returning to his waters?</p><p>Hákon could choose the course. The crew could pull the oars. But the wind belonged to powers older than either.</p><p><strong>AND TONIGHT, IT WAS BLOWING SOUTH.</strong></p>`;
    }

    const night = q('#night-watch-day-19') || q('#night-watch-day-17') || q('#night-watch-day-20');
    if (night) {
      night.id = 'night-watch-day-20';
      const copy = night.querySelector('.copy') || night.querySelector('.wrap');
      if (copy) copy.innerHTML = `<div class="kicker gold">NIGHT WATCH — DAY 20</div><h2>THE SEA HAD GONE QUIET</h2><p>Behind the fleet, Newfoundland had vanished into darkness.</p><p>Above them, the red-and-white sails breathed gently beneath the stars. Most of the crew slept. Only the night watch remained awake.</p><p>The Atlantic stretched southward — black, calm and endless. For now, the waves moved softly against the hulls.</p><p>Far beyond the reach of the lanterns, something was changing.</p><p>Not a storm. <strong>Not yet.</strong></p><p>The watchman listened. Then looked toward the dark horizon.</p><p><strong>CHAPTER III HAD ONLY JUST BEGUN.</strong></p>`;
    }

    qa('a[href="#history-day-19"],a[href="#history-day-17"]').forEach(a => a.setAttribute('href', '#history-day-20'));
    qa('a[href="#myth-day-19"],a[href="#myth-day-17"]').forEach(a => a.setAttribute('href', '#myth-day-20'));
    qa('a[href="#our-saga-day-19"],a[href="#our-saga-day-17"]').forEach(a => a.setAttribute('href', '#our-saga-day-20'));

    const roll = q('#ship-roll .roll-grid');
    if (roll) {
      const add = (identity, name, oldNorse, runes) => {
        if ([...roll.querySelectorAll('span')].some(x => x.textContent.trim() === identity)) return;
        roll.insertAdjacentHTML('beforeend', `<article><span>${identity}</span><strong>${name}</strong><small class="old-norse">${oldNorse}</small><small class="runes">${runes}</small></article>`);
      };
      add('Telephon', 'Runa', 'Rúna', 'ᚱᚢᚾᛅ');
      add('Lea SamU', 'Egil', 'Egill', 'ᛁᚴᛁᛚ');
      add('Esha M', 'Hild', 'Hildr', 'ᚼᛁᛚᛏᛦ');

      const starfireEntry = [...roll.querySelectorAll('article')].find(entry => entry.querySelector('span')?.textContent.trim().startsWith('Starfire Silverstar'));
      if (starfireEntry) {
        const n = starfireEntry.querySelector('strong');
        if (n) n.textContent = 'Þóra';
      }

      const existingRoles = q('#ship-roll .ship-role-cards');
      if (existingRoles) existingRoles.remove();
      const roles = document.createElement('div');
      roles.className = 'ship-role-cards';
      roles.style.cssText = 'grid-column:1/-1;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;margin-bottom:1.2rem';
      roles.innerHTML = `<article><small>⚔️ THE CAPTAIN</small><span>Stefan</span><strong>HÁKON</strong></article><article><small>🐦‍⬛ KEEPER OF THE SAGA</small><span>Starfire Silverstar</span><strong>ÞÓRA</strong></article>`;
      roll.insertBefore(roles, roll.firstChild);
    }

    const honorsWrap = q('#honors .wrap');
    if (honorsWrap) {
      const archive = q('#crew-honors-archive');
      honorsWrap.innerHTML = `<div class="kicker red">CREW HONORS — DAY 20</div><h2>THREE VIKINGS. THREE DIFFERENT PATHS. ONE CREW.</h2><div class="honors-explainer"><div class="kicker red">THE HONOR BEHIND THE NAME</div><h3>EVERY OAR MATTERS</h3><p>Crew Honors belongs to <strong>OUR SAGA</strong>. It is a Viking Voyage II tradition, not a claimed reconstruction of a documented Viking Age ceremony.</p><p>Once entered into <strong>THE SHIP'S ROLL</strong>, a sailor's name remains part of this voyage.</p></div><img class="day20-art zoomable" src="day-20-crew-honors.jpg" alt="Crew Honors Day 20 — Rúna, Egil and Hild"><div class="naming-list"><article><span>TELEPHON</span><strong>RUNA <em>(Rúna)</em></strong><small>ᚱᚢᚾᛅ</small></article><article><span>LEA SAMU</span><strong>EGIL <em>(Egill)</em></strong><small>ᛁᚴᛁᛚ</small></article><article><span>ESHA M</span><strong>HILD <em>(Hildr)</em></strong><small>ᚼᛁᛚᛏᛦ</small></article></div><p style="margin-top:1.5rem"><strong>EVERY OAR MATTERS. EVERY NAME HAS A STORY. ONE CREW. ONE SAGA.</strong></p>`;
      if (archive) honorsWrap.appendChild(archive);
    }

    const honorsArchive = q('#crew-honors-archive .crew-honors-archive-grid');
    if (honorsArchive && !honorsArchive.querySelector('img[src="day-20-crew-honors.jpg"]')) {
      honorsArchive.insertAdjacentHTML('afterbegin', `<figure style="position:relative;margin:0;width:100%;min-width:0;height:100%;display:grid;grid-template-rows:1fr 4.2rem;background:#071116;border:1px solid rgba(201,163,91,.45);overflow:hidden"><div style="aspect-ratio:4/5;background:#071116;display:flex;align-items:center;justify-content:center;overflow:hidden"><img class="zoomable" style="display:block;width:100%;height:100%;object-fit:contain;cursor:zoom-in" src="day-20-crew-honors.jpg" alt="Crew Honors Day 20 — RUNA · EGIL · HILD" /></div><figcaption style="height:4.2rem;box-sizing:border-box;padding:.58rem .6rem .65rem;background:#071116;text-align:left;overflow:hidden"><strong style="display:block;color:#c9a35b;font-family:Georgia,serif;font-size:.64rem;letter-spacing:.09em;margin-bottom:.22rem">DAY 20</strong><span style="display:block;color:#f1eadb;font-family:Georgia,serif;font-size:.67rem;line-height:1.25">RUNA · EGIL · HILD</span></figcaption></figure>`);
    }

    let chamber = q('#keepers-chamber');
    if (!chamber) {
      chamber = document.createElement('section');
      chamber.id = 'keepers-chamber';
      chamber.className = 'dark-section';
      const anchor = q('#our-saga-day-20');
      if (anchor) anchor.insertAdjacentElement('afterend', chamber);
    }
    if (chamber) chamber.innerHTML = `<div class="wrap"><div class="kicker gold">🐦‍⬛ THE KEEPER'S CHAMBER</div><h2>EVERY VIKING CARRIES A STORY</h2><p>Some stories are written in steps. Some are told around the fire. Some are remembered long after the ships have sailed. Here, <strong>Þóra — Keeper of the Saga</strong> gathers the voices of our crew.</p><div class="keeper-grid"><article class="keeper-card"><span>CREW VOICES</span><strong>Leave your mark on the saga</strong><p>Short thoughts, memories, reactions and moments from the voyage can become part of the crew's living record.</p></article><article class="keeper-card"><span>TALES FROM THE CREW</span><strong>Your Viking. Your voice.</strong><p>Longer stories can explore the people behind the oars and the paths that brought them aboard our fleet.</p></article><article class="keeper-card"><span>QUESTIONS &amp; IDEAS</span><strong>Help shape what comes next</strong><p>The crew may ask questions, suggest ideas and help the Captain and Keeper discover where the saga wants to go.</p></article></div><blockquote>“OUR SAGA IS THE CREW'S SAGA.”</blockquote><p><small>The Keeper's Chamber is curated rather than automatically published. Only public Viking/Pacer identities are used here; private real-world names are never displayed.</small></p></div>`;

    if (!q('#day20-live-style')) {
      const style = document.createElement('style');
      style.id = 'day20-live-style';
      style.textContent = `#keepers-chamber{padding:92px 0;border-top:1px solid rgba(201,163,91,.22);border-bottom:1px solid rgba(201,163,91,.22)}#keepers-chamber .keeper-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem;margin:1.5rem 0}.day20-art{display:block;width:min(100%,1000px);height:auto;margin:1.5rem auto 2.5rem;border:1px solid rgba(201,163,91,.45);cursor:zoom-in}#keepers-chamber .keeper-card{padding:1.25rem;background:linear-gradient(145deg,rgba(114,18,27,.14),rgba(7,17,22,.95));border:1px solid rgba(201,163,91,.38)}.voyage-archive .archive-days{display:grid;gap:1rem}.voyage-archive .archive-day{display:grid;grid-template-columns:160px 1fr;text-decoration:none;background:#0b171d;border:1px solid rgba(201,163,91,.32);overflow:hidden}.voyage-archive .archive-day-image{aspect-ratio:4/3;background:#071116;overflow:hidden}.voyage-archive .archive-day-image img{width:100%;height:100%;object-fit:cover;display:block}.voyage-archive .archive-day-copy{padding:1rem 1.1rem;display:flex;flex-direction:column;justify-content:center}.voyage-archive .archive-day-copy span{color:#c9a35b;font-weight:700;letter-spacing:.1em;font-size:.74rem}.voyage-archive .archive-day-copy strong{color:#f1eadb;margin:.25rem 0}.voyage-archive .archive-day-copy small{color:#bdb4a6}.voyage-archive .archive-intro{max-width:760px;margin-bottom:1.5rem}@media(max-width:800px){#keepers-chamber{padding:76px 0}#keepers-chamber .keeper-grid{grid-template-columns:1fr}.ship-role-cards{grid-template-columns:1fr!important}.voyage-archive .archive-day{grid-template-columns:100px 1fr}.voyage-archive .archive-day-copy{padding:.8rem}}`;
      document.head.appendChild(style);
    }

    const setArt = (selector, src, alt) => {
      const section = q(selector);
      if (!section) return;
      const oldImgs = qa(`${selector} img.day20-art, ${selector} > img.day20-art`);
      oldImgs.forEach((img, i) => { if (i > 0) img.remove(); });
      let img = section.querySelector('img.day20-art');
      if (!img) {
        const wrap = section.querySelector('.wrap') || section;
        const copy = section.querySelector('.copy');
        img = document.createElement('img');
        img.className = 'day20-art zoomable';
        if (copy) copy.insertAdjacentElement('afterend', img); else wrap.appendChild(img);
      }
      img.src = src;
      img.alt = alt;
    };
    setArt('#dispatch', 'day-20-viking-dispatch.jpg', 'Viking Dispatch Day 20 — The Sails Rise Again');
    setArt('#our-saga-day-20', 'day-20-our-saga.jpg', 'Our Saga Day 20 — Chapter III begins');
    setArt('#myth-day-20', 'day-20-myth-and-saga.jpg', 'Myth and Saga Day 20 — Njǫrðr');
    setArt('#history-day-20', 'day-20-history.jpg', 'History Day 20 — They Sailed South Before Us');
    setArt('#night-watch-day-20', 'day-20-night-watch.jpg', 'Night Watch Day 20 — The Sea Had Gone Quiet');

    const voyageArchive = q('#voyage-archive');
    if (voyageArchive) {
      const days = [
        {day:20,title:'THE SAILS RISE AGAIN',meta:'94 sailors · 35,729,859 steps · ≈ 23,224.4 km',img:'day-20-viking-dispatch.jpg',alt:'Viking Dispatch — Day 20',href:'#dispatch'},
        {day:19,title:'THE FLEET STAYS ASHORE',meta:'94 sailors · 33,841,086 steps · ≈ 21,996.7 km',img:'day-19-viking-dispatch.jpg',alt:'Viking Dispatch — Day 19',href:'#voyage-archive'},
        {day:18,title:'NEWFOUNDLAND REACHED',meta:'89 active Vikings · 30,701,056 steps · Chapter II complete',img:'day-18-viking-dispatch.png',alt:'Viking Dispatch — Day 18',href:'archive/day-18.html'},
        {day:17,title:'THE SEA CHANGED OUR COURSE',meta:'82 sailors · 25,877,873 steps · ≈ 16,820.6 km',img:'day-17-viking-dispatch.png',alt:'Viking Dispatch — Day 17',href:'archive/day-17.html'},
        {day:16,title:'CHAPTER II HAS BEGUN',meta:'73 sailors · 20,646,067 steps · ≈ 13,419.9 km',img:'day-16-map.png',alt:'Viking Voyage II — Day 16',href:'archive/day-16.html'},
        {day:15,title:'CHAPTER I COMPLETE',meta:'72 sailors · 19,155,478 steps · ≈ 12,451.1 km',img:'wide_cinematic_promotional_poster_infographic_styl.png',alt:'Viking Dispatch — Day 15',href:'archive/day-15.html'},
        {day:14,title:'THE POWER OF SIXTY OARS',meta:'72 sailors · 17,840,511 steps · ≈ 11,596.3 km',img:'day-14-history.jpg',alt:'History — Day 14',href:'archive/day-14.html'},
        {day:13,title:'THE SILENCE AFTER THE STORM',meta:'71 sailors · 15,984,888 steps · ≈ 10,390.2 km',img:'day-13-dispatch.jpg',alt:'Viking Dispatch — Day 13',href:'archive/day-13.html'},
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
      voyageArchive.classList.add('voyage-archive','dark-section');
      voyageArchive.innerHTML = `<div class="wrap"><div class="kicker gold">THE VOYAGE ARCHIVE</div><h2>RELIVE THE JOURNEY — DAY BY DAY</h2><p class="archive-intro">Every completed day remains part of the voyage. Chapter I and Chapter II are frozen in the archive. Day 20 begins Chapter III: Newfoundland → Nova Scotia.</p><div class="archive-days">${cards}</div></div>`;
    }

    const sources = q('#sources .wrap');
    if (sources) sources.innerHTML = `<div class="kicker gold">SOURCES &amp; HISTORICAL NOTES</div><h2>THE HISTORY MUST BE TRUE</h2><p>Day 20's HISTORY entry uses archaeological evidence from <strong>L'Anse aux Meadows</strong>. Butternuts and butternut wood recovered there are evidence that people using the Norse site travelled into regions farther south than northern Newfoundland. The finds do not identify an exact destination.</p><p>MYTH &amp; SAGA remains clearly separate from HISTORY. Njǫrðr belongs to the mythic layer of Viking Voyage II; the voyage narrative around him is our saga, not a historical claim.</p><p>Old Norse forms and Viking Age name evidence used in Crew Honors are checked against runic and scholarly name resources.</p>`;

    const closing = q('.closing-saga .wrap');
    if (closing) closing.innerHTML = `<p>“One Crew.<br>One Saga.”</p><span>DAY 20 · 94 VIKINGS · 35,729,859 STEPS · CHAPTER III · NEWFOUNDLAND → NOVA SCOTIA</span>`;

    const seal = q('#voyage .seal');
    const head = q('#voyage .status-head');
    if (seal && head && window.matchMedia('(max-width: 800px)').matches) {
      head.style.display = 'grid';
      head.style.gridTemplateColumns = 'minmax(0,1fr) 96px';
      head.style.columnGap = '12px';
      head.style.alignItems = 'start';
      seal.style.position = 'static';
      seal.style.width = '96px';
      seal.style.maxWidth = '96px';
      seal.style.height = 'auto';
      seal.style.margin = '0';
      seal.style.transform = 'none';
      seal.style.justifySelf = 'end';
    }

    const box = q('#lightbox');
    if (box) {
      const full = box.querySelector('img');
      const close = box.querySelector('button');
      const shut = () => {
        box.classList.remove('open');
        box.setAttribute('aria-hidden', 'true');
        if (full) full.removeAttribute('src');
        document.body.classList.remove('lightbox-open');
      };
      qa('img.zoomable,.framed img,.archive-day img,.crew-honors-archive-grid img').forEach(img => {
        if (img.dataset.lbBound) return;
        img.dataset.lbBound = '1';
        img.addEventListener('click', e => {
          if (img.closest('a.archive-day')) return;
          e.preventDefault();
          if (!full) return;
          full.src = img.src;
          full.alt = img.alt || 'Enlarged voyage artwork';
          box.classList.add('open');
          box.setAttribute('aria-hidden', 'false');
          document.body.classList.add('lightbox-open');
        });
      });
      if (close && !close.dataset.lbBound) {
        close.dataset.lbBound = '1';
        close.addEventListener('click', shut);
      }
      if (!box.dataset.lbBound) {
        box.dataset.lbBound = '1';
        box.addEventListener('click', e => { if (e.target === box) shut(); });
      }
    }
  };

  setTimeout(applyDay20, 0);
})();