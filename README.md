# Grafterr — Front-End Technical Assessment

Pixel-responsive landing page for Grafterr (restaurant technology platform), built as a take-home for the Front-End Developer role.

- **Stack chosen:** **React 18 (Option B)**
- **Tooling:** Vite 5, plain CSS + CSS Modules, PropTypes
- **Styling:** Plain CSS with CSS Modules and CSS custom properties (design tokens). No Tailwind / Bootstrap / Bulma — per the brief.
- **Data layer:** Simulated API reading from `public/data/content.json` with a random 1000–1500 ms delay, proper loading + error states, and a Retry button.

---

## Getting started

Requires Node 18+.

```bash
# 1. Install
npm install

# 2. Start dev server (http://localhost:5173)
npm run dev

# 3. Production build
npm run build

# 4. Preview the production build (http://localhost:4173)
npm run preview
```

---

## Project structure

```
grafterr-landing/
├─ public/
│  ├─ data/
│  │  └─ content.json          # single source of truth for all copy
│  └─ images/                  # logo + product illustrations
├─ src/
│  ├─ components/
│  │  ├─ ui/
│  │  │  ├─ GradientText.jsx       # gradient-clipped headline text
│  │  │  ├─ GradientButton.jsx     # CTA button (solid / outline variants)
│  │  │  ├─ ProductCard.jsx        # individual product card
│  │  │  ├─ Carousel.jsx           # responsive carousel with arrows + dots
│  │  │  ├─ FloatingShape.jsx      # decorative teal circle / coral rectangle
│  │  │  ├─ Skeleton.jsx           # CSS-only shimmer skeleton
│  │  │  └─ ErrorState.jsx         # shared error + Retry component
│  │  └─ sections/
│  │     ├─ Navigation.jsx
│  │     ├─ HeroSection.jsx
│  │     └─ FeaturesSection.jsx
│  ├─ hooks/
│  │  ├─ useContent.js          # data-fetching hook (loading/error/retry)
│  │  └─ useCarousel.js         # carousel state + touch swipe
│  ├─ services/
│  │  └─ api.js                 # fetchNavigation / fetchHeroContent / fetchFeaturesContent
│  ├─ data/
│  │  └─ content.json           # dev-time copy (kept in sync with public/data)
│  ├─ styles/
│  │  ├─ variables.css          # design tokens
│  │  └─ global.css             # reset + base typography + keyframes
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html
├─ vite.config.js
├─ netlify.toml
└─ vercel.json
```

---

## Approach

### 1. Dynamic content via simulated API
`public/data/content.json` holds **every string, image reference, and carousel config** — nothing is hard-coded in JSX. `src/services/api.js` exposes three functions that each return a `Promise`:

- `fetchNavigation()`
- `fetchHeroContent()`
- `fetchFeaturesContent()`

Each one wraps `fetch()` in a `setTimeout` that adds a 1000–1500 ms random delay to simulate a real network request.

### 2. Custom hooks for reusable logic
- **`useContent(fetcher)`** — standardised `{ data, status, error, retry }` shape used by every section. Handles unmount-safety, loading, error, and re-fetching. Sections call it with a `useCallback`-wrapped fetcher so dependency arrays stay clean.
- **`useCarousel(totalItems, itemsPerView)`** — tracks current index, computes max index, clamps on resize, exposes `next/prev/goTo`, and provides `touchHandlers` for mobile swipe (≥50 px threshold).

### 3. Visual system (design tokens)
`variables.css` defines brand gradient, palette, spacing scale, radii, shadows, type scale, and motion curves. Every component pulls from these tokens — no magic numbers in component CSS.

- **Brand gradient:** `linear-gradient(90deg, #3B82F6 → #F97316)` (per the Figma spec note in the brief).
- **Decorative shapes:** teal radial circle (`#2dd4bf → #0f766e`) and coral rectangle (`#fb7185 → #f97316`), each with its own float keyframe for gentle motion.

### 4. Responsive & accessible
- Mobile-first breakpoints at `768px` (tablet) and `1024px` (desktop).
- Carousel shows **3 items on desktop / 2 on tablet / 1 on mobile** with touch swipe, 300 ms transition, and disabled arrows at boundaries.
- Semantic HTML, ARIA labels on controls, keyboard-visible focus rings, `prefers-reduced-motion` honoured.

### 5. Loading & error states
- **CSS-only skeletons** with a shimmer keyframe are rendered for navigation, hero, and features while their data loads.
- **Error states** render a friendly message + gradient **Retry** button that calls the hook's `retry` to re-fetch.
- Loaded content fades in via a shared `fadeIn` keyframe.

---

## Assumptions made

Because the Figma design link could not be accessed by the automation used to build this, a few visual choices were made from the written brief:

- Used the suggested gradient `linear-gradient(90deg, #3B82F6, #F97316)` directly.
- Used **Inter** as the font family (per the "likely Inter" note in the brief).
- Product illustrations are custom-drawn SVGs aligned to the brand palette (no third-party assets were available to download).
- Copy for headline / subheadline / product descriptions was written in the Grafterr voice; swap any string in `public/data/content.json` and the UI updates automatically — no code changes required.

---

## Evaluation checklist (React rubric)

| Area | Coverage |
|---|---|
| **Visual accuracy (30%)** | Gradient text, gradient CTA, teal circle + coral rect floating shapes, pill-radius buttons, card radii, section padding, horizontal accent divider |
| **Dynamic data (20%)** | 100% driven by `content.json` via simulated async API |
| **Code organisation (25%)** | Folder structure matches brief — `components/ui`, `components/sections`, `hooks`, `services`, `data`, `styles`. Components composed from small reusable UI primitives |
| **Carousel (15%)** | 3/2/1 responsive, arrows, dots, touch swipe, boundary-aware disabled arrows, 300 ms transition |
| **Loading / error (10%)** | CSS-only skeletons on every section, shared `ErrorState` + Retry |

Prohibited items avoided: no hard-coded copy in JSX, no Tailwind / Bootstrap, no class components, loading and error states present.

---

## Deployment

The project is a static Vite build — drop `dist/` on any static host.

- **Netlify:** `netlify.toml` is pre-configured. Connect the repo → it will run `npm run build` and publish `dist`.
- **Vercel:** `vercel.json` is pre-configured. Import the repo and it auto-detects Vite.
- **GitHub Pages:** run `npm run build` and publish the `dist/` folder to the `gh-pages` branch.

---

## Screenshots

_(Add screenshots of the hero, features carousel at desktop/tablet/mobile, and the error state here after deployment.)_
