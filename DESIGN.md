# DESIGN
> Bauhaus poster pinned to a cloud architect's corkboard — cream paper, primary-color shapes, oversized geometric type.

**Theme:** light

Earlydog operates as a Bauhaus design lab transplanted into DevOps — warm cream paper backgrounds, near-black typography, and a three-color functional accent trio (Cobalt Blue, Poppy Red, Marigold Yellow), with geometric illustrations built from primary-color primitives (circles, squares, checkerboards, starbursts, triangles). The display face (degular-display) sets oversized 52–116px headlines with positive letter-spacing, an unusual choice that gives the type geometric breathing room rather than the tight editorial tension most display fonts chase. Body copy stays at 18px in a humanist sans (usual), keeping reading temperature warm against the eggshell canvas. Components are intentionally sparse: pill-shaped outlined buttons, ghost links with play-triangle markers, accent tags, and generous 96px section gaps that let the geometric artwork breathe. The functional palette is now five colors — cream, ink, and the three-color accent trio — while Blush Pink remains the system's one illustration-exclusive color, the sole holdover from the old single-accent restraint.

**Color system note:** this remaster opens the original single-accent rule into a three-color functional trio. Cobalt Blue, Poppy Red, and Marigold Yellow each carry distinct UI meaning (primary, secondary, tertiary) instead of all chromatic weight resting on one blue. Blush Pink stays illustration-only — the system still draws a hard line between "colors that do UI work" and "colors that only decorate," it's just that the working set tripled.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Cream Paper | `#fbf3e4` | `--color-cream-paper` | Page canvas, card surfaces, button fills, tag backgrounds — warm off-white grounds the three-color accent system and keeps the interface paper-like and print-graphic |
| Midnight Ink | `#0b0f16` | `--color-midnight-ink` | Primary text, heading strokes, hairline borders, outlined button frames, logo mark, default tag text — near-black with a barely-perceptible blue tint keeps it from feeling dead |
| Cobalt Blue | `#1457d8` | `--color-cobalt-blue` | Primary functional accent — hero headline second line, primary nav emphasis, "live/featured" tags, dominant illustration panels. Senior member of the functional trio |
| Poppy Red | `#e84522` | `--color-poppy-red` | Secondary functional accent — alert and urgent-state tags ("Incident", "New"), secondary CTA emphasis, illustration accent shapes. Promoted from illustration-only to full UI duty in this remaster |
| Marigold Yellow | `#f5b400` | `--color-marigold-yellow` | Tertiary functional accent — informational and highlight tags ("Beta", "Updated"), illustration fills, semicircles and triangle accents. Uses a filled (not outlined) treatment in UI contexts since gold text reads weakly against Cream Paper |
| Blush Pink | `#f2c3bd` | `--color-blush-pink` | Illustration-exclusive accent — softens geometric compositions in rectangles and overlapping shapes; the one color in the system that never appears in UI chrome |

## Tokens — Typography

### degular-display — Display headlines for all section headings and the hero title. The single weight 700 and positive letter-spacing (0.009–0.019em) create a wide-set, geometric presence — letterspacing INCREASES with size, the opposite of conventional display type. This gives 116px headlines airy breathing room rather than dense visual mass, matching the Bauhaus illustration language of separated geometric forms. · `--font-degular-display`
- **Substitute:** Archivo Black, Space Grotesk, or any wide geometric grotesque
- **Weights:** 700
- **Sizes:** 52px, 80px, 116px
- **Line height:** 1.03–1.23
- **Letter spacing:** 0.009em at 52px, 0.013em at 80px, 0.019em at 116px
- **Role:** Display headlines for all section headings and the hero title. The single weight 700 and positive letter-spacing (0.009–0.019em) create a wide-set, geometric presence — letterspacing INCREASES with size, the opposite of conventional display type. This gives 116px headlines airy breathing room rather than dense visual mass, matching the Bauhaus illustration language of separated geometric forms.

