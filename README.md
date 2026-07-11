# My Money Map — The Night Crossing

A showcase rebuild of the My Money Map website, designed and built by
Claude Fable 5 for Marcia Pregal's personal finance coaching practice.

The concept: the brand colour spec is called *Nocturne*, and the product
is a *map*. Before GPS, the night sky was the first map. The page is one
continuous crossing from deep night to civil dawn, driven by scroll.

## Features

- Persistent WebGL sky (three.js): twinkling starfield, meteors, a
  rotating armillary sphere, and a morning star that brightens as the
  night stars fade into dawn
- Scroll-driven day/night crossing (GSAP ScrollTrigger + Lenis)
- Four services drawn as bespoke constellations, stroke-animated
- Interactive ten-year compound growth "star chart"
- A dotted course line plotted across the daylight sections, ending at
  "you are here" beside the booking CTA
- Full EN/PT (Brazilian) internationalisation
- Nocturne colour spec compliance: colourblind-safe semantics (blue for
  negative, never red/green pairs), 4.5:1+ text contrast, redundant
  coding on every meaning-bearing colour
- Dyslexia-aware typography: Atkinson Hyperlegible Next body, 1.6 line
  height, left-aligned, cream (never white) background
- Reduced-motion, no-JS, and keyboard-navigation fallbacks

## Stack

Vanilla HTML/CSS/JS. three.js r128, GSAP 3.12, Lenis 1.1. No build step.

## Files

| File | Purpose |
| :--- | :--- |
| `index.html` | Single-page structure |
| `styles.css` | Nocturne tokens and all styling |
| `app.js` | Sky engine, choreography, i18n, star chart |
| `DESIGN.md` | Art direction document |
| `nocturne-brand-colour-spec.md` | Client colour specification |

## Deployment

GitHub Pages from the `main` branch. Push to deploy.
