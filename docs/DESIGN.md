---
name: Cienvolva Interactive Learning
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464554'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#00687a'
  on-secondary: '#ffffff'
  secondary-container: '#57dffe'
  on-secondary-container: '#006172'
  tertiary: '#b10e6b'
  on-tertiary: '#ffffff'
  tertiary-container: '#d23284'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffd9e4'
  tertiary-fixed-dim: '#ffb0cd'
  on-tertiary-fixed: '#3e0022'
  on-tertiary-fixed-variant: '#8c0053'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Manrope
    fontSize: 44px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-tablet: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes a refined yet inviting edutech environment crafted specifically for youth exploration in mathematics and physics. The tone blends scientific rigor with playful discovery: clear, open, tactile, and highly legible. It dismantles the intimidation factor of exact sciences through airy layouts, soft mathematical coordinate watermarks, welcoming geometric forms, and a signature multi-spectrum bar that represents the curiosity spectrum.

The visual style is **Contemporary Edutech Modern**—anchored on high-clarity white/off-white backgrounds, structured typographic cadence, subtle coordinate grid motifs, and vibrant visual accents that categorize scientific tracks without visual clutter.

## Colors

The palette balances foundational academic authority with dynamic discovery accents:

- **Primary (`#6366F1` - Electric Indigo/Iris):** Powers the core branding, primary calls-to-action, key navigation highlights, and interactive states.
- **Secondary (`#06B6D4` - Cyber Teal):** Distinguishes physics modules, interactive simulations, and informational badges.
- **Tertiary (`#EC4899` - Vivid Berry):** Drives gamification badges, completion celebrations, and youth-oriented discovery tags.
- **Neutral (`#0F172A` - Slate Obsidian):** Provides high-contrast typography, crisp border boundaries, and deep grounding against light canvasses.
- **Accent Spectrum Strip:** A recurring brand ribbon featuring balanced segments of Rose (`#FB7185`), Amber (`#FBBF24`), Emerald (`#34D399`), Sky (`#38BDF8`), and Iris (`#818CF8`) placed beneath headers and hero containers.
- **Surfaces:** Pure White (`#FFFFFF`) layered over Crisp Canvas (`#F8FAFC`) with subtle Cartesian grid rules (`#E2E8F0` at 40% opacity).

## Typography

The type scale combines **Manrope** for headlines and brand signposts with **Inter** for all narrative and interface copy:

- **Manrope** brings rounded geometric precision, matching the curvature of mathematical plotting graphs while maintaining friendly, approachable confidence.
- **Inter** guarantees supreme legibilidade in dense mathematical descriptions, formula explanations, and interface metadata.
- Numerical figures must use tabular numerals (`font-feature-settings: "tnum"`) within formulas, scores, and experiment metrics.

## Layout & Spacing

The layout is built upon an intentional, rhythmic 8-point spatial model structured around a 12-column responsive fluid grid:

- **Desktop (1280px+):** 12 columns, 24px (`1.5rem`) gutters, with minimum 48px (`3rem`) lateral margins centered up to a max content container of 1200px.
- **Tablet (768px - 1279px):** 8 columns, 20px gutters, 32px (`2rem`) margins. Two-column cards reflow smoothly to stacked media-first displays.
- **Mobile (320px - 767px):** 4 columns, 16px (`1rem`) gutters, 20px (`1.25rem`) margins. Activity carousels swap into horizontal scroll containers or single-column stacked rows.

Consistent layout distance tokens keep activity cards, profile cards, and experiment previews evenly breathable across all viewport configurations.

## Elevation & Depth

Visual hierarchy emphasizes clean, crisp spatial separation rather than heavy, dirty drop-shadows:

- **Flat/Tonal Foundations:** Base layers leverage tinted white backgrounds (`#FFFFFF` resting over `#F8FAFC`) framed by soft, hairline structural borders (`#E2E8F0` at 1px).
- **Interactive Hover State Elevation:** Cards and profile nodes rise using subtle, tinted ambient shadows: `0px 10px 25px -4px rgba(99, 102, 241, 0.08), 0px 4px 6px -2px rgba(15, 23, 42, 0.03)`.
- **Active State / Modals:** Lift with an extended diffuse dispersion: `0px 20px 30px -6px rgba(15, 23, 42, 0.08)`.
- **Mathematical Background Layering:** Coordinate graphs and geometry curves remain pinned to the absolute bottom z-index (`z-0`) with opacity values capped at 12–18% to preserve contrast against interactive cards.

## Shapes

The shape system adopts a rounded design language with progressive corner softening:

- Standard controls (input boxes, experiment tags, action buttons) apply standard `rounded-md` (0.5rem / 8px).
- Interactive experiment cards, featured viewports, and modal wrappers expand into friendly curved corners (`rounded-lg` at 1rem / 16px and `rounded-xl` at 1.5rem / 24px) reflecting the physical curvature seen in hands-on science lab equipment.
- Profile selectors ("Professor", "Aluno", "Curioso") integrate pure circles (`rounded-full`) for avatars, balanced by pill-shaped base labels.

## Components

### Multi-Color Spectrum Header Ribbon
- Height: 6px continuous horizontal divider directly under the primary navigation bar.
- Segments: Repeating linear intervals of `#FB7185` (Coral Pink), `#38BDF8` (Sky Blue), `#FBBF24` (Sun Amber), `#818CF8` (Soft Iris), and `#34D399` (Mint Green).

### Profile Selectors ("Professor", "Aluno", "Curioso")
- Circular avatar target with a diameter of 96px (desktop) or 80px (mobile).
- Border: 3px neutral outline (`#E2E8F0`), transitioning to a vibrant `#6366F1` stroke with subtle scale bump (1.04x) on selection.
- Label: Set in `label-lg`, resting within a pill container (`space-xs` padding vertical, `space-md` horizontal).

### Interactive Experiment Cards
- Container: Light surface (`#FFFFFF`), 1.5rem roundedness, 1px border (`#E2E8F0`).
- Aspect Ratio: 4:3 or 1:1 preview area in neutral slate tone (`#334155`), serving as the interactive canvas or preview thumbnail.
- Metadata: Tag chips aligned beneath the title, followed by two lines of clamped descriptive body copy and a clear primary action trigger.

### Tags & Topic Chips
- Height: 26px compact height with `0.5rem` corner radius.
- Background: Neutral tint (`#F1F5F9`) with slate label (`#475569`). Interactive or active subject tags (e.g., "Cinemática", "Frações") adopt light brand tints with colored text (e.g., `#EEF2FF` background with `#4F46E5` label).

### Buttons
- **Primary:** Background `#6366F1`, text `#FFFFFF`, roundedness 0.5rem, font `label-lg`. Pressed state: `#4F46E5`.
- **Secondary / Outline:** 1.5px border `#E2E8F0`, background transparent, text `#0F172A`. Hover: `#F8FAFC`.
- **Navigation Arrows:** Circular 44px buttons featuring subtle slate borders and center-aligned vector icons for carousel stepping.

### Form Inputs
- 44px standard touch targets, rounded 0.5rem corners, `#F8FAFC` background with `#CBD5E1` border, transitioning to `#6366F1` ring focus.