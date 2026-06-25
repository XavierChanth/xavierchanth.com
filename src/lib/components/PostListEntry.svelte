<script>
	import SeriesLabel from '$lib/components/SeriesLabel.svelte';
	import TagList from '$lib/components/TagList.svelte';

	const { post } = $props();
</script>

<li>
	<article
		class="group relative rounded-2xl border border-white/70 bg-white/80 p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-2xl"
	>
		<a
			href={`/posts/${post.slug}`}
			class="absolute inset-0 rounded-2xl"
			aria-label={`Read post: ${post.title}`}
		></a>
		<div class="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:grid-rows-[auto_1fr_auto]">
			<div
				class="relative z-10 flex flex-col items-end gap-2 md:col-start-2 md:row-span-2 md:row-start-1 md:self-start"
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
					<span class="group-hover:text-[rgb(var(--accent))]">{post.title}</span>
				</h2>
				<p class="text-lg text-slate-600">{post.description}</p>
			</div>
			<div
				class="pointer-events-none inline-flex size-10 shrink-0 items-center justify-center justify-self-end text-slate-500 transition group-hover:translate-x-1 group-hover:text-[rgb(var(--accent))] md:col-start-2 md:row-start-3"
				aria-hidden="true"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="size-6"
				>
					<path d="M5 12h14" />
					<path d="m12 5 7 7-7 7" />
				</svg>
			</div>
		</div>
	</article>
</li>
