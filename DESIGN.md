# My Money Map — "The Night Crossing"

Design document for the Fable showcase rebuild. Client: Marcia Pregal.
Deployed as a standalone demonstration site; the production site lives in
`Money Map Web Site Redesign/`.

## 1. Concept

The brand colour spec is called **Nocturne**. The product is a **map**.
Before GPS, the night sky was the first map: sailors crossed oceans by
fixed stars. Marcia's coaching gives people fixed points in something
that feels like open water in the dark.

The page is one continuous night voyage that ends at dawn. A single
persistent WebGL sky sits behind the whole document and changes state
with scroll: deep night at the hero, a rising Dusk/Amber horizon through
the middle, civil dawn at the contact section.

## 2. Tokens

### Colour

Exactly the Nocturne spec (`nocturne-brand-colour-spec.md`, saved in this
folder). UI colour is spec-literal. Atmospheric 3D layers may blend
Midnight/Dusk/Amber, per client approval on 11 July 2026; nothing
meaning-bearing relies on those blends.

### Typography

| Role | Face | Why |
| :--- | :--- | :--- |
| Display | Bricolage Grotesque (variable, opsz) | Warm, characterful, avoids the default serif-on-cream look |
| Body | Atkinson Hyperlegible Next | Designed by the Braille Institute; inclusivity is part of the brief |
| Utility | Spline Sans Mono | Coordinates, data, captions |

Dyslexia rules: line height 1.5+ for body, left-aligned, no justified
text, no ALL-CAPS body copy, no long italic runs.

### Layout and structure

Full-bleed sky canvas, content in a 1200px column. Sections are labelled
with real navigation stars and their coordinates in the mono face:

| Section | Star label | Content |
| :--- | :--- | :--- |
| Hero | Polaris, the fixed point | Headline, armillary sphere |
| Services | The constellations | Four services as drawn constellations |
| Instrument | Vega | Ten-year star chart (compound interest) |
| About | Sirius, the navigator | Marcia, photos, credentials |
| Contact | Civil dawn | Form to existing Apps Script endpoint |

### Signature

The persistent scroll-driven sky with the 3D armillary sphere, and the
compound-interest slider that re-plots a ten-year constellation.

## 3. Content rules

- British English. No em dashes anywhere in copy.
- EN and PT (Brazilian) fully mirrored via the `data-i18n` pattern.
- Facts unchanged from the production site: C.P.F.E.® certification,
  Personal Finance Society (UK), ABEFIN (Brazil), cross-border
  mentoring, free discovery call, 24-hour reply, 8% compound
  illustration with full disclaimer, myfinancemap.uk, LinkedIn and
  Instagram links.
- Marcia's photographs from the original site, unedited.

## 4. Accessibility commitments

- Every item on the Nocturne build checklist (section 8 of the spec).
- Constellation charts legible in greyscale, directly labelled.
- Gains carry `▲ +` glyphs; nothing encodes meaning in colour alone.
- `prefers-reduced-motion`: static sky, no smooth scroll, content
  visible without animation.
- Keyboard focus visible everywhere: 2px Amber Deep ring on light,
  Amber on dark.

## 5. Tech

Vanilla HTML/CSS/JS. three.js for the sky and armillary sphere, GSAP +
ScrollTrigger for choreography, Lenis for smooth scroll. No build step;
deployable to GitHub Pages as-is. Pixel ratio capped at 2, rendering
paused when the sky is off screen.
