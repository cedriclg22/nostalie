// Pictos du site, injectés une fois dans la page puis utilisés via <svg class="ic"><use href="#i-…"/></svg>.
(function () {
  const SYMBOLES = `
  <symbol id="i-phone" viewBox="0 0 24 24"><rect x="6.5" y="2.5" width="11" height="19" rx="2.6"/><path d="M10.8 18.4h2.4"/></symbol>
  <symbol id="i-spark" viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z"/></symbol>
  <symbol id="i-box" viewBox="0 0 24 24"><path d="M3.5 7.5L12 3.2l8.5 4.3v9L12 20.8l-8.5-4.3z"/><path d="M3.5 7.5L12 11.8l8.5-4.3"/><path d="M12 11.8v9"/></symbol>
  <symbol id="i-wifi" viewBox="0 0 24 24"><path d="M4 9.5a13 13 0 0 1 16 0"/><path d="M7 13a8.5 8.5 0 0 1 10 0"/><circle cx="12" cy="17.5" r="1.2" fill="currentColor" stroke="none"/></symbol>
  <symbol id="i-home" viewBox="0 0 24 24"><path d="M3.5 11L12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5h4v5"/></symbol>
  <symbol id="i-frame" viewBox="0 0 24 24"><rect x="4" y="2.5" width="16" height="19" rx="1.8"/><rect x="7.5" y="6" width="9" height="12" rx=".6"/></symbol>
  <symbol id="i-puzzle" viewBox="0 0 24 24"><path d="M10 3.5H5.5a2 2 0 0 0-2 2V10h1.3a2 2 0 1 1 0 4H3.5v4.5a2 2 0 0 0 2 2H10v-1.3a2 2 0 1 1 4 0v1.3h4.5a2 2 0 0 0 2-2V14h-1.3a2 2 0 1 1 0-4h1.3V5.5a2 2 0 0 0-2-2H14v1.3a2 2 0 1 1-4 0z"/></symbol>
  <symbol id="i-screen" viewBox="0 0 24 24"><rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M8.5 21h7M12 17v4"/></symbol>
  <symbol id="i-search" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6"/><path d="M20 20l-5.2-5.2"/></symbol>
  <symbol id="i-grid" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M9.2 3.5v17M14.8 3.5v17M3.5 9.2h17M3.5 14.8h17"/></symbol>
  <symbol id="i-bulb" viewBox="0 0 24 24"><path d="M9.5 18h5M10.5 21h3"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3z"/></symbol>
  <symbol id="i-diff" viewBox="0 0 24 24"><rect x="2.5" y="5" width="8.5" height="14" rx="1.6"/><rect x="13" y="5" width="8.5" height="14" rx="1.6"/><circle cx="17.25" cy="12" r="1.8"/></symbol>
  <symbol id="i-key" viewBox="0 0 24 24"><circle cx="8" cy="15.5" r="4"/><path d="M11 12.5L19.5 4M16.5 7l2.5 2.5M14.3 9.2l1.8 1.8"/></symbol>
  <symbol id="i-play" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="M10 8.3l5.6 3.7-5.6 3.7z" fill="currentColor"/></symbol>
  <symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-9.3A4 4 0 0 1 12 8a4 4 0 0 1 7 2.7C19 15.6 12 20 12 20z"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></symbol>
  <symbol id="i-gift" viewBox="0 0 24 24"><rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5 12v8.5h14V12M12 8v12.5"/><path d="M12 8C10.5 5 7 4.5 7 6.6S10 8 12 8zM12 8c1.5-3 5-3.5 5-1.4S14 8 12 8z"/></symbol>
  <symbol id="i-cal" viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></symbol>
  <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
  <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></symbol>
  <symbol id="i-plug" viewBox="0 0 24 24"><path d="M9 2.5v4.5M15 2.5v4.5"/><path d="M7 7h10v3.5a5 5 0 0 1-10 0z"/><path d="M12 15.5v6"/></symbol>
  <symbol id="i-qr" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1"/><rect x="14" y="3.5" width="6.5" height="6.5" rx="1"/><rect x="3.5" y="14" width="6.5" height="6.5" rx="1"/><path d="M14 14h3v3h-3zM20.5 14v.01M14 20.5h.01M17.5 17.5h3v3h-3z"/></symbol>`;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'sprite');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = '<defs>' + SYMBOLES + '</defs>';
  document.body.prepend(svg);
})();
