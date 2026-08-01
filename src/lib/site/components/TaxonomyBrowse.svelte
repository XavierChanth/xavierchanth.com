<script>
  /**
   * A compact browse group: every tag or series summary as a restrained text
   * link with its post count, separated by middots.
   *
   * @typedef {{ label: string; slug: string; total: number }} TaxonomySummary
   */

  /**
   * @type {{
   *   id: string;
   *   title: string;
   *   basePath: string;
   *   items: TaxonomySummary[];
   * }}
   */
  let { id, title, basePath, items } = $props();
</script>

{#if items.length}
  <div class="site-browse-group">
    <h3 class="site-browse-title" {id}>{title}</h3>
    <ul class="site-browse-list site-small" aria-labelledby={id}>
      {#each items as item (item.slug)}
        <li>
          <a href="{basePath}/{item.slug}">{item.label}</a>
          <span class="site-count">({item.total})</span>
        </li>
      {/each}
    </ul>
  </div>
{/if}
