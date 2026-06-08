# Shamalama Marketing Website

Female-led development studio showcase site. Static HTML/CSS/JS built from a Bold Pop design system.

- **Live (GitHub Pages):** https://shamalama-apps.github.io/marketing_webpage/
- **Repo:** https://github.com/Shamalama-Apps/marketing_webpage
- **Branch:** `main` → root deploy

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero with bouncing physics shapes, Crossways + Sysqo features, Can Eat Will Eat origin, approach, founder, CTA |
| `about.html` | About Vanessa, founder bio |
| `ideas.html` | "Got an idea?" intake walkthrough with crochet-pattern example |
| `contact.html` | Interactive enquiry composer routing to LinkedIn / email / call |
| `work-crossways.html` | Crossways residents' app case study |
| `work-sysqo.html` | Sysqo website case study |
| `work-can-eat-will-eat.html` | Can Eat, Will Eat app case study |

## Shared assets

- `styles.css` — Bold Pop design tokens (coral / blue / yellow / mint / grape / ink on paper), fonts (Bricolage Grotesque / DM Sans / DM Mono), component styles
- `site.js` — scroll reveal, mobile nav toggle, hero shape physics (drift + elastic collisions + pulse)
- `images/` — drop real assets here, then swap a `<div class="screen img-ph">…</div>` placeholder for `<img class="screen" src="images/your-file.png" alt="…">`

## Local preview

```bash
cd /c/Users/VanessaLatchem-Smith/Projects/shamalama-website
python -m http.server 8000
# open http://localhost:8000/
```

Or just double-click `index.html`.

## Ship a change

```bash
git add -A
git commit -m "describe the change"
git push
```

GitHub Pages redeploys within a minute.

## Known TODOs

- **Real images.** All image slots are placeholder divs styled to match the prototype. Swap them for `<img>` tags as assets land in `images/`.
- **Booking link.** `contact.html` line 209 has `CALL_URL = 'https://cal.com/shamalama/intro'` — replace with the real booking URL.
- **Custom domain.** A CNAME was added then removed on the repo earlier. To wire `shamalama.co.uk` (or a subdomain), set it in repo Settings → Pages → Custom domain, and add the matching DNS records at your registrar.
- **Email.** Contact form composes to `info@shamalama.co.uk`.

## Design provenance

Generated from a Claude Design handoff bundle (Bold Pop direction, chosen over Neon Terminal and Studio Editorial). Vanessa's review feedback was already applied in the prototype — no em dashes, "deployed" not "in production", subtle female-led framing, no eyebrow pills, bouncing shapes in hero.
