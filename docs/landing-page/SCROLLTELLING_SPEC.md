# Analytica Landing Page

# Scrollytelling Specification

Version: 1.0

---

# Purpose

The Learning Journey section is one of the signature experiences of the Analytica landing page.

Its purpose is not simply to display information.

Its purpose is to make the visitor feel like they are progressing through a structured learning journey.

The interaction should reinforce Analytica's core philosophy:

> Learning happens through guided progression.

This section should feel premium, calm, intentional, and effortless.

It should become one of the most memorable interactions on the page.

---

# Design Philosophy

Visitors should not feel like they are scrolling through multiple sections.

Instead, they should feel as though the page has paused while the learning journey unfolds in front of them.

Scrolling should become a mechanism for progression rather than navigation.

The interaction should communicate:

- Progress
- Guidance
- Mastery
- Structure
- Confidence

---

# Mental Model

This section is built from:

ONE tall wrapper

containing

ONE sticky container

Every visual change inside the sticky container is driven by ONE normalized scroll progress value.

Never think of this as five separate sections.

Think of it as one interactive experience.

---

# Core Architecture

The implementation consists of two nested containers.

## Outer Wrapper

Purpose:

Provide scroll distance.

Example:

500vh for five learning steps.

The outer wrapper should never contain visual content.

Its only responsibility is providing enough vertical space for the interaction.

Example:

```
Wrapper

height: 500vh
position: relative
```

---

## Sticky Container

Purpose:

Display the entire Learning Journey experience.

Example:

```
position: sticky;
top: 0;
height: 100vh;
overflow: hidden;
```

The sticky container should remain visually fixed while the user scrolls through the outer wrapper.

The user should feel that the viewport has stopped moving.

---

# Scroll Progress

The interaction should calculate a single normalized progress value.

Range:

0 → 1

The progress value must be based only on scrolling within the wrapper.

Never use full-page scroll position.

Every visual element should derive from this value.

---

# Progress Segmentation

Divide the normalized progress equally across all steps.

Example:

Five steps

Progress

0.00

↓

0.20

↓

0.40

↓

0.60

↓

0.80

↓

1.00

Each segment activates one learning step.

---

# Visual State

Everything inside the sticky container must respond to the same progress value.

This includes:

- Active list item
- Heading
- Description
- Large background number
- Counter
- Progress rail
- Progress dot
- Image or illustration
- Decorative animations

There should never be conflicting animation sources.

One progress value controls everything.

---

# Learning Steps

Suggested progression:

01

Choose a Project

↓

02

Explore the Dataset

↓

03

Receive AI Guidance

↓

04

Complete the Analysis

↓

05

Receive Professional Feedback

These steps should communicate a clear learning journey.

---

# Left Navigation

The numbered list remains visible throughout the interaction.

Inactive items

- Muted typography
- Reduced opacity
- No accent color

Active item

- Full opacity
- Green accent
- Larger visual emphasis
- Optional subtle scale

Only one item should be active at a time.

---

# Content Transition

The content panel should update smoothly.

Never instantly swap content.

Preferred transition:

Current content

Fade out

↓

Translate slightly upward

↓

New content

Fade in

↓

Translate into place

Duration

300–500ms

---

# Background Number

Each learning step includes a large decorative number.

Example:

01

02

03

04

05

The number should be:

- Very low opacity
- Extremely large
- Positioned behind the content
- Updated together with the active step

It should reinforce progression without distracting.

---

# Progress Rail

Display a thin vertical line beside the numbered steps.

The line represents the complete learning journey.

A glowing green progress indicator moves smoothly along the rail.

The indicator position should interpolate continuously based on scroll progress.

Never snap between positions.

---

# Counter

Display:

01 / 05

02 / 05

03 / 05

etc.

The counter updates together with the active step.

---

# Scroll Behaviour

While the wrapper is being scrolled:

The sticky container must remain visually fixed.

The only visible movement should be:

- Progress indicator
- Active list item
- Content transitions
- Decorative animations

The page itself should appear stationary.

---

# Release Behaviour

Once the final learning step has been displayed for its complete scroll duration:

Release the sticky container.

Resume normal page scrolling.

The transition should feel natural.

There should never be a sudden jump.

---

# Motion Language

Animations should feel:

- Calm
- Premium
- Intentional
- Smooth

Avoid:

- Bounce
- Overshoot
- Flashing
- Sudden jumps
- Large rotations

Preferred easing:

easeOut

easeInOut

Soft spring animations.

---

# Performance

Maintain 60 FPS.

Animate only:

- opacity
- transform

Avoid animating:

- width
- height
- top
- left

Prefer GPU accelerated transforms.

Avoid unnecessary React re-renders.

Memoize where appropriate.

---

# Accessibility

Respect:

prefers-reduced-motion

When enabled:

- Disable continuous scroll-linked animations.
- Disable decorative movement.
- Replace transitions with simple fades.
- Preserve all content and navigation.

The experience must remain fully usable.

---

# Framer Motion Guidelines

Preferred APIs:

- useScroll()
- useTransform()
- useSpring()
- AnimatePresence()
- motion.\*

Derive one section-scoped progress value.

Every visual state should derive from that value.

Do not create independent animation timelines for different elements.

---

# Engineering Rules

Do NOT:

- Build five full-screen sections.
- Snap-scroll between pages.
- Use multiple sticky containers.
- Trigger independent animations from IntersectionObserver.
- Create separate scroll calculations for each component.

Instead:

Use one sticky container.

One tall wrapper.

One normalized scroll value.

Everything else should derive from that single source of truth.

---

# Success Criteria

A visitor should perceive the interaction as:

"I kept scrolling, but the screen stayed in place while the experience guided me through each learning step."

If the user feels like they are simply scrolling through separate sections, the implementation is incorrect.

This interaction should become one of the defining characteristics of the Analytica landing page.

It should feel comparable in quality to the interactive storytelling experiences found on world-class product websites while remaining true to Analytica's educational mission.
