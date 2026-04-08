# ACCC QR Puzzle Site

This is a production-ready static GitHub Pages site for a 5-step ACCC-themed ARG puzzle flow.

## Files
- `index.html` — Puzzle 1
- `puzzle2.html` — Puzzle 2
- `puzzle3.html` — Puzzle 3
- `puzzle4.html` — Puzzle 4
- `puzzle5.html` — Final puzzle
- `styles.css` — Shared styling
- `common.js` — Shared puzzle logic and localStorage keyword tracking

## Deploy on GitHub Pages
1. Upload all files to your repo root.
2. Commit changes.
3. In GitHub: Settings → Pages.
4. Source: Deploy from branch.
5. Branch: `main`, Folder: `/ (root)`.

## Reset between playthroughs
The site stores discovered keywords in browser localStorage.
To reset on a device, open browser dev tools and clear site storage, or run:

```js
localStorage.removeItem('accc-arg-keywords')
```

## Customise
- Change accepted answers in each page's `setupPuzzle(...)` block.
- Change the final phrase in `puzzle5.html`.
- Replace the final success message with another QR, email clue, or external link.
