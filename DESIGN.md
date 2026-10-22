---
version: alpha
colors:
  bg:
    value: "#020617"
  ink:
    value: "#e5eefc"
  muted:
    value: "#9fb0cf"
  panel:
    value: "#10192b"
  line:
    value: "rgba(0, 229, 255, 0.18)"
  cyan:
    value: "#00e5ff"
  purple:
    value: "#8b5cf6"
  orange:
    value: "#ff7849"
typography:
  sans:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
rounded:
  DEFAULT:
    value: "8px"
components:
  productCard:
    radius: "8px"
    border: "var(--line)"
  modal:
    radius: "8px"
    background: "linear-gradient(145deg, rgba(16, 25, 43, 0.92), rgba(5, 7, 13, 0.9))"
---

## Overview

The KZ Audio Store uses a dark gaming-tech identity for premium audio products: graphite surfaces, cyan glow, purple energy accents, and orange warning/action details. The product UI should feel like gaming hardware and high-end portable audio, not a generic marketplace.

The current runtime token owner is [app/globals.css](app/globals.css). This file documents the accepted visual direction and does not replace the CSS variables.

## Colors

Keep the existing dark background, cyan, purple, blue, and orange accent system. Do not import external reference-site colors. Product presentation can become cleaner and more image-led, but the palette must remain the current gaming-tech palette.

## Typography

Use the current Inter/system sans stack. Headings may use uppercase, tight hierarchy, and strong weight where the current storefront already does. Body copy should stay readable and direct.

## Layout

Storefront pages use broad sections, product-first grids, and stable media containers. Product listing cards should show only discovery-level information. Product details and checkout can use denser two-column layouts on desktop and single-column flows on mobile.

## Elevation & Depth

Use glassy dark panels, subtle cyan borders, and restrained glow for interactive emphasis. Avoid adding new decorative color systems or unrelated shadow styles.

## Shapes

Cards and controls use the existing 8px radius family with occasional angular card treatment already present in the storefront.

## Components

Product cards are minimal discovery objects: large image, product name, price, and only important stock alerts. Product details own the description, specifications, gallery, quantity, and add-to-cart controls. Cart and checkout use the same panel, border, focus, and status language as the storefront.

## Do's and Don'ts

Do preserve the current gaming-tech palette. Do prioritize large product imagery and clear purchase actions. Do respect reduced motion.

Do not copy another site's colors, typography, or full theme. Do not show long descriptions, specs, or normal stock counts on listing cards.
