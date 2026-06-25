<script>
	const { series, currentSlug } = $props();

	const links = $derived.by(() => {
		if (!series) return [];

		const candidates = [
			{ label: 'First', post: series.first },
			{ label: 'Latest', post: series.latest },
			{ label: 'Previous', post: series.previous },
			{ label: 'Next', post: series.next }
		];
		const seen = new Set([currentSlug]);

		return candidates.filter(({ post }) => {
			if (!post || seen.has(post.slug)) return false;
			seen.add(post.slug);
			return true;
		});
	});
</script>

{#if links.length}
	<nav
		aria-label={`${series.label} series navigation`}
		class="rounded-lg border border-slate-200 bg-white/70 p-4 shadow-sm shadow-slate-900/5"
	>
		<p class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
			{series.label} Series
		</p>
		<div class="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
			{#each links as { label, post }}
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
			{/each}
		</div>
	</nav>
{/if}
