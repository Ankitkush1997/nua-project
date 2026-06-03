# NuaCraft

A production-quality PDP built with React 18, TypeScript, SCSS Modules, and Vite.

## Setup

```bash
# Requires Node 18+
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
```

## Features

- **Image gallery** — thumbnail switching, hover zoom on desktop (CSS transform + mouse tracking), horizontal scroll + dot indicator on mobile
- **Variant selection** — colour swatches, size buttons with available / low-stock / sold-out states, quantity picker capped at stock level
- **URL-synced variants** — `?colour=…&size=…` makes the page deep-linkable; back/forward navigation works
- **Add to Cart** — async mock with ~20% simulated failure, loading / success / error button states
- **Cart persistence** — stored in `localStorage`, rehydrated on page load; item count shown in header
- **Product details accordion** — Description (open by default), Specifications table, Reviews
- **Responsive** — two-column grid on desktop (55/45), single column on mobile
- **Loading skeleton** — shimmer placeholder while the Fake Store API responds
- **Error state** — friendly message + retry button if the fetch fails

## Stack

| Concern             | Choice                                                    |
| ------------------- | --------------------------------------------------------- |
| Framework           | React 18 + hooks                                          |
| Language            | TypeScript                                                |
| Styles              | SCSS Modules + global SCSS                                |
| Build               | Vite                                                      |
| Routing / URL state | react-router-dom v6                                       |
| Global state        | Context API + `useReducer`                                |
| Data                | [Fake Store API](https://fakestoreapi.com) (product ID 3) |
| Persistence         | `localStorage`                                            |

## Project structure

```
src/
  components/
    ImageGallery/   # Gallery + zoom + thumbnails + dots
    ProductInfo/    # Price, swatches, sizes, qty, CTA
    ProductDetails/ # Accordion with description / specs / reviews
    Header/         # Sticky header with cart badge
  hooks/
    useProduct.ts       # Fetch from Fake Store API
    useVariantParams.ts # URL ↔ colour/size sync
    useAddToCart.ts     # Async mock with failure simulation
  stores/
    CartContext.tsx  # Cart reducer + localStorage sync
  data/
    productData.ts   # Static colours, sizes, specs, reviews, images
  pages/
    ProductPage.tsx  # Top-level layout: loading / error / content
  styles/
    _variables.scss  # Design tokens
    _reset.scss
    global.scss
  types/
    index.ts
```

## Design decisions

See [DECISIONS.md](./DECISIONS.md) for the full write-up.

**Short version:**

- Accordion over tabs — better on mobile, supports multiple open panels
- `useSearchParams` for variant state — URL is the source of truth, deep-linking is automatic
- Context API over Zustand/Redux — no external dependency needed for a single-page cart
