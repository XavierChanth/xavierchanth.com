<script>
  /**
   * A horizontal row of plain text links with 44px touch targets.
   *
   * @typedef {{ label: string; href: string }} RowLink
   */

  /** @type {{ links: RowLink[]; label?: string; class?: string }} */
  let { links, label = undefined, class: className = "" } = $props();
</script>

<ul class="site-inline-links {className}" aria-label={label}>
  {#each links as link (link.href)}
    <li>
      <a
        href={link.href}
        target={link.href.startsWith("http") ? "_blank" : undefined}
        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {link.label}
      </a>
    </li>
  {/each}
</ul>
