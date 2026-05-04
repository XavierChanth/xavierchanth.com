# Mailing List

## Status

Deferred

## Context

The blog may benefit from a mailing list so readers can subscribe to new posts. The site is a
static SvelteKit blog, so the mailing list should avoid adding unnecessary operational burden.

The main options considered were:

- A hosted newsletter service such as Buttondown, beehiiv, Kit, or Mailchimp.
- A custom implementation using Resend and Convex.

## Option 1: Hosted Newsletter Service

Hosted newsletter tools provide most of the product surface out of the box:

- Signup forms
- Subscriber management
- Double opt-in
- Unsubscribe handling
- Email templates
- Broadcast sending
- Deliverability defaults
- Archives and analytics

Buttondown is the strongest fit for a personal technical blog because it is simple,
Markdown-friendly, privacy-focused, and inexpensive for small lists.

The downside is that it adds another external SaaS product and may feel less integrated with the
site over time.

## Option 2: Resend and Convex

A lightweight custom mailing list could be built with Resend and Convex at low scale.

Convex would store:

- Subscribers
- Confirmation tokens
- Subscription status
- Unsubscribe state
- Post send records
- Optional preferences

Resend would handle:

- Confirmation emails
- New post announcements
- One-click unsubscribe links
- Bounce and complaint webhooks

A minimal implementation would include:

- A subscribe form on the site
- A Convex mutation or action to create a pending subscriber
- A double opt-in confirmation email through Resend
- A confirmation route to activate the subscriber
- A one-click unsubscribe route
- A manual send action for announcing new posts

Automation from RSS or post frontmatter can be added later if manual sends become tedious.

## Tradeoffs

Using Resend and Convex is likely cost-effective at a small scale and keeps the mailing list closely
integrated with the site. It also avoids adding a separate newsletter platform.

The cost is ownership. A custom implementation must handle the pieces that newsletter tools already
provide, including:

- Double opt-in correctness
- Unsubscribe compliance
- Suppression handling
- Bounce and complaint processing
- Preview and test sends
- Basic analytics
- Operational safety around accidental duplicate sends

For a personal blog, the custom path should stay intentionally small. It should not become a full
newsletter CMS until there is clear need.

## Recommendation

If the goal is the fastest reliable path, use Buttondown.

If the goal is to keep the mailing list integrated with the site and own the subscription workflow,
build the minimal Resend and Convex version:

1. Store subscribers in Convex.
2. Use double opt-in.
3. Send emails through Resend.
4. Support one-click unsubscribe from the beginning.
5. Start with manual post announcements.

## Decision

No implementation decision yet. Revisit when ready to add the subscription UI and choose between a
hosted provider and the Resend plus Convex implementation.