### usual — Body copy, navigation, buttons, links, footer, card descriptions. The 1.78–1.82 line-height is notably generous for sans-serif body text — typical SaaS body sits at 1.5–1.6, but Earlydog's open leading reinforces the spacious layout. Weight 700 is used sparingly for inline emphasis. · `--font-usual`
- **Substitute:** Inter, IBM Plex Sans, or DM Sans
- **Weights:** 400, 700
- **Sizes:** 16px, 18px, 22px
- **Line height:** 1.78–1.82
- **Letter spacing:** normal
- **Role:** Body copy, navigation, buttons, links, footer, card descriptions. The 1.78–1.82 line-height is notably generous for sans-serif body text — typical SaaS body sits at 1.5–1.6, but Earlydog's open leading reinforces the spacious layout. Weight 700 is used sparingly for inline emphasis.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| caption | 16px | 1.78 | — | `--text-caption` |
| body | 18px | 1.82 | — | `--text-body` |
| subheading | 22px | 1.82 | — | `--text-subheading` |
| heading-sm | 52px | 1.23 | 0.47px | `--text-heading-sm` |
| heading | 80px | 1.1 | 1.04px | `--text-heading` |
| display | 116px | 1.03 | 2.2px | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** spacious

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 40 | 40px | `--spacing-40` |
| 44 | 44px | `--spacing-44` |
| 48 | 48px | `--spacing-48` |
| 96 | 96px | `--spacing-96` |
| 104 | 104px | `--spacing-104` |
| 120 | 120px | `--spacing-120` |
| 128 | 128px | `--spacing-128` |

### Border Radius

| Element | Value |
|---------|-------|
| cards | 0px |
| buttons | 9999px |
| illustrations | 0px |

### Layout

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 16-32px

## Components

### Outlined Pill Button
**Role:** Primary interactive element — all CTAs and section links use this variant

