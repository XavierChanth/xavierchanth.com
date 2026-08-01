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

The tag index, the series index, and the error page now use the same system, which completes the
migration — every rendered route is quiet.

- `/posts/tags/[tagSlug]` and `/posts/series/[seriesSlug]` are `.site-shell` pages built from the
  shared `Section`, `LinkRow`, and `PostList`: an `h1` naming the term, a count-aware line, links
  back to `/posts` and to the matching archive `Browse` anchor, then the posts. Their loaders now
  return the same reduced, serializable post summaries the archive uses.
- Tags stay newest-first as `getTagPosts()` supplies them; the series index keeps the intentional
  part order from `getSeriesPosts()` and is never re-sorted by date.
- `PostTaxonomy` gained `excludeSeriesSlug` and `excludeTagSlug`, forwarded by `PostList`. A
  taxonomy index drops the term it is already about from every row while the rest of the taxonomy
  keeps working. Both default to undefined, so the homepage, archive, and article reader are byte
  for byte unchanged.
- `+error.svelte` is the same quiet shell: one `h1` (`Page not found` / `Something went wrong`), the
  status, and the loader-authored message — SvelteKit's terse defaults are replaced with plain copy
  and nothing from the underlying exception is rendered. Indexability moved into the root layout's
  single `robots` meta, which is `noindex,nofollow` whenever `page.status >= 400`, so no route has
  to emit a competing tag.

## Content rules

Only user-confirmed public facts belong in `src/lib/site/data/`. No confidential customers, metrics,
architecture, product internals, or roadmap. Open-source descriptions follow each repository's own
public summary.

## Consequences

- `src/lib/site/` is shared, not route-specific, so a later article-reader redesign can reuse the
  same shell, components, and CSS.
- Typographic resets are scoped to `.site-shell` rather than `.site-root`, so the article reader,
  which renders long-form prose, inherits the shell's tokens without having its rhythm flattened.
- The article reader has since had its own pass; see `adr/quiet-article-reader.md`.
- The old card taxonomy is retired: `src/lib/components/PostListEntry.svelte`, `TagList.svelte`, and
  `SeriesLabel.svelte` are deleted now that nothing references them, and `src/lib/components/` is
  gone. Every list of posts on the site comes from one component.
