(() => {
  const q = (s) => document.querySelector(s);
  const setHTML = (s, html) => { const el = q(s); if (el) el.innerHTML = html; };

  // DAY 18 — current voyage status
  setHTML('#voyage .status-head > div:first-child', `
    <div class="kicker red">THE SHIP'S LOG — DAY 18</div>
    <h1>LAND! — NEWFOUNDLAND</h1>
    <p>After wind, waves and fog, the fleet found land. Chapter II is complete. Tonight the ships rest on the shores of Newfoundland.</p>`);
  setHTML('#voyage .stats', `
    <article><strong>89</strong><small>SAILORS ABOARD</small><em>One fleet</em></article>
    <article><strong>30,701,056</strong><small>TOTAL STEPS</small><em>Steps toward Florida</em></article>
    <article><strong>≈ 19,955.7 KM</strong><small>DISTANCE COVERED</small><em>From Greenland</em></article>
    <article><strong>40.93%</strong><small>OF OUR GOAL</small><em>75,000,000 steps</em></article>`);

  // Dispatch
  setHTML('#dispatch .copy', `
    <div class="kicker gold">VIKING DISPATCH — DAY 18</div>
    <h2>LAND! — NEWFOUNDLAND</h2>
    <p>Yesterday, the sea showed us no mercy. Wind howled through the rigging, waves rose around the ships and fog swallowed the horizon.</p>
    <p>Still, the crew rowed. Today, <strong>89 Vikings</strong> drove the fleet forward with another <strong>4,823,183 steps</strong> — approximately <strong>3,135.1 km</strong>.</p>
    <p>And then a shape appeared through the mist. Dark. Solid. Real.</p>
    <p><strong>LAND — NEWFOUNDLAND.</strong></p>
    <p>After <strong>30,701,056 total steps</strong> — approximately <strong>19,955.7 km</strong> — our keels have reached the shore.</p>
    <p><strong>CHAPTER II IS COMPLETE.</strong></p>
    <p>Pull the ships ashore. Lay down the oars. Light the fires. Tonight, we sail no farther.</p>`);

  // Chapter II map/status is now frozen at Newfoundland.
  setHTML('#voyage-map .wrap', `
    <div class="kicker gold">THE VOYAGE MAP — CHAPTER II</div>
    <h2>NORTH AMERICAN MAINLAND → NEWFOUNDLAND</h2>
    <p class="intro">The fleet has reached Newfoundland. <strong>Chapter II is complete and now frozen in the voyage record.</strong></p>
    <p class="intro">Any progress beyond the Chapter II landfall is carried forward into the next chapter rather than rewriting the completed crossing.</p>
    <div class="tags"><span>DAY 18</span><span>89 SAILORS</span><span>30,701,056 STEPS</span><span>≈ 19,955.7 KM</span><span>40.93% COMPLETE</span></div>`);

  // Three-layer links: Day 18 saga is current; Day 17 history/myth remain the latest verified entries.
  const sagaLayer = q('.layer-grid a[href="#our-saga-day-17"]');
  if (sagaLayer) sagaLayer.setAttribute('href', '#our-saga-day-18');
  const navSaga = q('.floating-nav a[href="#our-saga-day-17"]');
  if (navSaga) navSaga.setAttribute('href', '#our-saga-day-18');

  const saga17 = q('#our-saga-day-17');
  if (saga17) {
    saga17.id = 'our-saga-day-18';
    setHTML('#our-saga-day-18 .copy', `
      <div class="kicker gold">OUR SAGA — DAY 18</div>
      <h2>THE LAND BEYOND THE FOG</h2>
      <p>Yesterday, the sea took away our horizon. Wind tore at the sails. Waves rose against the hulls. Fog closed around the fleet.</p>
      <p>We knew Newfoundland was somewhere ahead. But knowing land exists is not the same as finding it.</p>
      <p>So we rowed. Through the night. Through the grey. Through the uncertainty.</p>
      <p>Slowly, the darkness ahead changed. At first, perhaps only a shadow. Cliffs. Rock. <strong>Land.</strong></p>
      <p>A cry passed from ship to ship: <strong>NEWFOUNDLAND!</strong></p>
      <p>One by one, the longships reached shore. Keels scraped stone. Ropes were thrown. Boots touched solid ground.</p>
      <p>Pull the ships ashore. Lay down the oars. Light the fires. Listen to the waves behind us.</p>
      <p><strong>WE FOUND THE LAND WE FEARED WE MIGHT NEVER SEE.</strong></p>
      <p><strong>CHAPTER II IS COMPLETE.</strong></p>
      <p>Tomorrow, a new chapter begins. But tonight… <strong>WE ARE IN NEWFOUNDLAND.</strong></p>`);
  }

  // Add Day 18 permanent names to THE SHIP'S ROLL if not already present.
  const roll = q('#ship-roll .roll-grid');
  if (roll && ![...roll.querySelectorAll('span')].some(x => x.textContent.trim() === 'manuelmorenocaz')) {
    roll.insertAdjacentHTML('beforeend', `
      <article><span>manuelmorenocaz</span><strong>Torsten</strong><small class="old-norse">Þórsteinn</small><small class="runes">ᚦᚢᚱᛋᛏᛁᚾ</small></article>
      <article><span>Dania</span><strong>Svala</strong><small class="old-norse">Svala</small><small class="runes">ᛋᚢᛅᛚᛅ</small></article>
      <article><span>Jonathan</span><strong>Bjarni</strong><small class="old-norse">Bjarni</small><small class="runes">ᛒᛁᛅᚱᚾᛁ</small></article>`);
  }

  // Crew Honors Day 18
  setHTML('#honors .wrap', `
    <div class="kicker red">CREW HONORS — DAY 18</div>
    <h2>THREE MORE NAMES ENTER THE SHIP'S ROLL</h2>
    <div class="honors-explainer"><div class="kicker red">THE HONOR BEHIND THE NAME</div><h3>EVERY OAR MATTERS</h3>
    <p>Crew Honors belongs to <strong>OUR SAGA</strong>. It is a Viking Voyage II tradition, not a claimed reconstruction of a documented Viking Age ceremony.</p>
    <p>Once entered into <strong>THE SHIP'S ROLL</strong>, a sailor's name remains part of this voyage.</p></div>
    <div class="naming-list">
      <article><span>MANUELMORENOCAZ</span><strong>TORSTEN <em>(Þórsteinn)</em></strong><small>ᚦᚢᚱᛋᛏᛁᚾ</small></article>
      <article><span>DANIA</span><strong>SVALA <em>(Svala)</em></strong><small>ᛋᚢᛅᛚᛅ</small></article>
      <article><span>JONATHAN</span><strong>BJARNI <em>(Bjarni)</em></strong><small>ᛒᛁᛅᚱᚾᛁ</small></article>
    </div>`);

  // Preserve Day 17 HISTORY and MYTH as the latest verified historical/myth entries until Day 18 entries are published.
  const historyKicker = q('#history-day-17 .kicker');
  if (historyKicker) historyKicker.textContent = 'LATEST HISTORY — DAY 17';

  // Archive heading records the completed chapter without pretending unpublished Day 18 artwork exists.
  const archiveTitle = q('#voyage-archive h2');
  if (archiveTitle) archiveTitle.textContent = 'CHAPTER II — COMPLETE';
  const archiveIntro = q('#voyage-archive .gallery-intro');
  if (archiveIntro) archiveIntro.innerHTML = 'Chapter I remains frozen in the archive. On Day 18 the fleet reached <strong>Newfoundland</strong>, completing Chapter II. Day 17 artwork remains preserved below as part of the voyage record.';

  // Closing record
  const closing = q('.closing-saga .wrap');
  if (closing) closing.innerHTML = '<p>“Every step counts.<br>Every Viking matters.”</p><span>DAY 18 · 89 VIKINGS · 30,701,056 STEPS · NEWFOUNDLAND · CHAPTER II COMPLETE</span>';
})();
