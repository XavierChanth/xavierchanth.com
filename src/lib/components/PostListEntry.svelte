<script>
	import SeriesLabel from '$lib/components/SeriesLabel.svelte';

	const { post } = $props();
</script>

<li>
	<article
		class="rounded-2xl border border-white/70 bg-white/80 p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-2xl"
	>
		<div class="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto]">
			<div class="space-y-3">
				<p class="text-xs uppercase tracking-[0.3em] text-slate-500">
					{post.author} - {post.date}
				</p>
				<h2 class="text-2xl transition md:text-3xl">
					<a href={`/posts/${post.slug}`} class="hover:text-[rgb(var(--accent))]">{post.title}</a>
				</h2>
				<p class="text-lg text-slate-600">{post.description}</p>
			</div>
			<div class="flex h-full flex-col items-end justify-between gap-4 self-stretch">
				{#if post.series}
					<SeriesLabel series={post.series} />
				{/if}
				<a
					href={`/posts/${post.slug}`}
					class="mt-auto inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-semibold text-slate-600 transition hover:text-[rgb(var(--accent))]"
				>
					Read post
					<span aria-hidden="true">-&gt;</span>
				</a>
			</div>
		</div>
	</article>
</li>
