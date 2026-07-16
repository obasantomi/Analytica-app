---

# PART III — Motion & Interaction Language

---

# 32. Motion Philosophy

Motion is not decoration.

Motion is communication.

Every animation should reinforce one of the following ideas:

• Progress

• Guidance

• Discovery

• Confidence

• Feedback

• Continuity

The interface should never feel static.

Likewise, it should never feel overly animated.

Users should subconsciously notice motion rather than consciously watching it.

Motion should always make the interface easier to understand.

---

# 33. Motion Personality

The motion language should feel:

• Calm

• Intentional

• Premium

• Responsive

• Elegant

• Structured

Avoid:

• Bouncy animations

• Elastic easing

• Cartoon-like movement

• Excessive rotation

• Dramatic scaling

• Flashing effects

Preferred easing curves:

easeOut

easeInOut

Spring animations should be subtle and highly damped.

Every animation should feel effortless.

---

# 34. Progressive Disclosure

Information should never appear all at once.

As users scroll, information should reveal itself naturally.

Each section should introduce one concept before moving to the next.

Users should feel like they are progressing through a guided learning experience.

Scrolling should feel similar to progressing through one of Analytica's learning paths.

---

# 35. Hero Entrance Sequence

The Hero should introduce the product gradually.

Sequence

1.

Navigation fades down.

↓

2.

Badge fades upward.

↓

3.

Hero heading appears line by line.

↓

4.

Supporting paragraph fades in.

↓

5.

Primary CTA appears.

↓

6.

Secondary CTA appears.

↓

7.

Hero visualization animates into place.

↓

8.

Background decorative elements begin their ambient motion.

The visitor should feel welcomed rather than overwhelmed.

---

# 36. Split-Tone Hero Heading

Animation Name

gradient-split-heading

Behavior

The Hero heading consists of three stacked text blocks.

Line 1

Primary color.

Full opacity.

Line 2

Muted blend between primary and accent blue.

Approximately 50–60% emphasis.

Line 3

Primary color.

Full opacity.

Entrance

Each line fades upward individually.

TranslateY

12px → 0

Opacity

0 → 1

Stagger

100–150ms

No additional looping animation.

Typography itself should provide the impact.

---

# 37. Hero Visualization

The Hero visualization should not be static.

It should simulate a miniature product experience.

Possible sequence

Dataset loads

↓

Chart grows

↓

AI Mentor appears

↓

Question generated

↓

User response submitted

↓

Feedback appears

↓

Progress increases

↓

Loop

The animation should loop slowly without distracting from the content.

---

# 38. Scroll Philosophy

Scrolling represents progression.

Every major scroll interaction should reinforce learning.

Users should feel they are unlocking knowledge rather than simply moving down a webpage.

Each section should have a clear beginning, middle, and end.

---

# 39. Section Reveal

Each section should animate once when entering the viewport.

Preferred animation

Opacity

0 → 1

TranslateY

32px → 0

Duration

500–700ms

Animations should never replay excessively.

---

# 40. Cards

Cards should reveal in sequence.

Never all together.

Preferred stagger

80–120ms

Cards should slightly translate upward while fading in.

Hover behavior

Lift

2–4px

Shadow increases slightly

Border becomes more visible

Animation duration

200ms

---

# 41. Buttons

Buttons should feel responsive.

Hover

Lift

2px

Shadow slightly increases.

Background transitions smoothly.

Press

Scale

0.98

Duration

120ms

Buttons should never bounce.

---

# 42. Cursor Follow Dot

Animation Name

cursor-follow-dot

Behavior

A small glowing green indicator follows the user's cursor.

Requirements

• Fixed position

• requestAnimationFrame updates

• Lerp interpolation

• Soft glow

• Pointer-events none

Hovering interactive elements

Scale increases slightly.

Glow intensity increases.

The cursor should feel alive without distracting users.

---

# 43. Scroll Rail Indicator

Animation Name

scroll-rail-indicator

Purpose

Communicate progress through pinned learning sections.

Behavior

A vertical progress rail.

A glowing green indicator travels smoothly along the rail.

Movement should interpolate based on scroll progress inside the section.

The indicator should never jump.

---

# 44. Sticky Scrollytelling

Animation Name

sticky-step-reveal

Purpose

Teach concepts progressively.

Implementation

Wrapper

500vh

Inner container

Sticky

Height

100vh

Track scroll progress.

Divide progress equally across all steps.

Current step

Full opacity

Green accent

Active indicator

Inactive steps

Muted

30% opacity

Content transitions

Fade

TranslateY

16px

Large background step number updates simultaneously.

Release sticky container after final step.

---

# 45. Navigation

Animation Name

scroll-spy-nav-pill

Purpose

Show users where they are.

Behavior

Navigation continuously reflects the current page section.

The active indicator should slide between navigation items.

Never instantly appear.

Preferred implementation

Shared layout animation.

Transition

250–350ms

---

# 46. Statistics

Numbers should animate upward.

Charts should animate from zero.

Progress bars should fill naturally.

Skill graphs should expand smoothly.

Animations should reinforce measurable progress.

---

# 47. Dashboard Preview

Whenever dashboard previews appear:

Cards should stagger.

Charts animate.

Notifications fade.

Progress bars grow.

Graphs draw themselves.

The interface should appear to "wake up."

---

# 48. AI Mentor

The AI mentor should feel alive.

Possible behaviors

Typing indicator.

Message appears.

Recommendation fades in.

Highlight pulse.

Cursor movement.

Do not simulate long chat conversations.

Keep interactions concise.

---

# 49. Hover Philosophy

Hover should reward curiosity.

Hover animations should communicate:

This is interactive.

Never distract.

Never dramatically transform layout.

Preferred effects

Elevation

Border emphasis

Shadow

Icon movement

Subtle gradient shift

---

# 50. Loading States

Avoid spinners where possible.

Prefer

Skeleton loading

Animated shimmer

Progressive rendering

Partial loading

The interface should always appear responsive.

---

# 51. Accessibility

All motion must respect

prefers-reduced-motion

When enabled

Disable

Pinned animations

Cursor follower

Large transitions

Replace with simple fades.

The experience should remain fully usable.

---

# 52. Performance Rules

Animations should maintain 60fps.

Prefer

transform

opacity

Avoid animating

width

height

top

left

Use GPU-accelerated properties whenever possible.

Avoid expensive repaint operations.

---

# 53. Motion Consistency Checklist

Before adding any animation, ask:

Does it teach something?

Does it communicate progress?

Does it reinforce hierarchy?

Does it improve understanding?

Would removing it make the experience worse?

If the answer is "no," do not add the animation.