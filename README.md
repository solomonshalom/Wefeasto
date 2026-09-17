# Wefeasto

A simple, no-nonsense website to buy what's crunchy & good!

---

## 🍲 The site is currently under maintenance

`index.html` is a standalone holding page — half cereal, half "Cooking <3".
The real site is parked alongside it, untouched:

| File | What it is |
| --- | --- |
| `index.html` | The holding page visitors see |
| `404.html` | An exact copy of `index.html`, so old or bookmarked URLs land here too instead of a bare 404 |
| `home.html` | The real homepage (was `index.html`) |
| `home-recipe.html` | The real recipes page (was `recipe.html`) |
| `assets/images/cooking.jpg` | The photo on the holding page (a 200 KB copy of `oats.jpg`, which is 1.8 MB) |

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
  Playfair Display from Google Fonts (the same font the main site uses) and
  falls back to Georgia if that's blocked.
- To swap the photo, point `.photo` at a different file in `assets/images/`.
- It re-checks itself every 5 minutes (`<meta http-equiv="refresh">`), so open
  tabs pick the real site back up on their own once you wake it.
- It's marked `noindex, nofollow` so search engines don't index the holding
  page over your real pages. That tag disappears with the page when you restore.
- **If you edit `index.html`, re-copy it to `404.html`** (`cp index.html 404.html`)
  so the two stay in sync.
- While the site is down, links inside `home.html` that point at `recipe.html`
  will land on the holding page. That's intended — the whole site is down.
