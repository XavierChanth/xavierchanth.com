<script>
  /**
   * @typedef {import('../data/work.js').WorkEntry} WorkEntry
   */

  /** @type {{ entries: WorkEntry[] }} */
  let { entries } = $props();
</script>

<ul class="t-list">
  {#each entries as entry (entry.org)}
    <li class="t-entry">
      <div class="t-entry-head">
        <h3 class="t-entry-title">{entry.org}</h3>
        <p class="t-meta">{entry.period}</p>
      </div>
      <p class="t-small">{entry.role}</p>
      <p class="t-muted t-small">{entry.summary}</p>
    </li>
  {/each}
</ul>
