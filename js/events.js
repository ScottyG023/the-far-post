// What's On grid — pulls upcoming events from data/events.json.

(async function renderEvents() {
  const grid = document.getElementById('eventGrid');
  if (!grid) return;

  let data;
  try {
    const res = await fetch('data/events.json');
    data = await res.json();
  } catch (err) {
    console.error('Could not load events.json:', err);
    return;
  }

  const events = (data.events || [])
    .map((e) => ({ ...e, _date: new Date(e.date) }))
    .filter((e) => !isNaN(e._date))
    .sort((a, b) => a._date - b._date);

  if (events.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2.5rem; color: var(--fp-muted); font-style: italic;">
        Watch this space — events coming soon.
      </div>`;
    return;
  }

  const frag = document.createDocumentFragment();
  for (const e of events.slice(0, 6)) {
    const card = document.createElement('div');
    card.className = 'event-card';
    const month = e._date.toLocaleString('en-AU', { month: 'short' });
    const day = e._date.getDate();
    card.innerHTML = `
      <div class="event-date">
        <div class="month">${escapeHtml(month)}</div>
        <div class="day">${day}</div>
      </div>
      <div>
        <div class="event-meta">${escapeHtml(e.tag || '')}</div>
        <h3>${escapeHtml(e.title)}</h3>
        <p>${escapeHtml(e.description || '')}</p>
      </div>
    `;
    frag.appendChild(card);
  }
  grid.appendChild(frag);

  function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }
})();
