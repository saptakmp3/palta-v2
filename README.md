# Satrangee Swar Sadhana (PWA)

Static web app. No build step, no server code.

## Files
- `index.html` the whole app
- `manifest.webmanifest`, `sw.js`, `icons/`, `apple-touch-icon.png`, `favicon-32.png` make it installable and offline-capable
- `samples/` recorded instruments (about 1.6 MB), downloaded by the user only if they choose "Recorded samples"

## Put it online (any one of these, all free)
1. **Netlify Drop**: drag this whole folder onto app.netlify.com/drop.
2. **Cloudflare Pages / Vercel**: create a project and upload the folder.
3. **GitHub Pages**: upload the folder contents to a repo, then Settings > Pages > deploy from main.

It must be served over **https** (all three are). Opening `index.html` straight from a file still works for the
built-in sounds, but install, offline mode and recorded samples need a web address.

## Install on a phone
- iPhone: open in Safari > Share > Add to Home Screen.
- Android: open in Chrome > menu > Install app.

## Updating
Change any file, then edit `VERSION` in `sw.js` (for example `sss-v2`) and upload again.
Phones pick the update up the next time the app is opened online. Saved patterns are kept.

## Samples
Users choose Sound > Sound source > Recorded samples > Download. The files are fetched from your own site once, stored
on the device, and then work offline. Licences and credits are in `samples/CREDITS.txt`.
