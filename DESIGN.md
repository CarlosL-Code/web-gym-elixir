---
name: Titanium Kinetic
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e4beb4'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#ab8980'
  outline-variant: '#5b4039'
  surface-tint: '#ffb5a0'
  primary: '#ffb5a0'
  on-primary: '#5f1500'
  primary-container: '#ff5722'
  on-primary-container: '#541200'
  inverse-primary: '#b02f00'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#c8c6c5'
  on-tertiary: '#303030'
  tertiary-container: '#929090'
  on-tertiary-container: '#2a2a2a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbd1'
  primary-fixed-dim: '#ffb5a0'
  on-primary-fixed: '#3b0900'
  on-primary-fixed-variant: '#862200'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-xl-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system is engineered to evoke a sense of high-performance athleticism and unwavering professional reliability. It targets fitness enthusiasts and professional athletes who demand precision and intensity from their tools. 

The aesthetic is **Dark-Mode Dominant High-Contrast**, leaning into a modern, sophisticated "luxury performance" look. It utilizes heavy black and charcoal surfaces to make the primary "Electric Orange" vibrate with energy. The visual narrative focuses on momentum, strength, and clarity, using expansive whitespace (or "darkspace") to ensure the UI feels breathable despite its aggressive color palette.

## Colors

The palette is built on a foundation of "Deep Charcoal" and "Rich Black" to establish a premium, "gym-floor" environment. 

- **Primary (Electric Orange):** Reserved strictly for high-priority actions, progress indicators, and vital status updates. It represents the energy and "heat" of a workout.
- **Secondary (Light Gray/White):** Used for primary content, ensuring maximum legibility against dark backgrounds.
- **Tertiary (Slate Gray):** Used for borders, inactive states, and secondary icons to provide subtle structure without breaking the dark aesthetic.
- **Backgrounds:** Use pure black (#000000) for page foundations and Deep Charcoal (#121212) for cards and section layering.

## Typography

This design system employs a dual-typeface strategy to balance impact with utility. 

**Montserrat** is used for all headlines and display text. Its geometric construction and heavy weight options provide the "Titanium" strength necessary for a fitness brand. Headings should utilize tighter letter-spacing and bold/extrabold weights to command attention.

**Inter** is utilized for body copy, data readouts, and labels. Its high x-height ensures readability during high-intensity activity. Labels should frequently use uppercase styling with slight letter-spacing to distinguish them from standard body text.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model with generous vertical rhythm to emphasize a sense of scale and power. 

- **Grid:** Use a 12-column grid for desktop and a 4-column grid for mobile. 
- **Rhythm:** Spacing follows an 8px baseline. Use `lg` (48px) and `xl` (80px) spacing between major sections to maintain a "premium" and "uncluttered" feel.
- **Padding:** Internal card padding should be a minimum of `md` (24px) to ensure content does not feel cramped.

## Elevation & Depth

In this dark-mode environment, depth is communicated through **Tonal Layering** supplemented by subtle **Ambient Shadows**.

- **Level 0 (Base):** Rich Black (#000000). Used for the main canvas.
- **Level 1 (Cards/Surface):** Deep Charcoal (#121212). Used for primary content containers.
- **Level 2 (Overlays):** Slate Gray (#2C2C2C). Used for modals or elevated card states.
- **Shadows:** Use extremely soft, large-radius shadows (0px 12px 32px rgba(0,0,0,0.5)) on Level 1 surfaces to create a sense of lift without appearing dated. 
- **Outlines:** Use 1px borders in Slate Gray (#2C2C2C) to define boundaries between dark surfaces where shadows might be invisible.

## Shapes

The design system uses a "Rounded" language (8px to 12px) to soften the aggressive high-contrast color palette, making the interface feel modern and approachable rather than industrial and cold.

- **Standard Elements (Buttons, Inputs):** 8px radius.
- **Large Containers (Cards, Sections):** 12px to 16px radius.
- **Interactive Indicators:** Pills are reserved for status tags (e.g., "Live Class" or "High Intensity").

## Components

### Buttons
- **Primary:** Electric Orange background with Black text. Bold weight, uppercase.
- **Secondary:** Transparent with 2px White or Light Gray border.
- **Tertiary:** Slate Gray background for "utility" actions.

### Cards
- Surfaces use Deep Charcoal (#121212) with a subtle 1px border of Slate Gray (#2C2C2C).
- Use high-quality photography with a slight dark overlay to ensure text overlay readability.

### Input Fields
- Background: #1E1E1E (Elevated Surface).
- Border: 1px Slate Gray, turning Electric Orange on focus.
- Placeholder text: Mid-gray for low visual noise.

### Lists & Items
- Use "divider-less" lists where possible, using vertical spacing and tonal shifts to separate items.
- Active items should be signaled with a vertical Electric Orange "strike" on the left edge.

### Chips & Tags
- Small, uppercase text. For difficulty levels (Beginner, Pro), use tonal backgrounds with no borders.
- Active filters use the Electric Orange primary color.

### Icons
- Use modern, 2px stroke weight outline icons. 
- Icons should be secondary to text unless used in a bottom navigation bar or dashboard grid.