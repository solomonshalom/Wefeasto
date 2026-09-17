# Wefeasto

A simple, no-nonsense website to buy what's crunchy & good!

---

## 😴 The site is currently in sleep mode

`index.html` is a standalone "under maintenance" page. The real site is parked
alongside it, untouched:

| File | What it is |
| --- | --- |
| `index.html` | The sleep-mode / maintenance page visitors see |
| `404.html` | An exact copy of `index.html`, so old or bookmarked URLs land here too instead of a bare 404 |
| `home.html` | The real homepage (was `index.html`) |
| `home-recipe.html` | The real recipes page (was `recipe.html`) |

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

### To put it back to sleep

```bash
git mv index.html home.html
git mv recipe.html home-recipe.html
git mv maintenance.html index.html
cp index.html 404.html
git commit -am "Back to sleep"
```

### Notes

- The page is a single self-contained file — no build step, no frameworks. It
  only reaches out for the same Google Fonts the main site already uses, and
  degrades gracefully if they don't load.
- It re-checks itself every 5 minutes (`<meta http-equiv="refresh">`), so open
  tabs pick the real site back up on their own once you wake it.
- It's marked `noindex, nofollow` so search engines don't index the maintenance
  copy over your real pages. That tag disappears with the page when you restore.
- Animations are disabled automatically for anyone who has "reduce motion"
  turned on.
- **If you edit `index.html`, re-copy it to `404.html`** (`cp index.html 404.html`)
  so the two stay in sync.
- While asleep, links inside `home.html` that point at `recipe.html` will land
  on the maintenance page. That's intended — the whole site is sleeping.
