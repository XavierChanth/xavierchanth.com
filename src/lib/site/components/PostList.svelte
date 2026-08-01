<script>
  import PostTaxonomy from "$lib/site/components/PostTaxonomy.svelte";
  import { formatDate } from "$lib/site/format.js";

  /**
   * @typedef {{ label: string; slug: string; index?: number }} PostSeries
   * @typedef {{ label: string; slug: string }} PostTag
   * @typedef {{
   *   slug: string;
   *   title: string;
   *   description: string;
   *   date: string;
   *   series?: PostSeries;
   *   tags?: PostTag[];
   * }} PostSummary
   */

  /**
   * `taxonomy` is opt-in: the homepage keeps its five latest posts bare, while
   * the archive shows each post's series and tags.
   *
   * @type {{ posts: PostSummary[]; taxonomy?: boolean }}
   */
  let { posts, taxonomy = false } = $props();
</script>

<ol class="site-list">
  {#each posts as post (post.slug)}
    <li class="site-entry">
      <div class="site-entry-head">
        <h3 class="site-entry-title">
          <a href="/posts/{post.slug}">{post.title}</a>
        </h3>
        <p class="site-meta">
          <time datetime={post.date}>{formatDate(post.date)}</time>
        </p>
      </div>
      <p class="site-muted site-small">{post.description}</p>
      {#if taxonomy}
        <PostTaxonomy series={post.series} tags={post.tags} />
      {/if}
    </li>
  {/each}
</ol>
