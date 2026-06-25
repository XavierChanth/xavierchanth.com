<script>
	const { series, currentSlug, currentTitle } = $props();

	const links = $derived.by(() => {
		if (!series) return [];

		const candidates = [
			{ label: 'First', post: series.first },
			{ label: 'Latest', post: series.latest },
			{ label: 'Previous', post: series.previous },
			{
				label: 'Current',
				post: {
					title: currentTitle,
					slug: currentSlug,
					index: series.index,
					date: ''
				},
				current: true
			},
			{ label: 'Next', post: series.next }
		];
		const linksBySlug = new Map();

		for (const candidate of candidates) {
			if (!candidate.post) continue;

			const existing = linksBySlug.get(candidate.post.slug);
			if (!existing || candidate.current) {
				linksBySlug.set(candidate.post.slug, candidate);
			}
		}

		return Array.from(linksBySlug.values()).sort((a, b) => a.post.index - b.post.index);
	});
</script>

{#if links.length}
	<nav
		aria-label={`${series.label} series navigation`}
		class="rounded-lg border border-slate-200 bg-white/70 p-4 shadow-sm shadow-slate-900/5"
	>
		<div class="flex items-center justify-between gap-4">
			<p class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
				More in the series
			</p>
			<a
				href={`/posts/series/${series.slug}`}
				class="shrink-0 text-sm font-semibold text-slate-600 transition hover:text-[rgb(var(--accent))]"
			>
				See full series
			</a>
		</div>
		<div class="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
			{#each links as { label, post, current }}
				{#if current}
					<div class="rounded-md border border-cyan-700/30 bg-cyan-50 px-4 py-3">
						<span class="block text-xs font-semibold uppercase tracking-[0.18em] text-cyan-900">
							Current - Pt. {post.index}
						</span>
						<span class="mt-1 block text-sm font-semibold text-slate-900">
							{post.title}
						</span>
					</div>
				{:else}
					<a
						href={`/posts/${post.slug}`}
						class="group rounded-md border border-slate-200 bg-white px-4 py-3 transition hover:border-cyan-700/30 hover:shadow-md"
					>
						<span class="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
							{label} - Pt. {post.index}
						</span>
						<span
							class="mt-1 block text-sm font-semibold text-slate-900 group-hover:text-[rgb(var(--accent))]"
						>
							{post.title}
						</span>
					</a>
				{/if}
			{/each}
		</div>
	</nav>
{/if}
