(function() {

  // Whitelisted domains (exact match)
  const allowedDomains = [
    "yonotv-now.pages.dev",
    "yonotv.pages.dev",
    ""
  ];

  // Detect if page is in an iframe
  const isIframe = window.self !== window.top;

  // Check parent domain
  let allowed = false;
  const referrer = document.referrer;

  if (referrer) {
    try {
      const refDomain = new URL(referrer).hostname;
      allowed = allowedDomains.includes(refDomain); // exact match
    } catch (e) {
      allowed = false;
    }
  }

  // Block direct access, hotlink, or unknown referrer
  if (!isIframe || !allowed) {
    window.location.replace("https://www.google.com");
    return;
  }

  // Disable right-click context menu
  document.addEventListener('contextmenu', e => {
    e.preventDefault();
    alert('Right-click is disabled on this page.');
  });

  // Disable DevTools and view-source shortcuts
  document.addEventListener('keydown', e => {
    const blockedKeys = ['F12'];
    const blockedCombinations = [
      {ctrl: true, shift: true, key: 'I'},
      {ctrl: true, shift: true, key: 'J'},
      {ctrl: true, key: 'U'}
    ];

    // Block single keys
    if (blockedKeys.includes(e.key)) e.preventDefault();

    // Block combinations
    for (const combo of blockedCombinations) {
      const ctrlMatch = combo.ctrl ? e.ctrlKey : true;
      const shiftMatch = combo.shift ? e.shiftKey : true;
      if (ctrlMatch && shiftMatch && e.key.toUpperCase() === combo.key) {
        e.preventDefault();
      }
    }
  });

})();
