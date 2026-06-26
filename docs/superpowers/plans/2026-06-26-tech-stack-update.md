# Tech Stack Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the Stacks section of the portfolio with 4 categories of technologies, loading colored logos from Simple Icons and Devicon CDNs.

**Architecture:** We will modify the static data definition `stackCategories` in `LandingPage.tsx` to list the new categories and items with their respective external CDN URLs. No layout changes are needed as the current layout automatically loops over this array.

**Tech Stack:** React, TypeScript, Simple Icons CDN, Devicon CDN

---

### Task 1: Update Stacks Definition in LandingPage.tsx

**Files:**
- Modify: `portfolio/src/pages/LandingPage.tsx:62-98`

- [ ] **Step 1: Update `stackCategories` structure and links**

Modify `portfolio/src/pages/LandingPage.tsx` to replace the old `stackCategories` array:

```tsx
const stackCategories: StackCategory[] = [
  {
    title: 'Programming Language',
    items: [
      { name: 'Python', icon: 'https://cdn.simpleicons.org/python' },
      { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript' },
      { name: 'PHP', icon: 'https://cdn.simpleicons.org/php' }
    ]
  },
  {
    title: 'Framework & Libraries',
    items: [
      { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi' },
      { name: 'React', icon: 'https://cdn.simpleicons.org/react' },
      { name: 'Nuxt.js', icon: 'https://cdn.simpleicons.org/nuxt' },
      { name: 'Pandas', icon: 'https://cdn.simpleicons.org/pandas' },
      { name: 'NumPy', icon: 'https://cdn.simpleicons.org/numpy' },
      { name: 'Matplotlib', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg' },
      { name: 'Seaborn', icon: 'https://raw.githubusercontent.com/seaborn/seaborn.pydata.org/main/_images/logo-mark-lightbg.svg' },
      { name: 'Scikit-Learn', icon: 'https://cdn.simpleicons.org/scikit-learn' },
      { name: 'Leaflet', icon: 'https://cdn.simpleicons.org/leaflet' }
    ]
  },
  {
    title: 'Tech & Tools',
    items: [
      { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker' },
      { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel' },
      { name: 'Git', icon: 'https://cdn.simpleicons.org/git' },
      { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github' },
      { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux' },
      { name: 'Cisco CCNA', icon: 'https://cdn.simpleicons.org/cisco' }
    ]
  },
  {
    title: 'AI Engineering',
    items: [
      { name: 'Claude Code', icon: 'https://cdn.simpleicons.org/claude' },
      { name: 'Gemini API', icon: 'https://cdn.simpleicons.org/googlegemini' },
      { name: 'Antigravity', icon: 'https://cdn.simpleicons.org/googlegemini' },
      { name: 'Cursor', icon: 'https://cdn.simpleicons.org/cursor' },
      { name: 'Codex', icon: 'https://cdn.simpleicons.org/openai' }
    ]
  }
];
```

- [ ] **Step 2: Verify the codebase compiles**

Run: `npm run build` inside `portfolio/`
Expected: Compilation completes with no typescript or bundle errors.

- [ ] **Step 3: Commit the changes**

Run:
```bash
git add portfolio/src/pages/LandingPage.tsx
git commit -m "feat: update tech stack section with 4 new categories and external CDN logos"
```