Fully rounded pill (border-radius: 9999px), 1px solid Midnight Ink (#0b0f16) border, Cream Paper (#fbf3e4) fill, text in usual 16px weight 700 Midnight Ink. Horizontal padding 30px, vertical padding 14–20px. No fill beyond the cream base, no shadow — the border IS the button. Examples: 'Why you need us', 'What we do', 'Talk to us'.

### Ghost Link with Triangle
**Role:** Minimal navigation and inline text links

Plain Midnight Ink text in usual 16px weight 700, followed by a small right-pointing triangle marker (▸) in Midnight Ink. No underline, no background. Used for header CTA ('Talk to us ▶') and inline section links.

### Accent Tag
**Role:** Small status or category label — the primary functional home for the expanded accent trio outside of illustration work

Pill-shaped tag (border-radius: 9999px), small padding (6px vertical × 16px horizontal), text in usual 16px weight 700. Cobalt Blue and Poppy Red tags use the outline treatment — 1px accent-colored border, accent-colored text, transparent fill, matching the brand's hairline-border convention. Marigold Yellow flips to a filled treatment — solid Marigold Yellow background with Midnight Ink text — since gold text on Cream Paper falls short of comfortable contrast; this is the one place a functional color fills rather than outlines. Usage: Cobalt Blue marks primary or active states ('Live', 'Featured'); Poppy Red marks urgent or alert states ('Incident', 'New'); Marigold Yellow marks informational or highlight states ('Beta', 'Updated').

### Hamburger Menu Icon
**Role:** Top-left navigation trigger

Two horizontal black bars (Midnight Ink) stacked with 2px gap. Sits at 44px from top, paired with the vertical EARLYDOG wordmark below it. Clean, minimal — the menu icon is decorative architecture, not a brand mark.

### Vertical Wordmark
**Role:** Brand identity anchor in the left rail

EARLYDOG rotated 90° counter-clockwise, set in usual 16px weight 700 Midnight Ink, letter-spacing normal. Sits in the left margin as a fixed brand signature, paired with a small geometric 'e' glyph above the rotated text.

### Hero Display Heading
**Role:** First-fold headline anchoring the page

degular-display 80px weight 700, line-height 1.10, letter-spacing +1.04px. Two-tone treatment: 'Your Cloud' in Midnight Ink, 'Ops Team' in Cobalt Blue. The blue second-line remains the hero's single chromatic display moment — Poppy Red and Marigold Yellow surface elsewhere in tags and illustration panels, but headline type stays disciplined to one accent at a time.

### Body Paragraph Block
**Role:** Descriptive copy beneath section headings

usual 18px weight 400 Midnight Ink, line-height 1.82, max-width ~480px. Generous leading and short line length create a calm, editorial reading rhythm against the cream background.

### Section Heading (Sub-display)
**Role:** Section-level display text for content blocks like 'Your own Ops Team' and 'Managed Kubernetes'

degular-display 52px weight 700, line-height 1.23, letter-spacing +0.47px, Midnight Ink. Smaller than the hero display but follows the same wide-set geometric character.

### Geometric Illustration Block
**Role:** Brand-defining visual element — appears in hero and alternating sections

Square or near-square composition (~520px) built from Bauhaus primitives: solid color rectangles, circles, semicircles, triangles, checkerboard grids (8×8 black/cream), and thin-line starburst patterns radiating from a point. Color palette restricted to Poppy Red, Marigold Yellow, Cobalt Blue, Blush Pink, Midnight Ink, and Cream Paper. All shapes have sharp 0px corners — no rounded forms. Often contains a 3×3 or 4×4 grid of sub-shapes. Any of the three functional accents — not just Cobalt Blue — may anchor the dominant panel, giving section illustrations more chromatic variety than the old single-blue system allowed. Functions as the page's visual identity, not decoration.

### Two-Column Feature Section
**Role:** Content block layout — alternates illustration-left/text-right and text-left/illustration-right

Two equal columns separated by 104px horizontal margin within a max-width container. One column holds a geometric illustration block, the other holds a section heading + body paragraph + pill button. Vertical spacing between sections: 96px. No card backgrounds, no dividers — sections flow directly on the cream canvas.

### Starburst Line Pattern
**Role:** Decorative element within illustrations

Thin (1px) Midnight Ink lines radiating from a single point at 15° intervals, filling a circular area. Always overlaid on a cream or accent-colored square within the composition. Functions as a visual texture/energy marker, not a stand-alone element.

### Checkerboard Grid
**Role:** Decorative geometric element within illustrations

8×8 alternating Midnight Ink and Cream Paper squares. Appears as a solid block within larger compositions. No border, sharp 0px edges — the grid IS the shape.

## Do's and Don'ts

### Do
- Use degular-display 700 for all headings — never substitute a different weight or face for display text
- Set display headings at 52, 80, or 116px with the corresponding positive letter-spacing (0.009–0.019em) — letter-spacing scales WITH size, not against it
- Use border-radius: 9999px for all buttons and tags — pill shape is the only radius in the system
- Build illustrations from Bauhaus primitives: circles, squares, triangles, checkerboards, starbursts, semicircles — all with sharp 0px corners
- Restrict the functional UI palette to five colors (#fbf3e4, #0b0f16, #1457d8, #e84522, #f5b400) — let Blush Pink (#f2c3bd) remain the system's one illustration-exclusive color
- Use the filled treatment for Marigold Yellow tags specifically — gold text on Cream Paper doesn't hold contrast, so this accent fills instead of outlines
- Maintain 96px vertical gaps between major sections to preserve the spacious, poster-like rhythm
- Pair body text at 18px/1.82 with a max-width of ~480px for editorial readability

### Don't
- Don't use rounded corners on illustrations, cards, or decorative shapes — everything geometric is sharp 0px
- Don't use filled colored buttons for primary CTAs — all primary interactive elements stay outlined pills with 1px Midnight Ink border
- Don't apply negative letter-spacing to display headings — the positive tracking IS the brand voice
- Don't introduce more than three chromatic functional colors — Cobalt Blue, Poppy Red, and Marigold Yellow form the closed functional trio
- Don't promote Blush Pink into UI chrome — it stays illustration-only, the system's one quiet decorative holdover
- Don't use body text below 16px or with line-height tighter than 1.78 — the open leading is part of the warm, spacious feel
- Don't add drop shadows, gradients, or glows — the system is flat, print-graphic, and depthless
- Don't use photographic imagery or realistic illustrations — the visual language is strictly geometric and abstract

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 1 | Cream Canvas | `#fbf3e4` | Page background across all sections |
| 2 | Cobalt Blue Panel | `#1457d8` | Accent surface for illustration blocks built around the primary accent — appears inside artwork, not as page chrome |
| 3 | Poppy Red Panel | `#e84522` | Accent surface for illustration blocks built around the secondary accent — appears inside artwork, not as page chrome |
| 4 | Marigold Yellow Panel | `#f5b400` | Accent surface for illustration blocks built around the tertiary accent — appears inside artwork, not as page chrome |

## Elevation

Earlydog uses zero elevation. The design is deliberately flat — surfaces are defined by color contrast (cream canvas, midnight ink shapes) and geometric composition, not shadows. Depth is implied through overlapping geometric forms within illustrations, not through z-axis shadow stacks. This flatness reinforces the print-poster, Bauhaus-influenced aesthetic.

## Imagery

Zero photography. The entire visual system is built from flat geometric illustrations: Bauhaus-inspired compositions of circles, squares, triangles, checkerboards, starbursts, and semicircles rendered in a primary-color palette (Poppy Red, Marigold Yellow, Cobalt Blue, Blush Pink, Midnight Ink, Cream Paper). Illustrations are square or near-square blocks (~500–550px), placed as compositional counterparts to text columns. All shapes have sharp corners. The illustrations function as brand identity markers — they are not decorative supporting visuals but the primary visual voice of the site. No icons beyond simple geometric marks; no product screenshots; no photography of any kind.

## Layout

Two-column alternating layout on a full-bleed cream canvas. The page is not contained in a max-width box — instead, the left rail holds a fixed vertical wordmark and hamburger menu, while content flows in a ~1200px centered column. Hero is text-left/illustration-right with a two-tone display heading ('Your Cloud' in ink, 'Ops Team' in Cobalt Blue). Subsequent sections alternate: illustration-left/text-right, then text-left/illustration-right. No card grids, no pricing tables, no blog feeds. Each section is a single text+illustration pairing with 96px vertical breathing room between them. Navigation is minimal: hamburger menu (left rail) and a single ghost link CTA in the top-right. The layout reads as a curated series of editorial spreads, not a typical SaaS page.

## Agent Prompt Guide

**Quick Color Reference**
- background: #fbf3e4 (Cream Paper)
- text: #0b0f16 (Midnight Ink)
- border: #0b0f16 (Midnight Ink, 1px)
- accent (primary): #1457d8 (Cobalt Blue)
- accent (secondary): #e84522 (Poppy Red)
- accent (tertiary): #f5b400 (Marigold Yellow)
- illustration-only: #f2c3bd (Blush Pink)

**Example Component Prompts**

1. **Hero Section**: Cream Paper (#fbf3e4) full-bleed background. Two-column layout: left column holds a display heading in degular-display 80px weight 700, line-height 1.10, letter-spacing +1.04px — first line in Midnight Ink (#0b0f16), second line in Cobalt Blue (#1457d8). Below: body paragraph in usual 18px weight 400, line-height 1.82, Midnight Ink, max-width 480px. Right column: a 520px square geometric illustration built from flat Bauhaus primitives — circles, squares, triangles, a checkerboard grid, and a starburst — using Poppy Red (#e84522), Marigold Yellow (#f5b400), Cobalt Blue (#1457d8), Blush Pink (#f2c3bd), and Midnight Ink on Cream Paper. All shapes have 0px border-radius.

2. **Outlined Pill Button**: 9999px border-radius, 1px solid Midnight Ink (#0b0f16) border, Cream Paper (#fbf3e4) fill, text in usual 16px weight 700 Midnight Ink, padding 14px vertical × 30px horizontal. No shadow, no gradient.

3. **Accent Tag**: 9999px border-radius, padding 6px vertical × 16px horizontal, text in usual 16px weight 700. Cobalt Blue (#1457d8) or Poppy Red (#e84522) variants: 1px accent border, accent-colored text, transparent fill. Marigold Yellow (#f5b400) variant: filled background, Midnight Ink (#0b0f16) text — flip the treatment here only, for contrast.

4. **Section Heading + Body**: degular-display 52px weight 700, line-height 1.23, letter-spacing +0.47px, Midnight Ink. Body below in usual 18px weight 400, line-height 1.82, Midnight Ink, max-width 480px. Vertical spacing from heading to body: 24px. Vertical spacing from section to next section: 96px.

5. **Geometric Illustration Block**: 520×520px composition on Cream Paper background. Build from: a solid Cobalt Blue square (upper-left quadrant) containing a white circle with a small black dot (eye motif); a solid Poppy Red circle (upper-center); an 8×8 Midnight Ink/Cream Paper checkerboard square (upper-right); a starburst of thin 1px Midnight Ink lines radiating from a point in the lower-left; and assorted triangles and semicircles in Marigold Yellow, Blush Pink, and Cobalt Blue filling the lower half. All shapes are flat, no shadows, 0px border-radius.

6. **Ghost Link with Triangle Marker**: Text in usual 16px weight 700 Midnight Ink, followed by a small ▸ triangle in Midnight Ink. No underline, no background, no padding. Used for top-bar CTAs and inline section links.

## Similar Brands

- **Pentagram** — Same Bauhaus-influenced geometric illustration language, primary-color compositions, and oversized display type paired with generous white space
- **Figma Config** — Same flat geometric illustration approach with primary colors, bold display headings, and editorial-style section layouts on warm canvas
- **Linear** — Same confident display type at large sizes, generous section spacing, and minimal UI chrome that lets a small set of accent colors carry brand identity
- **Stripe Sessions** — Same editorial-spread layout pattern with alternating text/visual columns, warm off-white canvas, and oversized geometric display headings

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-cream-paper: #fbf3e4;
  --color-midnight-ink: #0b0f16;
  --color-cobalt-blue: #1457d8;
  --color-poppy-red: #e84522;
  --color-marigold-yellow: #f5b400;
  --color-blush-pink: #f2c3bd;

  /* Typography — Font Families */
  --font-degular-display: 'degular-display', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-usual: 'usual', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-caption: 16px;
  --leading-caption: 1.78;
  --text-body: 18px;
  --leading-body: 1.82;
  --text-subheading: 22px;
  --leading-subheading: 1.82;
  --text-heading-sm: 52px;
  --leading-heading-sm: 1.23;
  --tracking-heading-sm: 0.47px;
  --text-heading: 80px;
  --leading-heading: 1.1;
  --tracking-heading: 1.04px;
  --text-display: 116px;
  --leading-display: 1.03;
  --tracking-display: 2.2px;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-44: 44px;
  --spacing-48: 48px;
  --spacing-96: 96px;
  --spacing-104: 104px;
  --spacing-120: 120px;
  --spacing-128: 128px;

  /* Layout */
  --page-max-width: 1200px;
  --section-gap: 96px;
  --card-padding: 32px;
  --element-gap: 16-32px;

  /* Border Radius */
  --radius-full: 9999px;

  /* Named Radii */
  --radius-cards: 0px;
  --radius-buttons: 9999px;
  --radius-illustrations: 0px;

  /* Surfaces */
  --surface-cream-canvas: #fbf3e4;
  --surface-cobalt-blue-panel: #1457d8;
  --surface-poppy-red-panel: #e84522;
  --surface-marigold-yellow-panel: #f5b400;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-cream-paper: #fbf3e4;
  --color-midnight-ink: #0b0f16;
  --color-cobalt-blue: #1457d8;
  --color-poppy-red: #e84522;
  --color-marigold-yellow: #f5b400;
  --color-blush-pink: #f2c3bd;

  /* Typography */
  --font-degular-display: 'degular-display', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-usual: 'usual', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-caption: 16px;
  --leading-caption: 1.78;
  --text-body: 18px;
  --leading-body: 1.82;
  --text-subheading: 22px;
  --leading-subheading: 1.82;
  --text-heading-sm: 52px;
  --leading-heading-sm: 1.23;
  --tracking-heading-sm: 0.47px;
  --text-heading: 80px;
  --leading-heading: 1.1;
  --tracking-heading: 1.04px;
  --text-display: 116px;
  --leading-display: 1.03;
  --tracking-display: 2.2px;

  /* Spacing */
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-44: 44px;
  --spacing-48: 48px;
  --spacing-96: 96px;
  --spacing-104: 104px;
  --spacing-120: 120px;
  --spacing-128: 128px;

  /* Border Radius */
  --radius-full: 9999px;
}
```