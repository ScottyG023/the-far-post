// Mobile menu toggle + dynamic "Open / Closed" pill.

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // Opening hours pill — checks current Sydney time
  const pill = document.getElementById('hoursPill');
  const pillText = document.getElementById('hoursPillText');
  if (pill && pillText) {
    const SYDNEY_TZ = 'Australia/Sydney';
    // Hours table by day-of-week (0 = Sunday, 1 = Mon, …)
    const SCHEDULE = {
      0: { open: 12, close: 19, label: 'Sun · 12pm – 7pm' },        // Sunday
      1: { open: 15, close: 19, label: 'Mon · 3pm – 7pm' },         // Monday
      2: { open: 15, close: 19, label: 'Tue · 3pm – 7pm' },
      3: { open: 15, close: 19, label: 'Wed · 3pm – 7pm' },
      4: { open: 15, close: 19, label: 'Thu · 3pm – 7pm' },
      5: { open: 12, close: 20, label: 'Fri · 12pm – 8pm' },
      6: { open: 12, close: 20, label: 'Sat · 12pm – 8pm' },
    };

    // Get current Sydney day-of-week and hour
    const now = new Date();
    const fmt = new Intl.DateTimeFormat('en-AU', {
      timeZone: SYDNEY_TZ, weekday: 'short', hour: 'numeric', hour12: false
    });
    const parts = Object.fromEntries(fmt.formatToParts(now).map(p => [p.type, p.value]));
    const wd = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(parts.weekday);
    const hour = parseInt(parts.hour, 10);

    const today = SCHEDULE[wd];
    const isOpen = hour >= today.open && hour < today.close;

    if (isOpen) {
      pill.classList.remove('closed');
      pillText.textContent = `Open now · until ${formatHour(today.close)}`;
    } else {
      pill.classList.add('closed');
      // Find next opening
      let next = wd;
      for (let i = 0; i < 7; i++) {
        const candidate = (wd + i) % 7;
        const sched = SCHEDULE[candidate];
        if (i === 0 && hour < sched.open) { next = candidate; break; }
        if (i > 0) { next = candidate; break; }
      }
      const nextSched = SCHEDULE[next];
      const dayLabel = (next === wd) ? 'today' : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][next];
      pillText.textContent = `Currently closed · opens ${dayLabel} ${formatHour(nextSched.open)}`;
    }
  }

  function formatHour(h) {
    if (h === 12) return '12pm';
    if (h === 0) return '12am';
    if (h > 12) return `${h - 12}pm`;
    return `${h}am`;
  }
});
