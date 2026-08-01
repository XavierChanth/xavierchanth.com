<script>
  /**
   * The masthead of a single article: a way back to the archive, the title,
   * the lede, a plain byline, and the post's series and tags.
   *
   * It composes the shared quiet pieces rather than restating them, so an
   * article's taxonomy renders exactly like the archive's.
   *
   * @typedef {{ label: string; slug: string; index?: number }} PostSeries
   * @typedef {{ label: string; slug: string }} PostTag
   */

  import LinkRow from "$lib/site/components/LinkRow.svelte";
  import PostTaxonomy from "$lib/site/components/PostTaxonomy.svelte";
  import { formatDate } from "$lib/site/format.js";

  /**
   * @type {{
   *   title: string;
   *   description?: string;
   *   author: string;
   *   date: string;
   *   updated?: string;
   *   series?: PostSeries;
   *   tags?: PostTag[];
   * }}
   */
  let {
    title,
    description = undefined,
    author,
    date,
    updated = undefined,
    series = undefined,
    tags = [],
  } = $props();

  const backLink = [{ label: "← All posts", href: "/posts" }];
</script>

<header class="site-article-header">
  <LinkRow class="site-article-back" links={backLink} label="Breadcrumb" />

  <h1 class="site-article-title">{title}</h1>

  {#if description}
    <p class="site-article-lede">{description}</p>
  {/if}

  <p class="site-article-byline site-meta">
    {author} &middot;
    <time datetime={date}>{formatDate(date)}</time>
    {#if updated}
      &middot; Updated <time datetime={updated}>{formatDate(updated)}</time>
    {/if}
  </p>

  <PostTaxonomy {series} {tags} />
</header>
