# ADMIN DESIGN
> Mission control for the cloud ops team — a dark instrument rail beside a bright work surface, with status colors doing the talking.

**Theme:** light canvas, dark sidebar (hybrid)

Earlydog Admin is the operational counterpart to the marketing site's Bauhaus poster system — same brand bones, completely different job. Where the marketing site is a spacious, illustrated, single-accent showpiece, the admin panel is dense, data-forward, and status-driven: a fixed dark sidebar in the brand's own Midnight Ink, a bright neutral-gray content canvas, white surfaces with real elevation, and a color system split cleanly into two jobs — one brand accent (Cobalt Blue) for anything actionable, and a brand-independent semantic set (success, warning, danger, info) for anything that communicates state. Typography drops the marketing site's 52–116px display scale almost entirely, keeping `usual` as the workhorse and reserving `degular-display` for a single page-title slot. Spacing tightens from "spacious" to "compact." Corners soften from sharp 0px to a quiet 6–12px. Where the marketing site is the brand's voice, the admin panel is the brand doing its job.

**Color system note:** Cobalt Blue is the only color carried over wholesale from the marketing palette — it means "you can act on this" everywhere it appears (buttons, links, active nav, focus rings) and nowhere else. Status communication uses a separate, brand-independent semantic set chosen for contrast and convention, not brand matching — Success, Warning, Danger, and Info each get a solid value for text/icons and a light tint for badge and banner backgrounds. Info is deliberately teal rather than blue so a "for your information" badge can never be mistaken for a clickable action. Midnight Ink and Cream Paper make a brief return as the dark sidebar's background and active-state text, giving the system's one dark surface a direct lineage back to the marketing brand.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Canvas Gray | `#f4f5f7` | `--color-canvas-gray` | Page background for the light content area; cooler and quieter than the marketing site's warm cream, since admin screens prioritize legibility over poster warmth |
| Card White | `#ffffff` | `--color-card-white` | Cards, tables, modals, and input surfaces sitting on top of Canvas Gray, separated by Elevation rather than the marketing system's flat color contrast |
| Sidebar Ink | `#0b0f16` | `--color-sidebar-ink` | Fixed dark sidebar background — reuses the marketing system's Midnight Ink token directly, so the admin's one dark surface still reads as unmistakably Earlydog |
| Border Gray | `#e2e4e9` | `--color-border-gray` | Table dividers, input borders, card hairlines on the light canvas |
| Text Primary | `#0b0f16` | `--color-text-primary` | Headings and primary body text on the light canvas — same ink as Sidebar Ink, different job |
| Text Secondary | `#6b7280` | `--color-text-secondary` | Muted labels, table captions, helper text, placeholder copy |
| Sidebar Text Active | `#fbf3e4` | `--color-sidebar-text-active` | Active nav item label and icon in the dark sidebar — reuses marketing's Cream Paper so the system's one warm color survives into the dark surface |
| Sidebar Text Muted | `#828a9b` | `--color-sidebar-text-muted` | Inactive nav item labels and icons in the dark sidebar |
| Cobalt Blue (Brand) | `#1457d8` | `--color-cobalt-blue` | The single carried-over brand accent — primary buttons, active sidebar indicator, links, focus rings. Everything "this is the main action" uses this one color and nothing else does |
| Success | `#15803d` | `--color-success` | Status semantic: completed, healthy, online |
| Warning | `#b45309` | `--color-warning` | Status semantic: degraded, pending, needs attention |
| Danger | `#b91c1c` | `--color-danger` | Status semantic: failed, error, destructive-action confirmation |
| Info | `#0f766e` | `--color-info` | Status semantic: informational, neutral system messages — teal rather than blue specifically so it never collides with the Cobalt Blue action signal |
| Success Tint | `#e7f6ec` | `--color-success-tint` | Light fill behind Success badges and banners, paired with Success for text |
| Warning Tint | `#fbeedb` | `--color-warning-tint` | Light fill behind Warning badges and banners |
| Danger Tint | `#fbe7e7` | `--color-danger-tint` | Light fill behind Danger badges and banners |
| Info Tint | `#e3f2f1` | `--color-info-tint` | Light fill behind Info badges and banners |

## Tokens — Typography

