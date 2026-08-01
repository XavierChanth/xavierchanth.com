# Quiet Article Reader

## Status

Accepted

## Context

`adr/quiet-editorial-design.md` promoted the quiet editorial system to the homepage and the posts
archive, and explicitly deferred the article reader. Until now `/posts/[slug]` still rendered the
old language: an uppercase author/date band, chip-style tags, Tailwind Typography prose, a
site-wide dark `prism-okaidia` code theme, a tinted italic blockquote panel, and a four-card series
grid.

The repository's actual posts set the requirements: 133 to 3,523 words, 54 shell blocks in a single
post, `h2`/`h3`/`h4` hierarchies, headings written as `## **Heading**`, three-deep nested lists,
long inline paths and flags, light-UI screenshots, blockquotes, and one four-part series.

## Decision

The reader is a restrained long-form surface built from the same tokens as the rest of the site.

- `src/lib/site/styles/article.css` is imported only by the post route and scopes every selector
  under `.site-article`. Post markdown is unclassed, so unscoped element rules would leak site-wide.
- The article takes the shared `--site-measure` and gutters but is **not** a `.site-shell` child:
  the shell's element resets flatten prose rhythm.
- `ArticleHeader.svelte` composes the existing `LinkRow`, `PostTaxonomy`, and `formatDate` so an
  article's taxonomy and dates read exactly like the archive's, with semantic `<time datetime>` and
  an optional Updated date.
- `SeriesNav.svelte` replaces the card grid with hairline-separated text: a small label linking the
  series with its part number, Previous and Next titles in opposing columns above 40rem, and a link
  to the full series. First / Latest / Current were dropped — they duplicated the same few links.
- `prism-okaidia` is gone from `src/app.css`. Code blocks sit on a slightly deeper paper
  (`rgb(242 238 231)`) with a hairline border, scroll horizontally, and use a token palette tuned
  for that surface: muted comments and punctuation, olive strings, rust numbers, teal keywords and
  builtins, ink-weighted functions and properties.
- Blockquotes are upright muted text behind a 2px teal-tinted rule; the tinted rounded panel and
  its `.prose-post` rules are removed.

Explicitly excluded, in line with the parent ADR: reading time, heading anchors, a table of
contents, dark mode, share or reaction controls, sticky chrome, new dependencies, and any
client-side JavaScript. Loaders, the post data model, prerender entries, series aliases, and all SEO
and JSON-LD markup are unchanged.

## Consequences

- `src/lib/components/SeriesNavigation.svelte` is deleted; nothing referenced it after the
  migration. `TagList`, `SeriesLabel`, and `PostListEntry` stay because the tag and series index
  pages still render them.
- Prism styling now ships in the post route's own CSS chunk, so `/`, `/posts`, and the taxonomy
  indexes no longer download a code theme they never use.
- Only code blocks scroll sideways; the page itself holds at 320px.
