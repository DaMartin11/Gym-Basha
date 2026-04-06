# Design System Specification: Approachable High-Tech

## 1. Overview & Creative North Star: "The Kinetic Sanctuary"

This design system is built upon the "Kinetic Sanctuary" philosophy. In the crowded space of fitness apps, we move away from the aggressive, high-contrast "drill sergeant" aesthetic. Instead, we create a digital environment that feels like a premium, airy boutique studio—high-tech in its intelligence, but organic and welcoming in its execution.

To break the "standard app" feel, this system prioritizes **intentional asymmetry** and **tonal depth**. We eschew rigid grids in favor of breathing room and overlapping elements that suggest movement. The interface should never feel "static"; it should feel like it is exhaling.

---

## 2. Color Theory & Tonal Depth

Our palette transitions from the grounded stability of the Deep Navy to the kinetic energy of Action Green.

### The Color Palette (Material Logic)

- **Primary (`#426500`):** Used for brand presence and core interactive elements.
- **Primary Container (`#B8FD4B`):** The "Action Green." Use this for high-motivation moments: progress rings, success states, and primary CTAs.
- **Secondary (`#515C70`):** The "Deep Navy" influence. Used for secondary actions and providing a sense of "Expert Guidance."
- **Tertiary (`#904800`):** The "Orange" accent. Reserved for high-reward gamification, badges, and "streak" alerts.
- **Surface Hierarchy:**
  - `surface`: #F5F7F9 (The canvas)
  - `surface-container-low`: #EEF1F3 (Subtle sectioning)
  - `surface-container-highest`: #D9DDE0 (Prominent card backgrounds)

### The "No-Line" Rule

**Explicit Instruction:** Prohibit 1px solid borders for sectioning. Structural boundaries must be defined solely through background color shifts. To separate a workout module from the feed, place a `surface-container-lowest` card on a `surface-container-low` background.

### The "Glass & Gradient" Rule

To inject "soul" into the high-tech aesthetic:

- **Signature Gradients:** For Hero cards or main Action buttons, use a linear gradient from `primary` to `primary_container` at a 135-degree angle.
- **Glassmorphism:** Floating navigation bars or modal overlays must use a semi-transparent `surface` color (80% opacity) with a `20px` backdrop-blur.

---

## 3. Typography: The Editorial Voice

We use a high-contrast scale to create an authoritative yet friendly hierarchy.

- **Display & Headlines (Plus Jakarta Sans):** Our "Voice." Bold weights and generous letter-spacing.
  - _Display-LG (3.5rem):_ Use for celebratory stats (e.g., "10,000 Steps").
  - _Headline-MD (1.75rem):_ Use for workout titles and personal greetings.
- **Body & Labels (Inter):** Our "Intelligence."
  - _Body-LG (1rem):_ Standard reading size for coaching tips.
  - _Label-MD (0.75rem):_ Technical data points and secondary metadata.

**The Editorial Shift:** Always pair a `headline-lg` with a `body-md` in a much lighter weight to create a sophisticated, magazine-style contrast.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are too "heavy" for a modern fitness assistant. We achieve lift through light.

- **The Layering Principle:** Treat the UI as stacked sheets of fine paper.
  - Level 0: `surface` (Base)
  - Level 1: `surface-container-low` (Subtle inset areas)
  - Level 2: `surface-container-lowest` (Floating cards)
- **Ambient Shadows:** If a card requires a shadow for focus, use the "Shadow-Ambient" preset: `Box-shadow: 0px 20px 40px rgba(44, 47, 49, 0.06);`. The shadow color is a tint of our `on-surface` color, never pure black.
- **The Ghost Border:** If a container sits on a background of the same color, use the `outline-variant` at **15% opacity**. It should be felt, not seen.

---

## 5. Components & Interaction Patterns

### Buttons

- **Primary:** High-pill shape (`rounded-full`). Gradient fill (`primary` to `primary_container`). Large horizontal padding (32px).
- **Secondary:** Ghost style. No background. `outline-variant` (20% opacity) border.
- **Interaction:** On tap, buttons should scale down to 0.96 for a tactile "squish" feel.

### Cards & Progress

- **Cards:** Use `rounded-lg` (2rem). **Never use dividers.** Use vertical white space (24px or 32px) to separate the title from the content.
- **Kinetic Progress:** Progress bars should use the `primary_fixed` color with a `primary_container` glow effect (soft shadow of the same color).

### Specialized Fitness Components

- **The "Coach Bubble":** A glassmorphic container (`surface` at 70% opacity + blur) used for AI-generated insights. Use `rounded-xl` (3rem) for one corner to create a "speech" tail effect.
- **Metric Chips:** Small `surface-container-high` capsules used for "Time," "Kcal," and "Difficulty." These should have no borders and use `label-md` typography.

---

## 6. Do’s and Don'ts

### Do:

- **Do** use asymmetrical layouts (e.g., a large headline on the left with a small supporting image offset to the right).
- **Do** use "Plus Jakarta Sans" for all numbers and statistics to emphasize the tech-forward nature.
- **Do** allow elements to "bleed" off the edge of cards to suggest a larger world of data.

### Don't:

- **Don't** use 100% opaque black for text. Use `on-surface` (#2C2F31) for a softer, premium feel.
- **Don't** use "Standard Blue" for links. Use `primary` or `tertiary`.
- **Don't** use sharp corners (`none` or `sm`). Everything in this system must feel safe and approachable, adhering to the `DEFAULT` (1rem) or `lg` (2rem) radius.
- **Don't** use horizontal dividers to separate list items. Use a 12px gap and a subtle background hover state instead.
