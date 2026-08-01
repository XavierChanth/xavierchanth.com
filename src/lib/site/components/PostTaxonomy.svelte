<script>
  /**
   * Quiet taxonomy line for a post entry: the series it belongs to (with its
   * part number when known) followed by its tags. Plain underlined text links
   * in semantic lists — no chips, pills, or colour coding.
   *
   * @typedef {{ label: string; slug: string; index?: number }} PostSeries
   * @typedef {{ label: string; slug: string }} PostTag
   */

  /** @type {{ series?: PostSeries; tags?: PostTag[] }} */
  let { series = undefined, tags = [] } = $props();
</script>

{#if series || tags.length}
  <div class="site-taxonomy site-meta">
    {#if series}
      <ul class="site-taxonomy-list" aria-label="Series">
        <li>
          <a href="/posts/series/{series.slug}">
            {series.label}{series.index ? ` — part ${series.index}` : ""}
          </a>
        </li>
      </ul>
    {/if}
    {#if tags.length}
      <ul class="site-taxonomy-list" aria-label="Tags">
        {#each tags as tag (tag.slug)}
          <li><a href="/posts/tags/{tag.slug}">{tag.label}</a></li>
        {/each}
      </ul>
    {/if}
  </div>
{/if}
