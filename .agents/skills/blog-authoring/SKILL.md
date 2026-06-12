---
name: blog-authoring
description: Use for repo-specific blog post format and publishing rules for xavierchanth.com. Defines where posts live, required frontmatter, slug and visibility behavior, asset paths, Markdown constraints, and validation commands. Use the content-creation skill for the actual author-led writing process.
---

# Blog Authoring

This skill defines how blog posts in `xavierchanth.com` are represented in the repo. It covers
post file location, frontmatter, slug behavior, visibility, assets, Markdown compatibility, and
pre-publish checks.

Use the `content-creation` skill for the actual writing workflow: gathering author input,
developing an outline, drafting section by section, proposing edits, and completing the piece under
author control.

## Post Location

- Posts live in `src/posts/*.md`.
- Choose the filename carefully because it controls the post slug.
- The slug comes from the Markdown filename because the loader strips the `.md` extension from the
  path.

## Frontmatter

Posts in this repo use this frontmatter shape:

```md
---
title: 'Post Title'
description: 'Short summary for listings and metadata.'
author: 'Xavier Chanthavong'
date: 'YYYY-MM-DD'
published: true
---
```

Required fields:

- `title`
- `description`
- `author`
- `date`
- `published`

## Visibility

- Only posts with `published: true` appear in the posts index and RSS feed.
- For drafts or work-in-progress posts, keep `published: false` until the post is ready to surface
  publicly.

## Assets

- Put post-specific images in `static/assets/posts`.
- Reference post assets from Markdown with root-relative paths such as
  `/assets/posts/example.png`.

## Markdown

Use standard mdsvex-compatible Markdown:

- headings
- paragraphs and lists
- fenced code blocks
- links
- inline images when needed

Keep formatting straightforward and portable. Do not rely on custom Svelte component usage unless
the task clearly requires it.

## Pre-Publish Checklist

- Frontmatter is complete and correctly formatted.
- Filename matches the intended slug.
- `published` is set appropriately for the desired visibility.
- Asset files live under `static/assets/posts` and use valid paths.
- Links look intentional and are worth keeping.
- If dependencies are installed, optionally run `bun run dev`, `bun run check`, or
  `bun run build`.
- If dependencies are missing, note that validation is blocked rather than guessing.

## Exclusions

Do not use this skill for:

- the actual prose-writing workflow, which belongs to `content-creation`
- general SvelteKit implementation guidance
- repo-wide formatting or tooling rules already covered by `AGENTS.md`
- generic writing advice that is not specific to this site's blog publishing format
