# Checkout / Create Order Reference

Use the Nyvrix Store checkout experience as a reference for how the
Create Order / Checkout flow should be structured and how the cart/order
summary should be presented.

Reference:

[Nyvrix Store Checkout](https://www.nyvrix.com/checkouts/cn/hWNG9Nc3ZiN09wypiS1xugMt/en-eg?_r=AQABf5WWk-QWXkiJ1NF5NwksSK1u8CcYwkBxEtEkQTRmCwY)

IMPORTANT:

Do not copy the Nyvrix Store color palette, branding, typography, or
overall visual identity.

Keep the current website's existing gaming + high-tech color palette
and visual identity.

Use the reference only for:

- Checkout information hierarchy
- Cart item presentation
- Order summary organization
- Customer information flow
- Delivery information flow
- Checkout usability
- Clear progression from cart to order creation
- Clear totals and final confirmation

## Required Checkout Structure

The checkout should have a clear flow:

1. Cart / Order Summary
2. Customer Information
3. Delivery Information
4. Optional Order Notes
5. Final Order Summary
6. Place Order Request
7. Order Success / Confirmation

## Cart / Order Summary

Each product should display:

- Product image
- Product name
- Selected quantity
- Unit price
- Item total

The summary should make it easy for the user to understand exactly
what they are ordering.

Use a clean layout with clear visual separation between products.

Do not show unnecessary technical information.

## Customer Information

Collect the existing required customer information in a clear section.

Recommended hierarchy:

CUSTOMER INFORMATION

- Full Name
- Phone Number / WhatsApp

Use clear labels and inline validation.

## Delivery Information

Clearly separate delivery details from customer details.

Use the existing address data structure and backend fields unless a
schema change is absolutely necessary.

Do not introduce new required backend fields just for visual redesign.

## Order Notes

Provide an optional section for:

- Delivery instructions
- Special requests
- Other customer notes

## Pricing Summary

Clearly show:

- Subtotal
- Delivery information/message
- Final order total

If delivery fees are not currently calculated by the backend, do not
pretend that a final delivery fee is known.

Instead clearly communicate that delivery details or fees will be
confirmed after order review if that matches the existing business flow.

## Final CTA

Use a strong, clear action such as:

PLACE ORDER REQUEST

Near the CTA, clearly explain the current order process.

Example:

"Your order will be reviewed and confirmed with you before delivery and payment."

Do not make the checkout appear to be an online payment checkout if the
existing system does not currently process online payments.

## Checkout UX Requirements

Implement:

- Clear step hierarchy
- Inline validation
- Required field indicators
- Helpful error messages
- Loading state during order creation
- Double-submit prevention
- Disabled submit button while processing
- Clear success state
- Order/request ID when available
- Clear explanation of what happens after the order is submitted
- Continue Shopping action

## Responsive Behavior

Desktop:

- Use a clear checkout layout.
- Keep the order summary visible where appropriate.

Mobile:

- Optimize the checkout for vertical flow.
- Keep the order summary easy to access.
- Ensure fields and buttons have comfortable touch targets.
- Do not make the user scroll unnecessarily between important information.

## Theme Requirement

The Nyvrix reference is for checkout UX and information organization only.

Keep the current website's:

- Existing color palette
- Gaming + high-tech theme
- Accent colors
- Typography direction
- Buttons
- Hover states
- Glow effects
- Overall visual identity
