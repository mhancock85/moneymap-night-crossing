# Nocturne — Brand Colour Specification

**Product:** My Money Map | Your Personal Finance Guide **Scope:** Colour only. Typography is supplied separately — do not substitute your own type choices. **Version:** 1.0 **Brand feel:** Premium but warm. Confident, calm, never clinical.

---

## 1\. Core palette

| Token | Hex | Role |
| :---- | :---- | :---- |
| **Midnight** | `#0F1729` | Primary dark surface — nav, footer, hero, dark cards |
| **Graphite** | `#22262B` | Body text on light surfaces. Text on Amber fills. |
| **Slate** | `#3A4A5F` | Secondary text, borders, muted UI, placeholder text |
| **Cream** | `#FAF6EF` | Page background, cards, light surfaces |
| **Amber** | `#E8A33D` | Accent — **fill only**. CTAs, highlights, active states |
| **Amber Deep** | `#B87515` | Amber as *text* or *icon* on light surfaces |
| **Dusk** | `#6B5B8A` | Secondary accent — chart series, tags, categories |

### Cream is not white

Page background is `#FAF6EF`, **never** `#FFFFFF`. This is deliberate: the off-white reduces glare and the "rivers" effect that makes text harder to track for dyslexic readers. Do not "clean this up" to pure white.

---

## 2\. Semantic palette

| Token | Hex | Meaning | Contrast on Cream |
| :---- | :---- | :---- | :---- |
| **Fern** | `#3D6B4A` | Positive — gains, savings, on track | 6.2:1 ✓ |
| **Tide** | `#2D6EA8` | Negative — overspend, losses, off track | 5.4:1 ✓ |
| **Ember** | `#B84A3A` | Warning / destructive action **only** | 5.1:1 ✓ |

### Why blue, not red, for negative

Fern/Tide (green/blue) remains distinguishable under deuteranopia, protanopia and tritanopia. The conventional green/red pairing does **not** — roughly 1 in 12 men cannot reliably separate them, and in a finance product that means they cannot tell a gain from a loss at a glance.

**Ember is not the "loss" colour.** Ember is reserved for genuine alerts and destructive actions (delete account, disconnect bank). Overspending is not an error state.

---

## 3\. Contrast reference

Verified ratios. Anything not listed here must be checked before use.

| Foreground | Background | Ratio | Use |
| :---- | :---- | :---- | :---- |
| Graphite | Cream | 13:1 | Body text ✓ |
| Slate | Cream | 6.8:1 | Secondary text ✓ |
| Graphite | Amber | 6.5:1 | Button label ✓ |
| Amber Deep | Cream | 4.6:1 | Text / icon ✓ |
| Dusk | Cream | 5.6:1 | Text ✓ |
| Cream | Midnight | 15:1 | Body text ✓ |
| Amber | Midnight | 7.5:1 | Text ✓ |
| **Amber** | **Cream** | **2.0:1** | **FAILS — never use** |

### Minimums

- Body text: **4.5:1**  
- Large text (18px+ / 14px+ bold): **3:1**  
- Non-text UI (borders, icon strokes, chart lines, input outlines): **3:1**

---

## 4\. Hard rules

These are not preferences. Breaking them breaks accessibility compliance.

1. **Amber is never text on Cream.** 2.0:1 fails badly. Amber is a *fill*. For amber-coloured text or icons on a light surface, use Amber Deep.  
2. **A CTA button is an Amber fill with Graphite text.** Not amber text. Not amber on white.  
3. **Never encode meaning in colour alone.** Every colour-carried meaning must be redundantly coded:  
   - Gains/losses carry a sign and a directional glyph: `▲ +£240` / `▼ −£85`  
   - Status carries an icon **and** a word — not a coloured dot alone  
   - Charts carry direct labels or distinct shapes/patterns. **No colour-only legends.**  
4. **Focus ring:** 2px Amber Deep, 2px offset. Must be visible on both Cream and Midnight. Never remove the focus outline.  
5. **Do not introduce colours outside this spec.** No gradients, no tints, no "just slightly lighter" variants unless listed below.

---

## 5\. Dark mode

