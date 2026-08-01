<script>
  /**
   * @typedef {import('../data/projects.js').Project} Project
   */

  /** @type {{ projects: Project[] }} */
  let { projects } = $props();
</script>

<ul class="t-list">
  {#each projects as project (project.href)}
    <li class="t-entry">
      <div class="t-entry-head">
        <h3 class="t-entry-title">
          <a href={project.href} rel="noopener noreferrer">{project.name}</a>
        </h3>
        <p class="t-meta">{project.context}</p>
      </div>
      <p class="t-muted t-small">{project.description}</p>
    </li>
  {/each}
</ul>
