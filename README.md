# Shamalama Marketing Website

Female-led development studio showcase site. Static HTML/CSS/JS built from a Bold Pop design system.

- **Live:** https://shamalama.co.uk (custom domain; `shamalama-apps.github.io/marketing_webpage` 301-redirects there)
- **Repo:** https://github.com/Shamalama-Apps/marketing_webpage
- **Branch:** `main` → root deploy. Pages CDN cache is 10 min — hard-refresh after pushes.

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
git add path/to/file1 path/to/file2     # never use git add -A or .
git commit -m "describe the change"
git push
```

GitHub Pages redeploys within a minute. `.gitignore` keeps `Invoices/`, drafts (`**/_drafts/`), and `logo-explorations/` out of the public repo.

## Booking flow (contact page)

The "pick a time" widget on `contact.html` posts to a **Make.com** webhook which creates a **Zoho Calendar** event and sends a notification email.

- Webhook URL: hard-coded in `contact.html` as `BOOKING_WEBHOOK` (Make EU region, `hook.eu1.make.com`)
- Available slots: generated dynamically — next 5 upcoming weekdays × 6 spaced times within 08:30–18:00. Edit the `TIMES` and `DAY_COUNT` constants in `contact.html` to adjust.
- Payload is sent as `application/x-www-form-urlencoded` (URLSearchParams body). This is critical: `application/json` triggers a CORS preflight Make doesn't answer, and `text/plain` arrives at Make as a string blob the Zoho connector can't read. Form-encoding is the sweet spot — no preflight, Make parses into proper bundle fields.
- Make Zoho Calendar mappings must be inserted as **pills** from the bundle picker (not typed as text and not wrapped in `parseDate()` — both have failed in past). Start = `1. slot_zoho_start`, End = `1. slot_zoho_end`.

## Known TODOs

- **Real images.** Most placeholder divs have been replaced with real `<img>` tags (founder portraits, Crossways and Can Eat Will Eat screenshots). Sysqo placements use live iframes of `sysqo.com`. Any remaining `.img-ph` divs are still placeholders.
- **Email.** Contact form composes to `info@shamalama.co.uk`.

## Design provenance

Generated from a Claude Design handoff bundle (Bold Pop direction, chosen over Neon Terminal and Studio Editorial). Vanessa's review feedback was already applied in the prototype — no em dashes, "deployed" not "in production", subtle female-led framing, no eyebrow pills, bouncing shapes in hero.
