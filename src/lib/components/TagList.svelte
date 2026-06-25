<script>
	const { tags } = $props();
</script>

{#if tags?.length}
	<ul class="flex flex-wrap gap-2">
		{#each tags as tag}
			<li>
				<a
					href={`/posts/tags/${tag.slug}`}
					class="inline-flex items-center rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 transition hover:border-cyan-700/40 hover:bg-cyan-50 hover:text-cyan-900"
				>
					{tag.label}
				</a>
			</li>
		{/each}
	</ul>
{/if}
