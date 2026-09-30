# StoryRail — Accessible Carousel Interaction Lab

StoryRail modernizes the repository's original 2023 Create React App + Swiper exercise into a focused interaction-engineering portfolio project.

The original version rendered a small set of externally hosted food images with a coverflow effect, logged Swiper internals to the console, shipped the default CRA README and boilerplate tests, and had no explicit state or accessibility story beyond Swiper defaults.

## Why this project exists

Carousels look simple, but they combine responsive layout, pointer gestures, keyboard behavior, focus visibility, active-slide state, motion preferences, and deep-link expectations. StoryRail treats those concerns as the product scope instead of turning a small UI exercise into a fake full-stack application.

## Modernization summary

- Create React App → Vite
- React 18 → React 19
- Swiper 10 → Swiper 14
- remote stock images → local CSS-generated visual system
- duplicated mock JSON → explicit story data model
- console callbacks → controlled active-story state
- decorative coverflow → readable responsive card rail
- implicit state → pure URL/category/story state policy
- default CRA test → Vitest + Testing Library coverage
- no CI → PR quality workflow
- no deployment workflow → GitHub Pages workflow
- CRA boilerplate README/assets → project-specific documentation and cleanup

## Features

- responsive 1 / 2 / 3-card density
- touch and pointer swiping through Swiper
- previous/next controls
- clickable pagination
- keyboard navigation
- Swiper A11y messages
- visible focus treatment
- category filtering
- active slide counter
- query-string deep links for category and story
- deterministic recovery from invalid URL state
- no autoplay
- reduced-motion CSS policy
- fully local content with no image CDN dependency

## Architecture

```text
src/data/stories.js
        │
        ├──────────────► src/lib/carouselState.js
        │                  ├─ category normalization
        │                  ├─ filtering
        │                  ├─ active-story recovery
        │                  └─ URL serialization
        │
        ▼
src/components/StoryRail.jsx
        ├─ React interaction state
        ├─ Swiper adapter
        ├─ URL synchronization
        └─ semantic card rendering
        │
        ▼
Swiper
        ├─ touch/pointer movement
        ├─ keyboard
        ├─ navigation
        ├─ pagination
        └─ accessibility announcements
```

The state policy is intentionally kept outside the Swiper component so URL recovery and filtering behavior can be tested without a browser layout engine.

## State flow

```text
window.location.search
        ↓
readCarouselState()
        ↓
category + active story
        ↓
filterStories()
        ↓
StoryRail React state
        ↓
Swiper active index
        ↓
onSlideChange
        ↓
writeCarouselState()
        ↓
history.replaceState()
```

Changing category resets to the first valid story in that category. Invalid category or story values recover to deterministic defaults.

## Accessibility and motion

- Swiper's A11y and Keyboard modules are enabled.
- Navigation controls have explicit previous/next messages.
- Filter buttons use `aria-pressed`.
- Slide cards use semantic article and heading structure.
- Focus-visible styles do not depend on hover.
- There is no autoplay, so content never advances without user intent.
- `prefers-reduced-motion: reduce` suppresses decorative animation and smooth scrolling.

## Security and privacy

StoryRail has no backend, authentication, form submission, localStorage persistence, analytics, or secrets.

User-controlled HTML is not rendered. Carousel state comes only from a constrained category list and known story identifiers. URL state is normalized before it influences the visible collection.

No API keys, passwords, or tokens are required.

## Local development

Requirements:

- Node.js 22+
- npm

```bash
npm install
npm run dev
```

## Tests

```bash
npm test
```

The suite covers category normalization, filtering, active-story recovery, query-string read/write behavior, preservation of unrelated query parameters, default UI rendering, category interaction, and URL synchronization.

## Production build

```bash
npm run build
npm run preview
```

Run the complete quality gate:

```bash
npm run check
```

## CI

`.github/workflows/quality.yml` runs on pull requests and pushes to `main`:

```text
npm install → syntax check → Vitest → Vite production build
```

A red quality workflow is treated as a merge blocker for this repository workflow.

## Deployment

StoryRail is compatible with GitHub Pages.

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Run **Actions → Deploy Pages → Run workflow**.

The Vite base path changes only when `DEPLOY_TARGET=github-pages` is present.

## Scope and limitations

StoryRail intentionally does not include:

- a backend or database
- authentication
- analytics
- remote CMS content
- autoplay
- fake shopping/product flows
- custom gesture physics that duplicate Swiper

The project is a bounded React interaction lab, not a production content platform.

## License

No license file is currently present in the original repository. Add one only after choosing the license you want to apply to the project.
