<script>
  import { formatDate } from "../data/format.js";

  /**
   * @typedef {{ slug: string; title: string; description: string; date: string }} PostSummary
   */

  /** @type {{ posts: PostSummary[] }} */
  let { posts } = $props();
</script>

<ol class="t-list">
  {#each posts as post (post.slug)}
    <li class="t-entry">
      <div class="t-entry-head">
        <h3 class="t-entry-title">
          <a href="/posts/{post.slug}">{post.title}</a>
        </h3>
        <p class="t-meta">
          <time datetime={post.date}>{formatDate(post.date)}</time>
        </p>
      </div>
      <p class="t-muted t-small">{post.description}</p>
    </li>
  {/each}
</ol>
