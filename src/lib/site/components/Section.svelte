<script>
	/**
	 * A labelled landmark section with a small uppercase heading.
	 *
	 * @type {{
	 *   id: string;
	 *   title: string;
	 *   children: import('svelte').Snippet;
	 * }}
	 */
	let { id, title, children } = $props();
</script>

<section class="site-section" {id} aria-labelledby="{id}-title">
	<h2 class="site-section-title" id="{id}-title">{title}</h2>
	{@render children()}
</section>
