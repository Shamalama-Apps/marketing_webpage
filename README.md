# Shamalama Marketing Website

Female-led development studio showcase site. Static HTML/CSS/JS built from a Bold Pop design system.

- **Live:** https://shamalama.co.uk (custom domain; `shamalama-apps.github.io/marketing_webpage` 301-redirects there)
- **Repo:** https://github.com/Shamalama-Apps/marketing_webpage
- **Branch:** `main` → root deploy. Pages CDN cache is 10 min — hard-refresh after pushes.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero with bouncing physics shapes, HIIT / Sysqo / Crossways / Deor feature rows, Can Eat Will Eat origin, approach, founder, CTA |
| `about.html` | About Vanessa, founder bio |
| `ideas.html` | "Got an idea?" intake walkthrough with crochet-pattern example |
| `contact.html` | Interactive enquiry composer routing to LinkedIn / email / call |
| `work-hiit-fitness.html` | HIIT Fitness multi-platform app case study |
| `work-crossways.html` | Crossways residents' app case study |
| `work-sysqo.html` | Sysqo website case study |
| `work-deor.html` | Deor bilingual children's app case study |
| `work-can-eat-will-eat.html` | Can Eat, Will Eat app case study |
| `legal/can-eat-will-eat/privacy/` | Unlisted privacy policy (directory + `index.html`, see note below) |

## Shared assets

- `styles.css` — Bold Pop design tokens (coral / blue / yellow / mint / grape / ink on paper), fonts (Bricolage Grotesque / DM Sans / DM Mono), component styles
- `site.js` — scroll reveal, mobile nav toggle, hero shape physics (drift + elastic collisions + pulse)
- `images/` — drop real assets here, then swap a `<div class="screen img-ph">…</div>` placeholder for `<img class="screen" src="images/your-file.png" alt="…">`

## Local preview

```bash
cd ~/marketing_webpage
python3 -m http.server 8000
# open http://localhost:8000/
```

Or just double-click `index.html`. Check case-study pages at a phone width too — the
screenshot galleries have their own breakpoints.

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

## Store links

Every app on the site links to a **verified live** listing. Before adding or changing one,
confirm it resolves — a Play URL for an unpublished or suspended app returns 404, and a
bad link is worse than no link:

```bash
curl -sL -o /dev/null -w "%{http_code}\n" "https://play.google.com/store/apps/details?id=PACKAGE"
```

| App | Store | ID / package |
| --- | --- | --- |
| Can Eat, Will Eat | App Store | `id6762655966` |
| Can Eat, Will Eat | Google Play | `com.shamalama.caneatwilleat` |
| Deor | Google Play | `com.shamalama.deor` |
| Deor | App Store | not yet — Apple account is converting individual → organisation |
| HIIT Fitness | App Store | `id6764587505` |
| HIIT Fitness | Google Play | `com.hiitfitness.app` |
| HIIT Fitness | Garmin Connect IQ | `9e49b49f-…` |

The homepage `sameAs` JSON-LD lists **only** apps published under the Shamalama developer
account (Can Eat Will Eat, Deor). HIIT's Play developer is "HIIT Fitness", a separate
account, so it is deliberately excluded — `sameAs` asserts identity, not portfolio.

Deor's case study states that **official Cymraeg translation is in progress**; the shipped
Welsh is machine-translated placeholder. Keep that line until the real translation lands.

## SEO conventions

Applied across all pages — match them when adding one:

- `<title>` ≤ 60 chars, `<meta name="description">` ≤ 160 (Google truncates past that)
- title/description mirrored into `og:` **and** `twitter:` tags — change all three together
- `canonical` and `og:url` must match
- one `<h1>` per page
- every raster `<img>` needs `alt` plus explicit `width`/`height` (intrinsic pixel size) to
  avoid layout shift. `work-hiit-fitness.html`, `work-crossways.html` and `about.html` are
  still missing these — 14 images outstanding
- Welsh words wrapped in `<span lang="cy">`
- new pages must be added to `sitemap.xml` **and** the footer "Work" column on every page

## Known TODOs

- **Image dimensions.** 14 raster images across `work-hiit-fitness.html` (8),
  `work-crossways.html` (5) and `about.html` (1) still lack `width`/`height`.
- **Real images.** Most placeholder divs have been replaced with real `<img>` tags.
  Sysqo placements use live iframes of `sysqo.com`. Any remaining `.img-ph` divs are still
  placeholders.
- **Email.** Contact form composes to `info@shamalama.co.uk`.

## Design provenance

Generated from a Claude Design handoff bundle (Bold Pop direction, chosen over Neon Terminal and Studio Editorial). Vanessa's review feedback was already applied in the prototype — no em dashes, "deployed" not "in production", subtle female-led framing, no eyebrow pills, bouncing shapes in hero.
