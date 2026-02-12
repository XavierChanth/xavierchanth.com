<script>
	const { post } = $props();
</script>

<li>
	<a
		href={`/posts/${post.slug}`}
		class="group block rounded-2xl border border-white/70 bg-white/80 p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-2xl"
	>
		<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
			<div class="space-y-3">
				<p class="text-xs uppercase tracking-[0.3em] text-slate-500">
					{post.author} - {post.date}
				</p>
				<h2 class="text-2xl md:text-3xl group-hover:text-[rgb(var(--accent))] transition">
					{post.title}
				</h2>
				<p class="text-lg text-slate-600">{post.description}</p>
			</div>
			<span
				class="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-semibold text-slate-600 group-hover:text-[rgb(var(--accent))] transition"
			>
				Read post
				<span aria-hidden="true">-&gt;</span>
			</span>
		</div>
	</a>
</li>
