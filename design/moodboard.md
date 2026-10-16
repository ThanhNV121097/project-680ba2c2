# Moodboard — Mây Coffee Roasters

## Sites studied

| Site | Technique taken | Adapted for Mây |
|---|---|---|
| Land-book (gallery) | Grid of real sites as a reference for "what reads as current" — restrained type, lots of whitespace, cards that lead with a picture and a one-line label. | Used as the baseline for restraint: no gradient blobs, no stock-icon cards. |
| Awwwards (gallery) | Inter Tight everywhere, high-contrast dark UI chrome around bright content cards, tight tracking on headings. | Took the tight tracking and the confidence of a display weight that is never bold; kept our own warm palette instead of their dark UI chrome. |
| La Cabra (lacabra.dk) — Danish specialty roaster | Full-bleed photography of the roastery floor and the beans themselves as the hero, not a lifestyle shot; short product names set large and left; a "shop then subscriptions then stores" page order. | Took the roastery-as-hero idea directly — Mây's hero is the roasting room, not a cup of coffee on a table — and the left-aligned, photograph-led product grid. |
| Counter Culture Coffee | Editorial "find your coffee" tool, warm cream/burnt-orange palette against near-black text, big single-origin names set as the headline of their own card (not hidden under a small label), origin notes read like a tasting note, not a spec sheet. | Took the cream + roast-red palette direction and the idea that each single origin's card headline is its own name (Cầu Đất, K'Ho…), with the tasting note doing the selling, not a feature-icon list. |
| Blue Bottle Coffee | Calm, generous section spacing; one photograph per idea instead of a wall of icons; simple serif-free wordmark treatment. | Took the generous spacing and the restraint on iconography — Mây uses icons only where House Style asks (contact lines, promises), never as decoration. |

Faces: Inter (free, Google Fonts, variable) — close to Awwwards' Inter Tight and la Cabra's own geometric sans, and the scaffold's default. No serif, no italic display.

## Direction for Mây Coffee Roasters

**Type.** Inter throughout, display weight 500, tight tracking (-0.02em) on headings, roman weight 400 for body. One scale: h1 at most 76px, h2 at most 52px at 1440px, both clamped down.

**Palette.** Warm roastery, not a coffee-shop cliché: `--ground #F3EEE4` (raw linen), `--surface #FFFFFF`, `--ink #241B14` (near-black roast brown, not pure black), `--ink-soft #70645530` muted taupe, `--accent #A8432A` (a roasted terracotta-red, the colour of a fresh medium roast, not a bright "CTA orange"). Dark mode inverts to a true roast-dark ground `#17120D` with the same terracotta accent brightened slightly for contrast. Three colours plus neutrals, as required.

**Grid.** Asymmetric, editorial: hero text sits left on a 12-col grid with the photograph running wide and slightly overlapping the text column's baseline grid (not a centred hero + two buttons). Coffee list reads as a left-aligned ledger — origin name large and left, roast/process notes beneath, price right-aligned per House Style. Section labels ("01 roastery", "02 coffee") are not used because the page is not a sequence — instead each section carries a plain left-margin eyebrow label naming the section.

**Pictures.** The roasting room, the beans, the sacks, the cupping table, Đà Lạt's highlands — all real stock photography (Pixabay, credited), standing in for the owner's own shots until they provide theirs (named under Placeholders). Used large, full-bleed hero, large section photographs — never a small inset.

**Motion.** One short load moment on the hero (headline rises ~16px/0.6s, photo fades in slightly scaled from 1.02→1), light scroll reveals on each section (fade + 16px rise), a gentle hover-lift on product and gallery cards (2–3px, shadow). Native scroll only; no pin, no scrub, no marquee.

## COMMITMENTS

- The hero photograph (the roasting room) runs full width behind the headline, bleeding to the viewport edge on both sides — not boxed beside the text in a two-column template.
- The coffee list (`/coffee`) is a left-aligned ledger: each coffee's name set large on the left, its process/tasting note beneath it, and its price right-aligned in its own column so every price's digits line up down the page.
- Section eyebrow labels sit in the left margin against a left accent rule, each naming its section (e.g. "the workshop", "the coffee", "visit us") — never a centered "Why Choose Us" heading.
- No icon-in-a-circle feature grid anywhere on the site — icons appear only inline beside a contact line or an attribute, never as a decorative grid of their own.
- The About page's photographs (highlands sourcing, the tasting bar) run at two different large sizes in an alternating left/right layout, never a uniform three-card row.
- The hero fits one 13" screen at 1440×790 — the eyebrow, headline, sub line and both CTAs ("See our coffee" and "Wholesale enquiries") are all visible without scrolling.
- The wholesale enquiry is its own distinct block on the Contact page, under its own "Ordering for a café?" heading, with its own form — not folded into the general contact form.
- ContactDock (call + Zalo) stays fixed bottom-right on phone widths across every page, and the Contact page's form, map and hours never sit underneath it.
