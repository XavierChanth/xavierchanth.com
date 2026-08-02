<script>
  /**
   * @typedef {import('../data/projects.js').Project} Project
   */

  /** @type {{ projects: Project[] }} */
  let { projects } = $props();
</script>

<ul class="site-list">
  {#each projects as project (project.links[0].href)}
    <li class="site-entry">
      <div class="site-entry-head">
        <h3 class="site-entry-title">
          {#each project.links as link, index (link.href)}
            {#if index > 0} &amp; {/if}
            <a href={link.href} rel="noopener noreferrer">{link.label}</a>
          {/each}
        </h3>
        <p class="site-meta">{project.context}</p>
      </div>
      <p class="site-muted site-small">{project.description}</p>
    </li>
  {/each}
</ul>
