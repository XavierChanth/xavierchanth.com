<script>
	import SeriesLabel from '$lib/components/SeriesLabel.svelte';
	import TagList from '$lib/components/TagList.svelte';

	const { post } = $props();
</script>

<li>
	<article
		class="rounded-2xl border border-white/70 bg-white/80 p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-2xl"
	>
		<div class="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:grid-rows-[auto_1fr_auto]">
			<div
				class="flex flex-col items-end gap-2 md:col-start-2 md:row-span-2 md:row-start-1 md:self-start"
			>
				{#if post.series}
					<SeriesLabel series={post.series} />
				{/if}
				<TagList tags={post.tags} />
			</div>
			<p class="text-xs uppercase tracking-[0.3em] text-slate-500 md:col-start-1 md:row-start-1">
				{post.author} - {post.date}
			</p>
			<div class="space-y-3 md:col-start-1 md:row-start-2">
				<h2 class="text-2xl transition md:text-3xl">
					<a href={`/posts/${post.slug}`} class="hover:text-[rgb(var(--accent))]">{post.title}</a>
				</h2>
				<p class="text-lg text-slate-600">{post.description}</p>
			</div>
			<a
				href={`/posts/${post.slug}`}
				class="inline-flex shrink-0 items-center justify-self-end gap-2 whitespace-nowrap text-sm font-semibold text-slate-600 transition hover:text-[rgb(var(--accent))] md:col-start-2 md:row-start-3"
			>
				Read post
				<span aria-hidden="true">-&gt;</span>
			</a>
		</div>
	</article>
</li>