### degular-display — Reserved for the single page-title slot in the Top Bar. Admin density has no room for the marketing system's 52–116px display scale, but one small dose of brand personality survives at 28px. · `--font-degular-display`
- **Weight:** 700
- **Size:** 28px
- **Line height:** 1.2
- **Letter spacing:** +0.2px — a scaled-down echo of the marketing site's positive-tracking signature
- **Role:** Page titles in the Top Bar only ('Dashboard', 'Deployments', 'Settings'). Never used in cards, tables, or body copy.

### usual — The workhorse font for every other admin surface: nav, buttons, tables, forms, badges, modals. Line-height tightens considerably from the marketing site's 1.78–1.82 down to 1.3–1.45, since dense data screens need a denser rhythm. · `--font-usual`
- **Weights:** 400, 500, 700
- **Sizes:** 11px, 12px, 13px, 14px, 16px, 20px
- **Line height:** 1.3–1.45
- **Letter spacing:** normal (table headers use +0.3px for small-caps-style labels)
- **Role:** Navigation, buttons, table headers and body, form labels and inputs, badges, modal copy, card titles and metrics.

### Mono — New addition for admin. Used wherever figures need to align or values need to be scanned precisely: service IDs, timestamps, log lines, numeric table columns. · `--font-mono`
- **Substitute:** IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo
- **Weight:** 400
- **Size:** 12–13px
- **Role:** IDs, timestamps, numeric columns, code or log snippets — never used for prose.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| micro | 11px | 1.3 | — | `--text-micro` |
| caption | 12px | 1.3 | 0.3px (labels) | `--text-caption` |
| table-body | 13px | 1.45 | — | `--text-table-body` |
| body | 14px | 1.45 | — | `--text-body` |
| subheading | 16px | 1.4 | — | `--text-subheading` |
| section-heading | 20px | 1.3 | — | `--text-section-heading` |
| page-title | 28px | 1.2 | 0.2px | `--text-page-title` |

## Tokens — Spacing & Shapes

**Base unit:** 4px (shared with the marketing system)

**Density:** compact

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |

The marketing system's 96–128px macro spacing is dropped entirely — admin content never needs poster-scale gaps.

### Border Radius

| Element | Value |
|---------|-------|
| inputs | 6px |
| buttons | 6px |
| cards | 8px |
| modals | 12px |
| badges / pills | 9999px |
| illustration accents (empty states only) | 0px |

Corners soften from the marketing site's sharp 0px to a quiet 6–12px everywhere except small status pills, which keep the full pill shape, and the rare empty-state illustration accent, which keeps the marketing system's sharp Bauhaus corners.

### Layout

- **Sidebar width:** 260px (collapses to 72px icon-only rail on narrow viewports)
- **Top bar height:** 64px
- **Content max-width:** 1440px
- **Content gutter:** 24px
- **Card gap:** 12–16px

## Components

### Dark Sidebar
**Role:** Fixed left navigation rail, full height of the viewport

Sidebar Ink (`#0b0f16`) background, no border. Houses a small functional logo mark (20px square + wordmark, horizontal, top-left) — a deliberate scale-down from the marketing site's rotated vertical wordmark, since admin navigation needs to be found instantly, not admired. Below the logo: the primary nav list. A profile/account row anchors the bottom.

### Sidebar Nav Item
**Role:** Individual navigation link within the sidebar

Default: usual 12–13px weight 400, Sidebar Text Muted icon and label, 8–10px icon-to-label gap, ~40px row height, 6px border-radius. Active: usual 12–13px weight 500, Sidebar Text Active (Cream Paper) icon and label, a 2px solid Cobalt Blue bar on the leading edge, and a subtle lighter-ink row background (`rgba(255,255,255,0.07)`). Cobalt Blue is the only accent that ever appears in the sidebar — semantic status colors never do.

### Top Bar / Page Header
**Role:** Page-level header sitting above content, on the light canvas

Card White or transparent background, 1px Border Gray bottom border, 64px height. Page title in degular-display 28px weight 700, Text Primary, +0.2px tracking — the one place display type survives into admin. Primary action button and search sit right-aligned.

### Primary Button (filled)
**Role:** Main call-to-action within admin screens — a deliberate departure from the marketing site's outline-only pill button

Filled Cobalt Blue (`#1457d8`) background, white text, usual 13–14px weight 700, 6px border-radius, padding 8–10px vertical × 12–16px horizontal, no border. Admin's density and action-hierarchy needs favor a filled primary over the marketing system's universal outline — this is the one intentional break from "the border IS the button."

