<script>
	/**
	 * Quiet series navigation for the article reader.
	 *
	 * Only the two moves a reader actually wants at the end of a part are
	 * offered — the previous part, the next part, and the full series — as plain
	 * text under a hairline. First / Latest / Current were dropped: they
	 * duplicated the same handful of links and read as a card grid.
	 *
	 * @typedef {{ title: string; slug: string; index: number }} SeriesReference
	 * @typedef {{
	 *   label: string;
	 *   slug: string;
	 *   index: number;
	 *   total: number;
	 *   previous?: SeriesReference;
	 *   next?: SeriesReference;
	 * }} PostSeries
	 */

	import LinkRow from '$lib/site/components/LinkRow.svelte';

	/** @type {{ series: PostSeries }} */
	let { series } = $props();

	const steps = $derived(
		[
			{ direction: 'previous', label: 'Previous', post: series.previous },
			{ direction: 'next', label: 'Next', post: series.next }
		].filter((step) => step.post)
	);

	const seriesHref = $derived(`/posts/series/${series.slug}`);
</script>

<nav class="site-article-series" aria-label="{series.label} series">
	<p class="site-article-series-label">
		<a href={seriesHref}>{series.label}</a> &middot; Part {series.index} of {series.total}
	</p>

	{#if steps.length}
		<ul class="site-article-series-links">
			{#each steps as step (step.direction)}
				<li class="site-article-series-link" data-direction={step.direction}>
					<span class="site-article-series-direction">{step.label}</span>
					<span class="site-article-series-title">
						<a href="/posts/{step.post?.slug}">{step.post?.title}</a>
					</span>
				</li>
			{/each}
		</ul>
	{/if}

	<LinkRow links={[{ label: 'All posts in this series', href: seriesHref }]} />
</nav>
