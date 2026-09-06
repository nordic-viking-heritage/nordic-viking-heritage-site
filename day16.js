(() => {
  const assets = {
    dispatch: ['assets/day16/dispatch-00.b64', 'assets/day16/dispatch-01.b64'],
    saga: ['assets/day16/oursaga.b64'],
    honors: ['assets/day16/honors.b64'],
    myth: ['assets/day16/myth.b64'],
    night: ['assets/day16/night.b64'],
    map: ['assets/day16/map.b64']
  };

  const loadDataUrl = async parts => {
    const chunks = await Promise.all(parts.map(async path => {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`Could not load ${path}`);
      return (await response.text()).trim();
    }));
    return `data:image/webp;base64,${chunks.join('')}`;
  };

  const addFigure = async ({ key, selector, alt, caption, className = 'framed', beforeSelector = null }) => {
    const section = document.querySelector(selector);
    if (!section || section.querySelector(`[data-day16-art="${key}"]`)) return null;
    try {
      const src = await loadDataUrl(assets[key]);
      const figure = document.createElement('figure');
      figure.className = className;
      figure.dataset.day16Art = key;

      const img = document.createElement('img');
      img.className = 'zoomable';
      img.src = src;
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
      return src;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  Promise.all([
    addFigure({
      key: 'dispatch',
      selector: '#dispatch',
      alt: 'Viking Dispatch — Day 16 · Chapter II begins',
      caption: 'VIKING DISPATCH — DAY 16 · CHAPTER II BEGINS'
    }),
    addFigure({
      key: 'map',
      selector: '#voyage-map',
      alt: 'The Voyage Map — Day 16 · North American Mainland to Newfoundland',
      caption: 'THE VOYAGE MAP — DAY 16 · CHAPTER II',
      className: 'wide-map'
    }),
    addFigure({
      key: 'saga',
      selector: '#our-saga-day-16',
      alt: 'Our Saga — Day 16 · Chapter II',
      caption: 'OUR SAGA — DAY 16 · CHAPTER II'
    }),
    addFigure({
      key: 'honors',
      selector: '#honors',
      alt: 'Crew Honors — Day 16 · Arne, Thyra and Halfdan',
      caption: 'CREW HONORS — DAY 16 · ARNE · THYRA · HALFDAN',
      className: 'framed light',
      beforeSelector: '.naming-list'
    }),
    addFigure({
      key: 'myth',
      selector: '#myth-day-16',
      alt: 'Myth & Saga — Day 16 · The Empty Perch',
      caption: 'MYTH & SAGA — DAY 16 · THE EMPTY PERCH',
      className: 'framed light'
    }),
    addFigure({
      key: 'night',
      selector: '#night-watch-day-16',
      alt: 'Night Watch — Day 16 · Chapter II',
      caption: 'NIGHT WATCH — DAY 16 · CHAPTER II'
    })
  ]).then(results => {
    const dispatchSrc = results[0];
    const archiveImage = document.querySelector('#voyage-archive img');
    if (archiveImage && dispatchSrc) {
      archiveImage.src = dispatchSrc;
      archiveImage.alt = 'Viking Voyage II — Day 16 · Chapter II';
      archiveImage.classList.add('zoomable');
      archiveImage.tabIndex = 0;
      archiveImage.setAttribute('role', 'button');
      archiveImage.setAttribute('aria-label', 'Viking Voyage II — Day 16 · Chapter II — tap to enlarge');
    }
  });
})();