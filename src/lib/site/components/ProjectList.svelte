<script>
  /**
   * @typedef {import('../data/projects.js').Project} Project
   */

  /** @type {{ projects: Project[] }} */
  let { projects } = $props();
</script>

<ul class="site-list">
  {#each projects as project (project.href)}
    <li class="site-entry">
      <div class="site-entry-head">
        <h3 class="site-entry-title">
          <a href={project.href} rel="noopener noreferrer">{project.name}</a>
        </h3>
        <p class="site-meta">{project.context}</p>
      </div>
      <p class="site-muted site-small">{project.description}</p>
    </li>
  {/each}
</ul>
