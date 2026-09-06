(() => {
  const assets = {
    dispatch: 'day-16-dispatch.png',
    saga: 'day-16-our-saga.png',
    honors: 'day-16-crew-honors.png',
    myth: 'day-16-myth-and-saga.png',
    night: 'day-16-night-watch.png',
    map: 'day-16-map.png'
  };

  const addFigure = ({ key, selector, alt, caption, className = 'framed', beforeSelector = null }) => {
    const section = document.querySelector(selector);
    if (!section) return;
    const old = section.querySelector(`[data-day16-art="${key}"]`);
    if (old) old.remove();

    const figure = document.createElement('figure');
    figure.className = className;
    figure.dataset.day16Art = key;

    const img = document.createElement('img');
    img.className = 'zoomable';
    img.src = assets[key];
    img.alt = alt;
    img.loading = 'lazy';
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `${alt} — tap to enlarge`);

    const figcaption = document.createElement('figcaption');
    figcaption.textContent = caption;
    figure.append(img, figcaption);

    const anchor = beforeSelector ? section.querySelector(beforeSelector) : null;
    if (anchor) anchor.parentNode.insertBefore(figure, anchor);
    else (section.querySelector('.copy') || section.querySelector('.wrap') || section).appendChild(figure);
  };

  addFigure({ key:'dispatch', selector:'#dispatch', alt:'Viking Dispatch — Day 16 · Chapter II begins', caption:'VIKING DISPATCH — DAY 16 · CHAPTER II BEGINS' });
  addFigure({ key:'map', selector:'#voyage-map', alt:'The Voyage Map — Day 16 · North American Mainland to Newfoundland', caption:'THE VOYAGE MAP — DAY 16 · CHAPTER II', className:'wide-map' });
  addFigure({ key:'saga', selector:'#our-saga-day-16', alt:'Our Saga — Day 16 · Chapter II', caption:'OUR SAGA — DAY 16 · CHAPTER II' });
  addFigure({ key:'honors', selector:'#honors', alt:'Crew Honors — Day 16 · Arne, Thyra and Halfdan', caption:'CREW HONORS — DAY 16 · ARNE · THYRA · HALFDAN', className:'framed light', beforeSelector:'.naming-list' });
  addFigure({ key:'myth', selector:'#myth-day-16', alt:'Myth & Saga — Day 16 · The Empty Perch', caption:'MYTH & SAGA — DAY 16 · THE EMPTY PERCH', className:'framed light' });
  addFigure({ key:'night', selector:'#night-watch-day-16', alt:'Night Watch — Day 16 · Chapter II', caption:'NIGHT WATCH — DAY 16 · CHAPTER II' });

  const archiveImage = document.querySelector('#voyage-archive img');
  if (archiveImage) {
    archiveImage.src = assets.dispatch;
    archiveImage.alt = 'Viking Voyage II — Day 16 · Chapter II';
    archiveImage.classList.add('zoomable');
  }

  document.querySelectorAll('#voyage-archive .archive-day').forEach(card => {
    const dayLabel = card.querySelector('.archive-day-copy span')?.textContent.trim();
    if (dayLabel === 'DAY 14') card.setAttribute('href', 'archive/day-14.html');
    if (dayLabel === 'DAY 15') card.setAttribute('href', 'archive/day-15.html');
  });
})();