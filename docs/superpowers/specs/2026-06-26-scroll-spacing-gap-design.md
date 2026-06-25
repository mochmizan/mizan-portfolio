# 2026-06-26 Scroll Spacing Gap Fix Design

Design spec for resolving the empty scroll spacing gap after the pinned cards deck animation finishes on the portfolio's landing page.

## Goal
Eliminate the blank `100vh` gap that appears after all showcase cards have translated off-screen, ensuring a seamless transition into the "Selected Work" section.

## Proposed Design
We will replicate the reference repository's approach by dynamically swapping the z-indices and positioning of the pinned container at the end of the scroll track.

### 1. GSAP Tweaks
*   Remove `opacity: 0` from the card tween so the cards do not fade out.
*   Monitor scroll progress in ScrollTrigger's `onUpdate`:
    *   If progress $\ge 95\%$, set `.cards-trigger-container` to `position: fixed`, `top: 0`, and `zIndex: 0`.
    *   If progress $< 95\%$, restore `zIndex: 10`.
*   Clear all inline styles `onLeaveBack` using `clearProps: "all"`.

### 2. Layout Tweaks
*   Set the "Selected Work" container to `relative z-10` with a solid background color matching `var(--bg-color)`.
*   This allows the "Selected Work" section to slide smoothly *on top* of the fixed showcase cards container.

## Verification
*   Verify that scrolling past the showcase cards deck leads immediately into the "Selected Work" grid without any empty screen gaps.
*   Verify that scrolling back up brings back the showcase cards animation seamlessly.
