# The Far Post

Marketing site for The Far Post, the licensed club at Cromer Park (home of Manly United FC and the broader MWFA community).

**Live preview:** https://scottyg023.github.io/the-far-post/

## Pages

| Page | Path | Purpose |
|---|---|---|
| Home | `/` | Hero, hours, membership, what's on, functions teaser |
| About | `/about.html` | Who We Are, photo gallery, why The Far Post |
| Functions | `/functions.html` | Function packages, occasions, enquiry form |
| Contact | `/contact.html` | Hours, location, map, table reservation form |

## How it works

- **Pure static HTML/CSS/JS** — no build, no backend.
- **Forms use mailto** — submitting a form opens the user's email client with a pre-filled message to `thefarpost@mwfa.com.au`. Switch to a real backend later if you want (Formspree, etc.).
- **Opening hours pill** on the home hero auto-shows "Open now / Currently closed" based on current Sydney time (`js/main.js`).
- **What's On** events are pulled from `data/events.json` — edit one file to update the homepage event grid.

## Editing common things

| To change | Edit |
|---|---|
| Upcoming events | `data/events.json` |
| Opening hours | `js/main.js` (SCHEDULE map) and the hours card in `index.html` / `contact.html` |
| About copy | `about.html` |
| Function packages | `functions.html` |
| Brand colours | `css/styles.css` (top `:root` block) |

## Local preview

```bash
cd FarPost
python3 -m http.server 8770
# Open http://localhost:8770/
```

## Rebuilt from

This site was rebuilt from the Wayback Machine snapshot at:
https://web.archive.org/web/20250510060141/https://thefarpost.com.au/

All copy and brand assets sourced from that snapshot.
