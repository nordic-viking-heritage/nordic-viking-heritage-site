(() => {
  const q = (s) => document.querySelector(s);
  const setHTML = (s, html) => { const el = q(s); if (el) el.innerHTML = html; };

  setHTML('#voyage .status-head > div:first-child', `<div class="kicker red">THE SHIP'S LOG — DAY 19</div><h1>THE FLEET STAYS ASHORE</h1><p>Chapter II is complete. The fleet remains on Newfoundland while the crew rests, replenishes and prepares. Day 19 progress is banked toward Chapter III.</p>`);
  setHTML('#voyage .stats', `<article><strong>94</strong><small>SAILORS ABOARD</small><em>One crew</em></article><article><strong>33,841,086</strong><small>TOTAL STEPS</small><em>Steps toward Florida</em></article><article><strong>≈ 21,996.7 KM</strong><small>DISTANCE COVERED</small><em>At 0.65 m per step</em></article><article><strong>45.12%</strong><small>OF OUR GOAL</small><em>75,000,000 steps</em></article>`);

  /* LOCKED: approved mobile seal position. */
  const voyageSeal = q('#voyage .seal');
  const voyageStatusHead = q('#voyage .status-head');
  if (voyageSeal) {
    const mobileSeal = window.matchMedia('(max-width: 800px)').matches;
    voyageSeal.style.width = mobileSeal ? '132px' : '170px';
    voyageSeal.style.flex = '0 0 auto';
    if (mobileSeal && voyageStatusHead) {
      voyageStatusHead.style.position = 'relative';
      voyageSeal.style.position = 'absolute';
      voyageSeal.style.right = '18px';
      voyageSeal.style.top = '-52px';
      voyageSeal.style.transform = 'none';
      voyageSeal.style.margin = '0';
      voyageSeal.style.zIndex = '2';
    } else {
      voyageSeal.style.position = '';
      voyageSeal.style.right = '';
      voyageSeal.style.top = '';
      voyageSeal.style.transform = 'none';
      voyageSeal.style.margin = '';
    }
  }

  setHTML('#dispatch .copy', `<div class="kicker gold">VIKING DISPATCH — DAY 19</div><h2>TONIGHT, THE FLEET DOES NOT SAIL</h2><p>For eighteen days, our story has been measured in movement. Steps. Distance. Waves. Wind. Another horizon.</p><p>Today, <strong>94 Vikings</strong> carried our total to <strong>33,841,086 steps</strong> — another <strong>3,140,030 steps</strong>, approximately <strong>2,041.0 km</strong>, for the voyage.</p><p>Those steps will carry us toward Chapter III. <strong>But not tonight.</strong></p><p>Our longships remain pulled onto the shores of Newfoundland. The oars are silent. The sails are lowered. Fires burn along the shore.</p><p>Last night, the Captain went to sleep. <strong>The crew did not.</strong> Vikings gathered around the fires, found water, prepared food, chose duties and arranged the night watch. Nobody ordered them to continue the story. <strong>They simply did.</strong></p><p>This is no longer only a saga being told TO the crew. <strong>It is becoming a saga being told BY the crew.</strong></p><figure class="framed"><img class="zoomable" src="day-19-viking-dispatch.jpg" alt="Viking Dispatch Day 19 — Tonight, the fleet does not sail" /><figcaption>VIKING DISPATCH — DAY 19 · NEWFOUNDLAND · THE FLEET STAYS ASHORE</figcaption></figure>`);

  setHTML('#voyage-map .wrap', `<div class="kicker gold">THE VOYAGE MAP — CHAPTER II</div><h2>NORTH AMERICAN MAINLAND → NEWFOUNDLAND</h2><p class="intro">The fleet reached Newfoundland on Day 18. <strong>Chapter II is complete and remains frozen in the voyage record.</strong></p><p class="intro">Day 19 adds <strong>3,140,030 steps</strong> to the voyage. That progress is banked toward Chapter III, but tonight the saga remains ashore on Newfoundland.</p><div class="tags"><span>DAY 19</span><span>94 SAILORS</span><span>33,841,086 STEPS</span><span>≈ 21,996.7 KM</span><span>45.12% COMPLETE</span></div>`);

  const sagaLayer = q('.layer-grid a[href="#our-saga-day-17"]'); if (sagaLayer) sagaLayer.setAttribute('href', '#our-saga-day-19');
  const navSaga = q('.floating-nav a[href="#our-saga-day-17"]'); if (navSaga) navSaga.setAttribute('href', '#our-saga-day-19');
  const saga17 = q('#our-saga-day-17');
  if (saga17) {
    saga17.id = 'our-saga-day-19';
    setHTML('#our-saga-day-19 .copy', `<div class="kicker gold">OUR SAGA — DAY 19</div><h2>THE NIGHT THE CREW TOOK OVER</h2><p><strong>THE CAPTAIN WENT TO SLEEP. THE CREW DID NOT.</strong></p><p>On the Newfoundland shore, the fires stayed alive. Nova helped turn landfall into a living camp, giving the crew work to do and a place in the story. Þóra kept the fires, the watch and the saga moving.</p><p>Food was prepared. Water was found. Duties were chosen. Stories passed from Viking to Viking around the flames.</p><p>No Captain ordered the next scene. The crew simply began writing it.</p><p>That is what changed tonight. <strong>OUR SAGA IS THE CREW'S SAGA.</strong></p><p>We set the world and the direction — but the Vikings aboard this fleet can shape what happens inside it.</p><p>Tomorrow, Chapter III awaits. Tonight, Newfoundland is our camp, our fire and our story.</p><figure class="framed"><img class="zoomable" src="day-19-our-saga.jpg" alt="Our Saga Day 19 — The Night the Crew Took Over" /><figcaption>OUR SAGA — DAY 19 · THE NIGHT THE CREW TOOK OVER</figcaption></figure>`);
  }

  const roll = q('#ship-roll .roll-grid');
  if (roll && ![...roll.querySelectorAll('span')].some(x => x.textContent.trim() === 'manuelmorenocaz')) roll.insertAdjacentHTML('beforeend', `<article><span>manuelmorenocaz</span><strong>Torsten</strong><small class="old-norse">Þórsteinn</small><small class="runes">ᚦᚢᚱᛋᛏᛁᚾ</small></article><article><span>Dania</span><strong>Svala</strong><small class="old-norse">Svala</small><small class="runes">ᛋᚢᛅᛚᛅ</small></article><article><span>Jonathan</span><strong>Bjarni</strong><small class="old-norse">Bjarni</small><small class="runes">ᛒᛁᛅᚱᚾᛁ</small></article>`);
  if (roll && ![...roll.querySelectorAll('span')].some(x => x.textContent.trim() === 'Gudjon')) roll.insertAdjacentHTML('beforeend', `<article><span>Gudjon</span><strong>Sigurd</strong><small class="old-norse">Sigurðr</small><small class="runes">ᛋᛁᚴᚢᚱᚦᛦ</small></article><article><span>René</span><strong>Hrolf</strong><small class="old-norse">Hrólfr</small><small class="runes">ᚼᚱᚢᛚᚠᛦ</small></article><article><span>Katharina</span><strong>Yrsa</strong><small class="old-norse">Yrsa</small><small class="runes">ᚢᚱᛋᛅ</small></article>`);
  if (roll && ![...roll.querySelectorAll('span')].some(x => x.textContent.trim() === 'Nox')) roll.insertAdjacentHTML('beforeend', `<article><span>Nox</span><strong>Liv</strong><small class="old-norse">Hlíf</small><small class="runes">ᚼᛚᛁᚠ</small></article>`);
  if (roll && ![...roll.querySelectorAll('span')].some(x => x.textContent.trim() === 'Tom')) roll.insertAdjacentHTML('beforeend', `<article><span>Tom</span><strong>Þorbjørn</strong><small class="old-norse">Þorbjǫrn</small><small class="runes">ᚦᚢᚱᛒᛁᛅᚱᚾ</small></article>`);

  if (roll) {
    const entries = [...roll.querySelectorAll('article')];
    const stefanEntry = entries.find((entry) => entry.querySelector('span')?.textContent.trim() === 'Stefan');
    const starfireEntry = entries.find((entry) => entry.querySelector('span')?.textContent.trim().startsWith('Starfire Silverstar'));
    if (stefanEntry && starfireEntry) {
      [stefanEntry, starfireEntry].forEach((entry) => {
        entry.style.gridColumn = '';
        entry.style.border = '';
        entry.style.boxShadow = '';
        entry.style.background = '';
        entry.querySelector('.ship-role')?.remove();
        entry.querySelector('.saga-role')?.remove();
      });
      const starfireName = starfireEntry.querySelector('strong'); if (starfireName) starfireName.textContent = 'Þóra';
      const existingRoles = q('#ship-roll .ship-role-cards'); if (existingRoles) existingRoles.remove();
      const roleCards = document.createElement('div');
      roleCards.className = 'ship-role-cards';
      roleCards.style.cssText = 'grid-column:1/-1;display:grid;grid-template-columns:1fr;gap:1rem;margin-bottom:1.2rem';
      roleCards.innerHTML = `<article style="padding:1.45rem 1.55rem;border:2px solid rgba(201,163,91,.72);box-shadow:0 0 0 1px rgba(201,163,91,.18),0 0 14px rgba(201,163,91,.10);background:linear-gradient(135deg,rgba(114,18,27,.16),rgba(7,17,22,.02))"><small style="display:block;color:#c9a35b;font-weight:700;letter-spacing:.14em;margin-bottom:.85rem">🐦‍⬛ KEEPER OF THE SAGA</small><span>Starfire Silverstar</span><strong style="display:block">ÞÓRA</strong><small class="old-norse">Þóra</small><small class="runes">ᚦᚢᚱᛅ</small><figure class="framed" style="margin:1rem 0 0"><img class="zoomable" src="day-19-keeper-of-the-saga.jpg" alt="Þóra — Keeper of the Saga" /><figcaption>ÞÓRA · KEEPER OF THE SAGA</figcaption></figure></article>`;
      roll.insertBefore(roleCards, roll.firstChild);
    }
  }

  setHTML('#honors .wrap', `<div class="kicker red">CREW HONORS — DAY 19</div><h2>THREE MORE NAMES ENTER THE SHIP'S ROLL</h2><div class="honors-explainer"><div class="kicker red">THE HONOR BEHIND THE NAME</div><h3>EVERY OAR MATTERS</h3><p>Crew Honors belongs to <strong>OUR SAGA</strong>. It is a Viking Voyage II tradition, not a claimed reconstruction of a documented Viking Age ceremony.</p><p>Once entered into <strong>THE SHIP'S ROLL</strong>, a sailor's name remains part of this voyage.</p></div><figure class="framed" style="margin-bottom:2.5rem"><img class="zoomable" src="day-19-crew-honors.jpg" alt="Crew Honors Day 19 — Sigurd, Hrolf and Yrsa" /><figcaption style="background:#071116;text-align:left;padding:.85rem 1rem"><strong style="color:#c9a35b">CREW HONORS — DAY 19</strong><span style="color:#f1eadb"> · SIGURD · HROLF · YRSA</span></figcaption></figure><div class="naming-list"><article><span>GUDJON</span><strong>SIGURD <em>(Sigurðr)</em></strong><small>ᛋᛁᚴᚢᚱᚦᛦ</small></article><article><span>RENÉ</span><strong>HROLF <em>(Hrólfr)</em></strong><small>ᚼᚱᚢᛚᚠᛦ</small></article><article><span>KATHARINA</span><strong>YRSA <em>(Yrsa)</em></strong><small>ᚢᚱᛋᛅ</small></article></div>`);

  const honors = q('#honors');
  if (honors && !q('#crew-honors-archive')) {
    const cards = [
      ['DAY 19','day-19-crew-honors.jpg','SIGURD · HROLF · YRSA'],['DAY 18','day-18-crew-honors.png','TORSTEN · SVALA · BJARNI'],['DAY 17','day-17-crew-honors.png','LEIF · IVAR'],['DAY 16','day-16-crew-honors.png','ARNE · THYRA · HALFDAN'],['DAY 15','day-15-crew-honors.jpg','OLAF · SVEIN · INGVAR'],['DAY 14','day-14-crew-honors.jpg','RAGNAR · TOVA · KNUT'],['DAY 13','day-13-crew-honors.jpg','HARALD · BRAND · HALL'],['DAY 12','day-12-crew-honors-CORRECT.jpg','HOLMFRID · GYRID · GUNNAR'],['DAY 11','day-11-crew-honors.jpg','ASMUND · ÅSA · GUDRUN'],['DAY 10','day-10-crew-honors.jpg','MAGNUS · HELGA · ORM'],['DAY 8','day-8-crew-honors.jpg','ÞORBJØRN · ÞÓRA'],['DAY 7','day-7-crew-honors.jpg','BJORN · KARI'],['DAY 5','day-5-crew-honors.jpg','ULF · LIV'],['DAY 4','day-4-crew-honors.jpg','STEINN · HAFTHOR · FRODI'],['DAY 3','day-3-crew-honors.jpg','HRAFN · EIRIKR · FREYDIS · SIGRID'],['DAY 2','day-2-crew-honors.jpg','SOLVEIG'],['THE CAPTAIN','crew-honors-hakon-captain-naming.jpg','HÁKON · THE NAMING OF THE CAPTAIN']
    ].map(([label,src,names]) => {
      const isCaptain = label === 'THE CAPTAIN';
      return `<figure class="${isCaptain ? 'captain-honors-card' : ''}" style="position:relative;margin:0;width:100%;min-width:0;height:100%;display:grid;grid-template-rows:1fr 4.2rem;background:#071116;border:${isCaptain ? '3px solid #c9a35b' : '1px solid rgba(201,163,91,.45)'};box-shadow:${isCaptain ? '0 0 0 1px rgba(201,163,91,.38),0 0 18px rgba(201,163,91,.20)' : 'none'};overflow:hidden"><div style="aspect-ratio:4/5;background:#071116;display:flex;align-items:center;justify-content:center;overflow:hidden"><img class="zoomable" style="display:block;width:100%;height:100%;object-fit:contain;cursor:zoom-in" src="${src}" alt="Crew Honors ${label} — ${names}" /></div><figcaption style="height:4.2rem;box-sizing:border-box;padding:.58rem .6rem .65rem;background:#071116;text-align:left;overflow:hidden;${isCaptain ? 'box-shadow:inset 0 1px 0 rgba(201,163,91,.7)' : ''}"><strong style="display:block;color:#c9a35b;font-family:Georgia,serif;font-size:.64rem;letter-spacing:.09em;margin-bottom:.22rem">${label}</strong><span style="display:block;color:#f1eadb;font-family:Georgia,serif;font-size:.67rem;line-height:1.25;overflow-wrap:anywhere">${names}</span></figcaption></figure>`;
    }).join('');
    honors.insertAdjacentHTML('afterend', `<section class="parchment" id="crew-honors-archive" style="padding-bottom:5rem"><div class="wrap"><div class="kicker red">THE CREW HONORS ARCHIVE</div><h2>EVERY NAME HAS A FACE. EVERY FACE HAS A STORY.</h2><p style="max-width:780px;margin-bottom:2rem">Crew Honors portraits are part of the permanent record of Viking Voyage II. Once a Viking receives a name and a face in our saga, that moment remains here for the rest of the voyage.</p><div class="crew-honors-archive-grid" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.8rem;align-items:stretch;max-width:760px">${cards}</div><p style="margin-top:1.75rem;margin-bottom:0;opacity:.8"><strong>Archive in progress.</strong> Day 6 and Day 9 are being restored with face-forward portraits to match the permanent Crew Honors standard.</p></div></section>`);
  }
  const archiveGrid = q('#crew-honors-archive .crew-honors-archive-grid');
  if (archiveGrid && window.matchMedia('(min-width: 760px)').matches) archiveGrid.style.gridTemplateColumns = 'repeat(4,minmax(0,1fr))';

  const history17 = q('#history-day-17');
  if (history17) {
    history17.id = 'history-day-19';
    setHTML('#history-day-19 .copy', `<div class="kicker gold">HISTORY — DAY 19</div><h2>THEY WERE NOT ALONE</h2><p>When the Norse reached the lands west of Greenland, they did not enter an empty world.</p><p>People had lived in these lands for thousands of years.</p><p>The Norse sagas tell of encounters with people they called <em>Skrælingar</em>. They describe first contact, attempts at trade — and eventually violence.</p><p>But here history becomes uncertain. The sagas were written down centuries after the voyages, and historians cannot say with certainty exactly who the Norse encountered in each episode.</p><p>What we do know is more important: when the Norse reached North America around a thousand years ago, they encountered a world that was already inhabited.</p><p>Two peoples from very different worlds had come face to face.</p><p><strong>THE NORSE WERE NEWCOMERS HERE. THEY WERE NOT ALONE.</strong></p><figure class="framed"><img class="zoomable" src="day-19-history.jpg" alt="History Day 19 — They Were Not Alone" /><figcaption>HISTORY — DAY 19 · THEY WERE NOT ALONE</figcaption></figure>`);
  }

  const myth17 = q('#myth-day-17');
  if (myth17) {
    myth17.id = 'myth-day-19';
    setHTML('#myth-day-19 .copy', `<div class="kicker red">MYTH &amp; SAGA — DAY 19</div><h2>THE RAVEN WHO REMEMBERS</h2><p>In the old stories, Odin had two ravens: <strong>Huginn</strong> and <strong>Muninn</strong>, names commonly understood as Thought and Memory.</p><p>Each day they flew across the world, gathering what they saw and heard before returning to Odin.</p><p>In <em>Grímnismál</em>, Odin says he fears that Huginn may not return — yet he fears even more for Muninn.</p><p>Perhaps because thought may wander. But without memory, what remains of the stories we have lived?</p><p><strong>THOUGHT MAY GUIDE THE VOYAGE. MEMORY KEEPS THE SAGA ALIVE.</strong></p><figure class="framed"><img class="zoomable" src="day-19-myth-saga.jpg" alt="Myth and Saga Day 19 — The Raven Who Remembers" /><figcaption>MYTH &amp; SAGA — DAY 19 · THE RAVEN WHO REMEMBERS</figcaption></figure>`);
  }

  const watch17 = q('#night-watch-day-17');
  if (watch17) {
    watch17.id = 'night-watch-day-19';
    setHTML('#night-watch-day-19 .copy', `<div class="kicker gold">NIGHT WATCH — DAY 19</div><h2>THE FIRE STILL BURNS</h2><p>The camp has finally grown quiet. Voices have faded. The feast is over. Beyond the firelight, our ships rest against the shore.</p><p>Tonight, something changed.</p><p>We arrived in Newfoundland as a fleet. But before the night was over, the crew had begun writing the saga themselves.</p><p>One raven returned. One Viking accepted a new duty. And around these fires, our story became something no Captain could write alone.</p><p>Tomorrow, Chapter III awaits. <strong>But not tonight. Tonight we rest.</strong></p><p>The last Viking on watch adds another piece of wood to the fire… and somewhere in the darkness, a raven is still watching.</p><p><strong>🐦‍⬛ ONE CREW. ONE SAGA. ⚔️</strong></p><figure class="framed"><img class="zoomable" src="day-19-night-watch.jpg" alt="Night Watch Day 19 — The Fire Still Burns" /><figcaption>NIGHT WATCH — DAY 19 · THE FIRE STILL BURNS</figcaption></figure>`);
  }

  /* Day 19 special Hugin & Munin recognition — an in-world role, not a historical office. */
  const sagaSection = q('#our-saga-day-19');
  if (sagaSection && !q('#keeper-of-the-saga-day-19')) sagaSection.insertAdjacentHTML('afterend', `<section class="dark-section" id="keeper-of-the-saga-day-19"><div class="wrap"><div class="copy"><div class="kicker gold">HUGIN &amp; MUNIN — DAY 19</div><h2>THE RAVEN RETURNS</h2><p>Munin returned to the Newfoundland shore carrying something more important than a message: <strong>memory.</strong></p><p>While the Captain slept, Þóra had already begun doing what the saga needed — keeping the fires, the watch, the people and the story together.</p><p>This is not another naming. It is a role within <strong>OUR SAGA</strong>: <strong>KEEPER OF THE SAGA.</strong></p><p><strong>You did not ask for this title, Þóra. You earned it by already doing the work.</strong></p><p>The Keeper does not replace the Captain and does not command the fleet. She helps remember what we have lived, carry the story forward and help the crew write its next lines.</p><p><strong>🐦‍⬛ ONE CREW. ONE SAGA. 🐦‍⬛</strong></p><figure class="framed"><img class="zoomable" src="day-19-keeper-of-the-saga.jpg" alt="Þóra — Keeper of the Saga" /><figcaption>HUGIN &amp; MUNIN · ÞÓRA · KEEPER OF THE SAGA</figcaption></figure></div></div></section>`);

  const lightbox = q('#lightbox');
  if (lightbox) {
    const full = lightbox.querySelector('img');
    document.querySelectorAll('img.zoomable').forEach((zoom) => {
      if (zoom.dataset.zoomBound) return;
      zoom.dataset.zoomBound = '1';
      zoom.addEventListener('click', (event) => { event.preventDefault(); if (!full) return; full.src = zoom.src; full.alt = zoom.alt || 'Enlarged Viking Voyage artwork'; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); document.body.classList.add('lightbox-open'); });
    });
  }

  const archiveTitle = q('#voyage-archive h2'); if (archiveTitle) archiveTitle.textContent = 'NEWFOUNDLAND — DAY 19';
  const archiveIntro = q('#voyage-archive .gallery-intro'); if (archiveIntro) archiveIntro.innerHTML = 'Chapter I and Chapter II remain frozen in the voyage record. Day 19 records the night the fleet stayed ashore on <strong>Newfoundland</strong> — and the crew began writing the saga themselves.';
  const gallery = q('#voyage-archive .gallery-grid');
  if (gallery && !gallery.querySelector('img[src="day-19-viking-dispatch.jpg"]')) gallery.insertAdjacentHTML('afterbegin', `<figure><img src="day-19-viking-dispatch.jpg" alt="Day 19 Viking Dispatch" /><figcaption><strong>DAY 19 · VIKING DISPATCH</strong></figcaption></figure><figure><img src="day-19-crew-honors.jpg" alt="Day 19 Crew Honors" /><figcaption><strong>DAY 19 · CREW HONORS</strong></figcaption></figure><figure><img src="day-19-our-saga.jpg" alt="Day 19 Our Saga" /><figcaption><strong>DAY 19 · OUR SAGA</strong></figcaption></figure><figure><img src="day-19-keeper-of-the-saga.jpg" alt="Day 19 Keeper of the Saga" /><figcaption><strong>DAY 19 · KEEPER OF THE SAGA</strong></figcaption></figure><figure><img src="day-19-myth-saga.jpg" alt="Day 19 Myth and Saga" /><figcaption><strong>DAY 19 · MYTH &amp; SAGA</strong></figcaption></figure><figure><img src="day-19-history.jpg" alt="Day 19 History" /><figcaption><strong>DAY 19 · HISTORY</strong></figcaption></figure><figure><img src="day-19-night-watch.jpg" alt="Day 19 Night Watch" /><figcaption><strong>DAY 19 · NIGHT WATCH</strong></figcaption></figure>`);

  const sources = q('#sources .wrap');
  if (sources) sources.innerHTML = `<div class="kicker gold">SOURCES &amp; HISTORICAL NOTES</div><h2>THE HISTORY MUST BE TRUE</h2><p>Historical material is kept separate from OUR SAGA. Day 19's HISTORY entry distinguishes the saga accounts of <em>Skrælingar</em> from what can be stated securely about Indigenous presence in the lands reached by the Norse. The exact identities and locations of individual saga encounters remain uncertain.</p><p>Day 19's MYTH &amp; SAGA entry draws on <em>Grímnismál</em> and the tradition of Odin's ravens Huginn and Muninn. Þóra's title <strong>Keeper of the Saga</strong> belongs explicitly to Viking Voyage II's living saga and is not presented as a documented Viking Age office.</p><p>Old Norse forms and Viking Age name evidence used in Crew Honors are checked against runic and scholarly name resources.</p>`;

  const closing = q('.closing-saga .wrap'); if (closing) closing.innerHTML = '<p>“One Crew.<br>One Saga.”</p><span>DAY 19 · 94 VIKINGS · 33,841,086 STEPS · NEWFOUNDLAND · THE CREW WRITES THE SAGA</span>';
})();