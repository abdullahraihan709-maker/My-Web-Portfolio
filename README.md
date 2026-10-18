# Abdullah Raihan, portfolio

A static, dependency-free portfolio: plain HTML, CSS and a little JavaScript. No build step is needed to deploy.

## Run it locally

```bash
npx serve public
# or
python3 -m http.server 8000 --directory public
```

Then open the printed address.

## Deploy

The site is the `public/` folder.

- **Vercel:** import the repo. `vercel.json` already points the output directory at `public`. Leave the framework preset as "Other" and the build command empty.
- **Netlify:** import the repo. `netlify.toml` sets the publish directory to `public`.
- **GitHub Pages / anything else:** upload the contents of `public/`.


## Editing content

| What | Where |
| --- | --- |
| Hero, About, Tech Stack, project cards, Contact | `public/index.html` |
| Project detail pages (features, stack, challenges, next steps) | `scripts/generate.mjs`, then run `node scripts/generate.mjs` |
| Colours, fonts, spacing | `public/assets/styles.css` (tokens at the top) |
| Behaviour (theme, menu, copy buttons, form) | `public/assets/main.js` |

## Images

`public/My-Profile-photo.jpg`, `public/Project-1-image.png`, `Project-2-image.png`, `Project-3-image.png` are your supplied files. The `.webp` copies are smaller versions the pages load first; if you replace a PNG, regenerate its WebP too.

## Notes

- The contact form opens the visitor's email app with the message prefilled. It does not send anything by itself, so there is no backend to maintain.
- Fonts (Bricolage Grotesque, Source Serif 4) load from Google Fonts and fall back to system fonts if blocked.
