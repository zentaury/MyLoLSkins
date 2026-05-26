# Donation Button in Search Bar

**Date:** 2026-05-26  
**Status:** Approved

## Goal

Move the donation call-to-action from the dismissable `DonationBanner` card to a permanent `☕ Support` button placed at the start of the search bar row in the champions grid. This keeps the donation prompt always visible without occupying a separate section of the page.

## Layout

Desktop (flex-row):
```
[ ☕ Support ] [ Find Champion ............. ] [ Filter by Ownership ]
```

Mobile (flex-col): button stacks first, then inputs below.

## Changes

### `components/champions-grid.tsx`
- Add a `Button` (NextUI) as the first child of the search flex row.
- Button label: `☕ Support`, variant `flat`, color `warning`, `flex-shrink-0`.
- `onPress` handler: `document.getElementById("bmc-wbtn")?.click()` — triggers the existing BMC widget.
- Remove `<DonationBanner />` and its import.

### `components/donation-banner.tsx`
- Delete the file entirely. It has no other callers.

## Out of scope
- No changes to the BMC widget script loading (handled separately in `app/layout.tsx`).
- No changes to mobile breakpoints beyond the existing `flex-col sm:flex-row` on the search row.
