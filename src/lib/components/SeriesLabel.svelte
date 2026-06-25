<script>
	const { series } = $props();
</script>

{#if series}
	<a
		href={`/posts/series/${series.slug}`}
		class="inline-flex items-center rounded-full border border-cyan-700/20 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-900 transition hover:border-cyan-700/40 hover:bg-cyan-100"
	>
		Series: {series.label}
		<span class="ml-1 normal-case tracking-normal">(pt. {series.index})</span>
	</a>
{/if}
