# Quiet Editorial Site Design

## Status

Accepted

## Context

The site previously used a glass-and-card visual language: a fixed translucent navigation bar,
radial gradient washes, rounded cards with shadows, hover lift transitions, and pill-shaped tag and
series chips. It read as a product landing page rather than as a place someone writes.

A prototype was built under `/testing` to explore a quieter alternative, reviewed, and approved. The
prototype has now been promoted to the production homepage and posts archive, and `/testing` has
been removed.

## Decision

The site follows a single design thesis: **a writer who builds**. Writing is the primary surface;
work and open source are a compact, honest account rather than a portfolio grid.

The visual system, implemented in `src/lib/site/`:

- One responsive single-column measure (`--site-measure`, 44rem) on warm paper.
- Serif headings, sans-serif body, hairline rules between sections, one teal accent.
- Plain underlined text links with 44px touch targets and a visible focus outline.
- A static header and footer — no fixed or sticky chrome.
- A skip link and exactly one `<main>` landmark, owned by the root layout.

Explicitly excluded: cards, gradients, shadows, animations, sticky navigation, dark-mode toggle,
search, client-side filtering, pagination, newsletter, analytics, and new dependencies.

Taxonomy is present but restrained. Each archive entry lists its series (with part number) and tags
as plain underlined links in semantic lists, separated by middots. The archive also carries a
compact `Browse` section listing every series and tag with post counts, sourced from
`getSeriesSummaries()` and `getTagSummaries()`. The chronological archive stays visually primary.

## Content rules

Only user-confirmed public facts belong in `src/lib/site/data/`. No confidential customers, metrics,
architecture, product internals, or roadmap. Open-source descriptions follow each repository's own
public summary.

## Consequences

- `src/lib/site/` is shared, not route-specific, so a later article-reader redesign can reuse the
  same shell, components, and CSS.
- Typographic resets are scoped to `.site-shell` rather than `.site-root`, so routes that still
  render Tailwind Typography prose — the article reader, tag indexes, and series indexes — inherit
  the new shell without having their prose styles disturbed.
- The article reader, `src/lib/components/PostListEntry.svelte`, `TagList.svelte`, and
  `SeriesLabel.svelte` still use the older card styling. They are scheduled for a separate design
  pass and were deliberately left alone.
