# Tech Stack Layout Spacing Redesign

We will redesign the tech stack section to match the visual columns and tag dimensions from the reference project, removing the card panels and grid containers.

## Design Details

### 1. Two-Column Layout
- Group categories into two columns on desktop (`md` screens and up):
  - Left Column: Languages (index 0) and Frameworks (index 1).
  - Right Column: Animations (index 2) and Project Management (index 3).
- Display them stacked in a single vertical flex column on mobile screens.

### 2. Typography and Visual Elements
- Remove the surrounding panel `div` (border, background, padding) from each category.
- Remove category title underlines and colored text styles.
- Set headers as clean text: `font-roboto text-[16px] font-medium lg:font-semibold text-white mb-1`.

### 3. Tag and Icon Dimensions
- Change individual tag padding from `px-3 py-1.5` to `px-2 py-1`.
- Change image icon size from `w-5 h-5` to `w-6 h-6 max-lg:w-5 max-lg:h-5`.
- Text size kept as `text-[14px] max-lg:text-[12px]`.
- Retain custom themed borders, hover transition effects, and background colors.