### Secondary Button (outlined)
**Role:** Secondary actions placed alongside a Primary Button

Transparent fill, 1px Border Gray border, Text Primary text, usual 13–14px weight 700, same radius and padding as Primary. The closest surviving cousin of the marketing site's outlined pill, just squared off to admin's tighter 6px radius.

### Status Badge
**Role:** Inline status indicator inside tables, cards, and detail views — the primary functional home for the semantic palette

Pill shape (the one place admin keeps the marketing system's full 9999px radius), padding 2px vertical × 10px horizontal, usual 11–12px weight 500–700. Background is the status's Tint color, text is the status's solid color (e.g. Success Tint background + Success text). Four variants: Success, Warning, Danger, Info. Never uses Cobalt Blue — badges are reserved for status, the brand accent is reserved for actions.

### Stat / Metric Card
**Role:** Dashboard summary number (active deployments, open incidents, uptime)

Card White background, 8px radius, 1px Border Gray, Elevation 1 shadow, padding 12–20px. Label in usual 11–12px weight 400 Text Secondary above a 20–24px weight 500 Text Primary number. Optional trend line below in Success or Danger color.

### Data Table
**Role:** Primary content pattern for list views (users, deployments, logs)

Card White background, 8px radius, 1px Border Gray around and between rows. Header row: usual 10–11px weight 500 Text Secondary, +0.3px tracking, Canvas Gray background, ~40px height. Body rows: usual 12–13px weight 400 Text Primary, ~44px height, Canvas Gray hover fill. Numeric, ID, and timestamp columns use the Mono token for alignment.

### Form Input Field
**Role:** Text inputs, selects, and search fields throughout admin forms

Card White fill, 1px Border Gray, 6px radius, 36px height, padding 0 12px, usual 14px weight 400 Text Primary. Focus state: border becomes 1px Cobalt Blue with a 3px Cobalt Blue 20%-opacity outer ring — the only glow-like effect in the system, justified as an accessibility focus indicator rather than decoration.

### Modal Dialog
**Role:** Confirmation dialogs and create/edit forms launched over admin content

Card White background, 12px radius, Elevation 3 shadow, max-width 480px, padding 24px, centered over a Sidebar Ink scrim at 50% opacity. Title in usual 16px weight 700 Text Primary, body in usual 14px weight 400 Text Secondary, Primary and Secondary action buttons right-aligned in the footer.

### Toast / Alert Banner
**Role:** Transient system feedback and persistent inline page alerts

4px solid leading bar in the relevant semantic color, Tint background fill of the same status, 8px radius, padding 12px 16px, usual 13px weight 400 Text Primary message. Toasts stack top-right of the viewport; inline banners sit full-width at the top of page content.

### Empty State Panel
**Role:** Zero-data screens — no results, empty list, first-run

Centered content on Card White or transparent background. Optional small Bauhaus-style geometric mark — one scaled-down circle or triangle in Cobalt Blue, never a full composition — above usual 14px weight 400 Text Secondary copy and an optional Secondary Button. The one place the marketing site's illustration language is allowed back in, kept deliberately tiny and restrained.

## Do's and Don'ts

### Do
- Reserve Cobalt Blue exclusively for actions and active states — if the user can click it or it shows "this is currently selected," it can be Cobalt Blue
- Reserve Success, Warning, Danger, and Info exclusively for status communication — never for navigation or generic emphasis
- Use the 4–48px spacing grid consistently across cards, tables, and forms
- Pair every semantic solid color with its matching tint for badge and banner backgrounds
- Keep the dark sidebar as the system's only dark surface — content area, cards, and modals all stay on the light canvas
- Use the Mono token for IDs, timestamps, and numeric table columns so figures align

### Don't
- Don't use degular-display anywhere except the single page-title slot — admin density has no room for the marketing system's 52–116px display scale
- Don't apply the marketing site's 96px section gaps or 1.78–1.82 line-heights — admin content needs the tighter, denser rhythm
- Don't mix Cobalt Blue and Info Teal for the same meaning — Cobalt means "you can act on this," Info means "here's a fact"
- Don't use Poppy Red or Marigold Yellow from the marketing palette for admin status colors — Warning and Danger have their own brand-independent values, chosen for contrast, not brand matching
- Don't add elevation deeper than Elevation 3 — heavier shadows start to feel like a different, less precise product
- Don't use the marketing site's sharp 0px corners on cards, tables, inputs, or buttons — admin surfaces round softly at 6–12px (badges are the one exception)

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 1 | Canvas Gray | `#f4f5f7` | Light content area page background |
| 2 | Card White | `#ffffff` | Cards, tables, modals, inputs |
| 3 | Sidebar Ink | `#0b0f16` | Fixed dark navigation rail |
| 4 | Scrim | `rgba(11,15,22,0.5)` | Modal backdrop overlay, sits above Canvas Gray and below the modal itself |

## Elevation

The clearest structural departure from the marketing site, which uses zero elevation throughout. Admin screens stack overlapping surfaces — dropdowns over tables, modals over content — that need real depth cues to stay legible. Shadows here are functional, not decorative.

| Level | Shadow | Used for |
|-------|--------|----------|
| 0 | none | Canvas Gray, Sidebar Ink |
| 1 | `0 1px 2px rgba(11,15,22,0.06), 0 1px 3px rgba(11,15,22,0.08)` | Cards, stat cards, table containers |
| 2 | `0 2px 4px rgba(11,15,22,0.06), 0 4px 8px rgba(11,15,22,0.10)` | Dropdowns, popovers, hover-elevated rows |
| 3 | `0 4px 8px rgba(11,15,22,0.08), 0 12px 24px rgba(11,15,22,0.16)` | Modals, dialogs |

## Imagery

Mostly icon-based, not illustrated — a sharp departure from the marketing site's illustration-as-identity approach. A simple outline icon set (Tabler-style) covers navigation, table actions, and status indicators. Decorative geometric illustration is reserved for Empty State Panels only, scaled down to a single shape rather than a full Bauhaus composition. No photography, consistent with the marketing system.

## Layout

Fixed 260px dark sidebar on the left (collapsible to a 72px icon-only rail), a 64px Top Bar above the content area, and a Canvas Gray content region with 24px gutters and a 1440px max-width — wider than the marketing site's 1200px, since data tables need the room. A typical screen opens with a row of 3–4 Stat Cards, followed by a Data Table or content grid below, with 12–16px gaps between blocks — far tighter than the marketing system's 96px section rhythm. This is a working surface, not an editorial spread.

## Agent Prompt Guide

**Quick Color Reference**
- canvas: #f4f5f7 (Canvas Gray)
- surface: #ffffff (Card White)
- dark sidebar: #0b0f16 (Sidebar Ink, reused Midnight Ink)
- border: #e2e4e9 (Border Gray)
- text primary: #0b0f16
- text secondary: #6b7280
- brand accent (actions only): #1457d8 (Cobalt Blue)
- success: #15803d / tint #e7f6ec
- warning: #b45309 / tint #fbeedb
- danger: #b91c1c / tint #fbe7e7
- info: #0f766e / tint #e3f2f1

**Example Component Prompts**

1. **Dark Sidebar**: 260px wide, full-height, Sidebar Ink (#0b0f16) background. Logo mark top-left (20px square in Cobalt Blue + wordmark in usual 13px weight 500 Cream Paper #fbf3e4). Nav items below: inactive items in usual 12px weight 400 Sidebar Text Muted (#828a9b); the active item gets a 2px Cobalt Blue leading bar, Cream Paper text, and a subtle lighter-ink row background.

2. **Primary Button**: Filled Cobalt Blue (#1457d8) background, white text, usual 14px weight 700, 6px border-radius, padding 10px vertical × 16px horizontal, no border, no shadow.

3. **Status Badge**: Pill shape (9999px radius), padding 2px vertical × 10px horizontal, usual 12px weight 700. Background is the status Tint color, text is the matching solid status color — e.g. Danger Tint (#fbe7e7) background with Danger (#b91c1c) text for a "Failed" badge.

4. **Stat Card**: Card White (#ffffff) background, 8px radius, 1px Border Gray (#e2e4e9), Elevation 1 shadow, padding 16-20px. Label in usual 12px weight 400 Text Secondary (#6b7280) above a 24px weight 500 Text Primary (#0b0f16) number.

5. **Data Table Row**: Card White background, 1px Border Gray bottom divider, 44px height, padding 0 14px. Body text usual 13px weight 400 Text Primary; ID or timestamp columns in the Mono token. Hover state fills the row with Canvas Gray (#f4f5f7).

## Similar Brands

- **Vercel Dashboard** — Same hybrid pattern of a dark fixed sidebar against a bright, dense content canvas with a single restrained brand accent
- **Linear** — Same disciplined single-accent-for-actions philosophy, with status and priority communicated through a separate semantic color set
- **Retool** — Same admin-density instinct: compact spacing, real elevation, and a component catalog built around tables, forms, and status badges rather than illustration
- **Stripe Dashboard** — Same split between a calm neutral canvas and a tightly scoped semantic palette for transaction and account status

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-canvas-gray: #f4f5f7;
  --color-card-white: #ffffff;
  --color-sidebar-ink: #0b0f16;
  --color-border-gray: #e2e4e9;
  --color-text-primary: #0b0f16;
  --color-text-secondary: #6b7280;
  --color-sidebar-text-active: #fbf3e4;
  --color-sidebar-text-muted: #828a9b;
  --color-cobalt-blue: #1457d8;
  --color-success: #15803d;
  --color-warning: #b45309;
  --color-danger: #b91c1c;
  --color-info: #0f766e;
  --color-success-tint: #e7f6ec;
  --color-warning-tint: #fbeedb;
  --color-danger-tint: #fbe7e7;
  --color-info-tint: #e3f2f1;
  --color-scrim: rgba(11, 15, 22, 0.5);

  /* Typography — Font Families */
  --font-degular-display: 'degular-display', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-usual: 'usual', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace;

  /* Typography — Scale */
  --text-micro: 11px;
  --text-caption: 12px;
  --text-table-body: 13px;
  --leading-table-body: 1.45;
  --text-body: 14px;
  --leading-body: 1.45;
  --text-subheading: 16px;
  --leading-subheading: 1.4;
  --text-section-heading: 20px;
  --leading-section-heading: 1.3;
  --text-page-title: 28px;
  --leading-page-title: 1.2;
  --tracking-page-title: 0.2px;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-48: 48px;

  /* Layout */
  --sidebar-width: 260px;
  --sidebar-width-collapsed: 72px;
  --topbar-height: 64px;
  --content-max-width: 1440px;
  --content-gutter: 24px;

  /* Border Radius */
  --radius-input: 6px;
  --radius-button: 6px;
  --radius-card: 8px;
  --radius-modal: 12px;
  --radius-pill: 9999px;
  --radius-illustration: 0px;

  /* Elevation */
  --shadow-1: 0 1px 2px rgba(11, 15, 22, 0.06), 0 1px 3px rgba(11, 15, 22, 0.08);
  --shadow-2: 0 2px 4px rgba(11, 15, 22, 0.06), 0 4px 8px rgba(11, 15, 22, 0.10);
  --shadow-3: 0 4px 8px rgba(11, 15, 22, 0.08), 0 12px 24px rgba(11, 15, 22, 0.16);

  /* Surfaces */
  --surface-canvas-gray: #f4f5f7;
  --surface-card-white: #ffffff;
  --surface-sidebar-ink: #0b0f16;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-canvas-gray: #f4f5f7;
  --color-card-white: #ffffff;
  --color-sidebar-ink: #0b0f16;
  --color-border-gray: #e2e4e9;
  --color-text-primary: #0b0f16;
  --color-text-secondary: #6b7280;
  --color-sidebar-text-active: #fbf3e4;
  --color-sidebar-text-muted: #828a9b;
  --color-cobalt-blue: #1457d8;
  --color-success: #15803d;
  --color-warning: #b45309;
  --color-danger: #b91c1c;
  --color-info: #0f766e;
  --color-success-tint: #e7f6ec;
  --color-warning-tint: #fbeedb;
  --color-danger-tint: #fbe7e7;
  --color-info-tint: #e3f2f1;

  /* Typography */
  --font-degular-display: 'degular-display', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-usual: 'usual', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace;

  /* Typography — Scale */
  --text-micro: 11px;
  --text-caption: 12px;
  --text-table-body: 13px;
  --text-body: 14px;
  --text-subheading: 16px;
  --text-section-heading: 20px;
  --text-page-title: 28px;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-48: 48px;

  /* Border Radius */
  --radius-input: 6px;
  --radius-button: 6px;
  --radius-card: 8px;
  --radius-modal: 12px;
  --radius-pill: 9999px;
}
```