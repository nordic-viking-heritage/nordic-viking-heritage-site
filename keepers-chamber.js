(() => {
  const chamber = document.getElementById('keepers-chamber');
  if (!chamber) return;

  const cards = chamber.querySelectorAll('.keeper-card');
  const crewVoices = cards[0];
  if (!crewVoices) return;

  const style = document.createElement('style');
  style.id = 'keepers-chamber-form-style';
  style.textContent = `
    #keepers-chamber .keeper-form { margin-top:1rem; display:grid; gap:.85rem; }
    #keepers-chamber .keeper-field { display:grid; gap:.4rem; }
    #keepers-chamber .keeper-field label { color:#c9a35b; font-size:.76rem; font-weight:700; letter-spacing:.09em; }
    #keepers-chamber .keeper-field input,
    #keepers-chamber .keeper-field textarea { width:100%; box-sizing:border-box; border:1px solid rgba(201,163,91,.38); background:#050d11; color:#f1eadb; border-radius:0; padding:.8rem .85rem; font:inherit; }
    #keepers-chamber .keeper-field textarea { min-height:130px; resize:vertical; }
    #keepers-chamber .keeper-field input:focus,
    #keepers-chamber .keeper-field textarea:focus { outline:2px solid rgba(201,163,91,.42); outline-offset:1px; }
    #keepers-chamber .keeper-consent { display:flex; gap:.65rem; align-items:flex-start; color:#bdb4a5; font-size:.82rem; line-height:1.45; }
    #keepers-chamber .keeper-consent input { margin-top:.2rem; }
    #keepers-chamber .keeper-submit { appearance:none; border:1px solid #c9a35b; background:rgba(201,163,91,.10); color:#f1eadb; padding:.8rem 1rem; font-weight:800; letter-spacing:.08em; cursor:pointer; }
    #keepers-chamber .keeper-submit:disabled { opacity:.45; cursor:not-allowed; }
    #keepers-chamber .keeper-status { min-height:1.4em; margin:0; color:#cfc6b6; font-size:.87rem; line-height:1.45; }
    #keepers-chamber .keeper-status.success { color:#e7d39d; }
    #keepers-chamber .keeper-honeypot { position:absolute !important; left:-9999px !important; width:1px !important; height:1px !important; overflow:hidden !important; }
  `;
  document.head.appendChild(style);

  crewVoices.innerHTML = `
    <span>CREW VOICES</span>
    <strong>Leave your mark on the saga</strong>
    <p>Short thoughts, memories and moments from the voyage may become part of the crew's living record after review by the Keeper.</p>
    <form class="keeper-form" id="crew-voices-form" novalidate>
      <div class="keeper-field">
        <label for="crew-identity">YOUR PACER / VIKING NAME</label>
        <input id="crew-identity" name="identity" maxlength="60" autocomplete="nickname" required>
      </div>
      <div class="keeper-field">
        <label for="crew-message">YOUR MESSAGE</label>
        <textarea id="crew-message" name="message" maxlength="700" required></textarea>
      </div>
      <div class="keeper-honeypot" aria-hidden="true">
        <label for="crew-website">Website</label>
        <input id="crew-website" name="website" tabindex="-1" autocomplete="off">
      </div>
      <label class="keeper-consent">
        <input type="checkbox" name="consent" required>
        <span>If my message is approved, my public Pacer/Viking name may be shown with it. Do not enter private real-world information.</span>
      </label>
      <button class="keeper-submit" type="submit" disabled>SEND TO THE KEEPER 🐦‍⬛</button>
      <p class="keeper-status" role="status" aria-live="polite">The raven route is being prepared.</p>
    </form>`;

  const form = crewVoices.querySelector('#crew-voices-form');
  const button = crewVoices.querySelector('.keeper-submit');
  const status = crewVoices.querySelector('.keeper-status');
  if (!form || !button || !status) return;

  const setStatus = (text, success = false) => {
    status.textContent = text;
    status.classList.toggle('success', success);
  };

  fetch('/api/crew-voices', { headers: { Accept: 'application/json' }, cache: 'no-store' })
    .then(r => r.ok ? r.json() : Promise.reject(new Error('Not ready')))
    .then(data => {
      if (data.ready) {
        button.disabled = false;
        setStatus('Messages are reviewed before they enter the saga.');
      } else {
        setStatus('The raven route is being prepared. Please check back soon.');
      }
    })
    .catch(() => setStatus('The raven route is being prepared. Please check back soon.'));

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (button.disabled) return;

    const data = new FormData(form);
    const identity = String(data.get('identity') || '').trim();
    const message = String(data.get('message') || '').trim();
    const website = String(data.get('website') || '').trim();
    const consent = data.get('consent') === 'on';

    if (!identity || !message || !consent) {
      setStatus('Please add your Viking/Pacer name, a message, and confirm the privacy note.');
      return;
    }

    button.disabled = true;
    setStatus('A raven is carrying your message…');

    try {
      const response = await fetch('/api/crew-voices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ identity, message, website, consent })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || 'Submission failed.');

      form.reset();
      setStatus('🐦‍⬛ YOUR MESSAGE HAS BEEN CARRIED TO THE KEEPER. It will be read before it enters the saga.', true);
    } catch (error) {
      setStatus(error.message || 'The raven lost the route. Please try again later.');
      button.disabled = false;
    }
  });
})();
