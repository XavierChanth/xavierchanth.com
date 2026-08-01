<script>
  /**
   * @typedef {import('../data/work.js').WorkEntry} WorkEntry
   */

  /** @type {{ entries: WorkEntry[] }} */
  let { entries } = $props();
</script>

<ul class="site-list">
  {#each entries as entry (entry.org)}
    <li class="site-entry">
      <div class="site-entry-head">
        <h3 class="site-entry-title">{entry.org}</h3>
        <p class="site-meta">{entry.period}</p>
      </div>
      <p class="site-small">{entry.role}</p>
      <p class="site-muted site-small">{entry.summary}</p>
    </li>
  {/each}
</ul>
