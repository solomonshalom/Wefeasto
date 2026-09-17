# Wefeasto

A simple, no-nonsense website to buy what's crunchy & good!

---

## 🍲 The site is currently under maintenance

`index.html` is a standalone holding page — half cereal, half "We're cooking <33".
The real site is parked alongside it, untouched:

| File | What it is |
| --- | --- |
| `index.html` | The holding page visitors see |
| `404.html` | An exact copy of `index.html`, so old or bookmarked URLs land here too instead of a bare 404 |
| `home.html` | The real homepage (was `index.html`) |
| `home-recipe.html` | The real recipes page (was `recipe.html`) |
| `assets/images/cooking.jpg` | The photo on the holding page. **Only 494x740** — see the note below |

Nothing was deleted and nothing inside the real pages was edited — they were
only renamed, so waking the site up is a pure rename back.

### To wake the site up

```bash
git mv index.html maintenance.html   # keep the page around for next time
git mv home.html index.html
git mv home-recipe.html recipe.html
rm 404.html
git commit -am "Wake the site up"
```

### To put it back

```bash
git mv index.html home.html
git mv recipe.html home-recipe.html
git mv maintenance.html index.html
cp index.html 404.html
git commit -am "Back under maintenance"
```

### Notes

- One self-contained file, ~4 KB. No build step, no frameworks. It loads
  Poppins (300 + 500) from Google Fonts, the same family the main site uses,
  and falls back to the system sans if that's blocked.
- **The photo is low resolution.** `cooking.jpg` is 494x740, because that's the
  size it arrived at after being sent through chat. It fills half the screen,
  so it is upscaled roughly 1.5x on a laptop and ~3x on a retina display. The
  granola texture hides most of it, but drop the original file in over the top
  of `assets/images/cooking.jpg` when you have it and the page picks it up with
  no other changes.
- To swap the photo, point `.photo` at a different file in `assets/images/`.
- The seam between the two halves is a wavy cut, done with an SVG mask on
  `.photo` (`mask-image`, stretched via `mask-size: 100% 100%`). There are two:
  a vertical wave for the side-by-side layout and a gentler horizontal one for
  when the halves stack. If a browser doesn't support masks, the seam just
  falls back to a straight edge. The photo column is `1.06fr` rather than
  `1fr` so the wave's crests and troughs average out on the page's centre line.
- It re-checks itself every 5 minutes (`<meta http-equiv="refresh">`), so open
  tabs pick the real site back up on their own once you wake it.
- It's marked `noindex, nofollow` so search engines don't index the holding
  page over your real pages. That tag disappears with the page when you restore.
- **If you edit `index.html`, re-copy it to `404.html`** (`cp index.html 404.html`)
  so the two stay in sync.
- While the site is down, links inside `home.html` that point at `recipe.html`
  will land on the holding page. That's intended — the whole site is down.
