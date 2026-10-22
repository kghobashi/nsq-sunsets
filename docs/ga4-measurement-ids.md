# GA4 Measurement IDs (canonical)

Source: Khalid Ghobashi, 2026-10-22. Stored also in Supabase `nsq-brain.public.ga4_properties`.

Measurement IDs (`G-*`) are public client-side tags. Do not invent IDs; update this file and Supabase together.

| Site | Domain | Measurement ID | Google tag (GT) | Notes |
|------|--------|----------------|-----------------|-------|
| Studio NSQ | studionsq.com | G-G7TSBYBKC0 | — | PR prepared / merged chore/ga4-measurement-2026-10-19 |
| NSQ.global | nsq.global | G-B9SV46186R | — | PR prepared / merged chore/ga4-measurement-2026-10-19 |
| Anura Home | home.anura.cc | G-L0GPC8WNHG | — | Existing setup unverified (Shopify custom pixel named GA4; ID not in HTML) |
| Anura Residences | residences.anura.cc | G-EHFGPM6B57 | — | PR prepared / merged chore/ga4-measurement-2026-10-19 |
| Anura Hospitality | hospitality.anura.cc | G-KL4F4F9142 | — | PR prepared / merged chore/ga4-measurement-2026-10-19 |
| FANN Fashion | fann.fashion | G-0427FD44XK | GT-55XBCHSG | Live on password HTML via Shopify Google & YouTube channel |
| Siraj Candles | sirajcandles.com | G-MY7DY181EX | — | PR prepared / merged chore/ga4-measurement-2026-10-19 (marketing site); Shopify storefront pixel pending |
| Sunsets | sunsetsocial.cc | G-GE5L8X270C | — | PR prepared / merged chore/ga4-measurement-2026-10-19 |

## Live verification notes (2026-10-22 Asia/Shanghai)

- nsq.global / studionsq.com: matching gtag in HTML.
- fann.fashion (password gate): web pixel exposes G-0427FD44XK + GT-55XBCHSG.
- home.anura.cc / sirajcandles.com (password gate): no G-* in HTML; Anura has custom pixel named "Google Analytics 4" without exposed measurement ID.
- hospitality.anura.cc / residences.anura.cc: Cloudflare Access — HTML not publicly verifiable.
- sunsetsocial.cc / sunsets.studionsq.com: HTTP 401 (Cloudflare password) — HTML not publicly verifiable.


## This repository

Middleware injects `G-GE5L8X270C` via `functions/_middleware.js` (matches). Live site is HTTP 401 protected — not publicly verifiable.
