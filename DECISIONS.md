# DECISIONS.md

## Architectural decision: Tabs vs Accordion for product details

The spec left this open. I went with an **accordion** rather than tabs.

**Options considered:**

- *Tabs* keep all panel labels visible at once and are familiar from e-commerce conventions. They work well when panels are short and users want to compare content at a glance.
- *Accordion* collapses panels vertically, which works better on mobile where horizontal tab bars either wrap awkwardly or require horizontal scrolling. It also lets multiple sections stay open simultaneously, which is useful when a buyer wants to read the description *and* check the specs without losing their place.

Given that this is a mobile-first PDP with three moderately-long panels (especially the specs table), the accordion was the more pragmatic call. The Description panel opens by default so users are never greeted by a blank panel.

---

## Architectural decision: URL params vs local state for variant selection

The spec required the selected colour and size to be deep-linkable. Two options:

- *React `useState` + manual `history.replaceState`* — lighter, but fiddly to keep in sync.
- *`useSearchParams` from react-router-dom* — reads and writes the URL as the source of truth; deep-linking is automatic; back/forward navigation works correctly.

I chose `useSearchParams` via a custom `useVariantParams` hook that collocates all variant logic (deriving sold-out state, max quantity, URL writes) in one place. The trade-off is pulling in react-router-dom for what is effectively a single page, but the dependency is lightweight and the URL behaviour is correct without any manual syncing.

---

## Open questions from the spec

**1. Zoom on hover (desktop):** I implemented a CSS `transform: scale(1.75)` zoom that follows the mouse cursor position using CSS custom properties (`--zoom-x`, `--zoom-y`) updated via `onMouseMove`. This avoids loading a separate zoom library and keeps the interaction native and snappy. Clicking toggles zoom; moving the mouse pans the zoomed image; leaving the image resets it.

**2. Tabs vs accordion:** Covered above — went with accordion.

**3. Delivery estimate:** Shown conditionally — only after a size has been selected and the variant is not sold out. Showing it unconditionally felt misleading (you can't ship a product without a size selection), and hiding it entirely would miss a conversion-driving detail.

---

## What I would clean up with more time

- **Tests:** I'd add Vitest unit tests for `useVariantParams` (sold-out disables CTA, low-stock shows label, qty is capped at `maxQty`) and an integration test for the cart reducer (ADD merges duplicates, REMOVE works correctly).
- **Cart drawer:** Right now the cart button in the header shows a count but there's no drawer or cart page. That's the most visible missing UX piece.
- **Image handling:** The product images are sourced from Unsplash rather than the Fake Store API, which only provides single images per product. I'd either compose multiple views from the same API product data or wire up a proper image CDN in production.
- **Accessibility audit:** I added `aria-label` attributes throughout but haven't run an axe or screen-reader pass. The colour swatches in particular warrant a more thorough accessible name strategy.
- **Error boundary:** The async `addToCart` failure is handled locally with a status flag, but a React error boundary around the whole page would catch unexpected render errors more gracefully.
