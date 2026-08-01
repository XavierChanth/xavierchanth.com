<script>
  /**
   * Quiet taxonomy line for a post entry: the series it belongs to (with its
   * part number when known) followed by its tags. Plain underlined text links
   * in semantic lists — no chips, pills, or colour coding.
   *
   * `excludeSeriesSlug` and `excludeTagSlug` let a taxonomy index suppress the
   * term the page is already about — a tag page should not repeat its own tag
   * under every post, and a series page should not repeat its own label — while
   * keeping the rest of the taxonomy useful. Both default to undefined, so the
   * homepage, archive, and article reader are unaffected.
   *
   * @typedef {{ label: string; slug: string; index?: number }} PostSeries
   * @typedef {{ label: string; slug: string }} PostTag
   */

  /**
   * @type {{
   *   series?: PostSeries;
   *   tags?: PostTag[];
   *   excludeSeriesSlug?: string;
   *   excludeTagSlug?: string;
   * }}
   */
  let {
    series = undefined,
    tags = [],
    excludeSeriesSlug = undefined,
    excludeTagSlug = undefined,
  } = $props();

  const shownSeries = $derived(
    series && series.slug !== excludeSeriesSlug ? series : undefined,
  );
  const shownTags = $derived(tags.filter((tag) => tag.slug !== excludeTagSlug));
</script>

{#if shownSeries || shownTags.length}
  <div class="site-taxonomy site-meta">
    {#if shownSeries}
      <ul class="site-taxonomy-list" aria-label="Series">
        <li>
          <a href="/posts/series/{shownSeries.slug}">
            {shownSeries.label}{shownSeries.index
              ? ` — part ${shownSeries.index}`
              : ""}
          </a>
        </li>
      </ul>
    {/if}
    {#if shownTags.length}
      <ul class="site-taxonomy-list" aria-label="Tags">
        {#each shownTags as tag (tag.slug)}
          <li><a href="/posts/tags/{tag.slug}">{tag.label}</a></li>
        {/each}
      </ul>
    {/if}
  </div>
{/if}