| Token | Light value | Dark value |
| :---- | :---- | :---- |
| Background | Cream `#FAF6EF` | Midnight `#0F1729` |
| Body text | Graphite `#22262B` | Cream `#FAF6EF` |
| Secondary text | Slate `#3A4A5F` | `#94A3B8` |
| Accent (fill) | Amber `#E8A33D` | Amber `#E8A33D` |
| Accent (text) | Amber Deep `#B87515` | Amber `#E8A33D` (7.5:1 — safe as text here) |
| Positive | Fern `#3D6B4A` | `#6FA97F` |
| Negative | Tide `#2D6EA8` | `#68A8DC` |
| Warning | Ember `#B84A3A` | `#D97565` |

Note the inversion on Amber: on Midnight it passes as text (7.5:1), so the Amber Deep substitution is **not** needed in dark mode.

---

## 6\. CSS custom properties

Implement exactly as below.

:root {

  /\* Core \*/

  \--nocturne-midnight:    \#0F1729;

  \--nocturne-graphite:    \#22262B;

  \--nocturne-slate:       \#3A4A5F;

  \--nocturne-cream:       \#FAF6EF;

  \--nocturne-amber:       \#E8A33D;

  \--nocturne-amber-deep:  \#B87515;

  \--nocturne-dusk:        \#6B5B8A;

  /\* Semantic \*/

  \--nocturne-fern:        \#3D6B4A;  /\* positive \*/

  \--nocturne-tide:        \#2D6EA8;  /\* negative \*/

  \--nocturne-ember:       \#B84A3A;  /\* warning / destructive \*/

  /\* Applied — light (default) \*/

  \--bg-page:              var(--nocturne-cream);

  \--bg-surface:           var(--nocturne-cream);

  \--bg-inverse:           var(--nocturne-midnight);

  \--text-primary:         var(--nocturne-graphite);

  \--text-secondary:       var(--nocturne-slate);

  \--text-accent:          var(--nocturne-amber-deep);

  \--text-on-accent:       var(--nocturne-graphite);

  \--text-on-inverse:      var(--nocturne-cream);

  \--fill-accent:          var(--nocturne-amber);

  \--border-default:       var(--nocturne-slate);

  \--focus-ring:           var(--nocturne-amber-deep);

  \--status-positive:      var(--nocturne-fern);

  \--status-negative:      var(--nocturne-tide);

  \--status-warning:       var(--nocturne-ember);

}

\[data-theme="dark"\] {

  \--bg-page:              var(--nocturne-midnight);

  \--bg-surface:           \#1A2436;

  \--bg-inverse:           var(--nocturne-cream);

  \--text-primary:         var(--nocturne-cream);

  \--text-secondary:       \#94A3B8;

  \--text-accent:          var(--nocturne-amber);

  \--text-on-accent:       var(--nocturne-graphite);

  \--text-on-inverse:      var(--nocturne-graphite);

  \--fill-accent:          var(--nocturne-amber);

  \--border-default:       \#3A4A5F;

  \--focus-ring:           var(--nocturne-amber);

  \--status-positive:      \#6FA97F;

  \--status-negative:      \#68A8DC;

  \--status-warning:       \#D97565;

}

/\* Focus — do not remove \*/

:focus-visible {

  outline: 2px solid var(--focus-ring);

  outline-offset: 2px;

}

---

## 7\. Chart palette

Ordered series colours. Use in this sequence.

1. Dusk `#6B5B8A`  
2. Amber Deep `#B87515`  
3. Fern `#3D6B4A`  
4. Tide `#2D6EA8`  
5. Slate `#3A4A5F`

**Every chart requires direct labelling or distinct shapes/patterns.** A reader must be able to interpret the chart in greyscale. If they cannot, the chart is not finished.

---

## 8\. Build checklist

- [ ] Page background is `#FAF6EF`, not `#FFFFFF`  
- [ ] No Amber text on any light surface anywhere  
- [ ] Every CTA is Amber fill \+ Graphite text  
- [ ] Every gain/loss has a sign and a glyph, not just a colour  
- [ ] Every chart is legible in greyscale  
- [ ] Focus ring visible on every interactive element, in both themes  
- [ ] All text meets 4.5:1; all UI borders and icons meet 3:1  
- [ ] Dark mode uses Amber (not Amber Deep) for accent text

---

## 9\. Open items

- **Typography:** supplied separately. Do not substitute.  
- **Components, spacing, layout:** not covered by this document.  
- **Dyslexia support beyond colour:** the Cream background is one part of this. The rest lives in typography and layout — line height 1.5+, left-aligned (never justified), no long italic runs, no ALL CAPS body copy. Flag to the brand owner if the typography spec does not cover these.

