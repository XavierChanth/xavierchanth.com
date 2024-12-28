<script>
	const { post } = $props();
</script>

<li class="my-4">
	<div
		class="border border-slate-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-50 hover:bg-white"
	>
		<a href={`/posts/${post.slug}`} class="block rounded p-6">
			<div class="grid grid-cols-5 gap-4">
				<div class="col-span-2">
					<h2 class="text-2xl font-semibold text-slate-900 mb-2">{post.title}</h2>
					<p class="text-sm text-slate-600">{post.author} - {post.date}</p>
				</div>
				<div class="col-span-3">
					<p class="text-lg text-slate-700">{post.description}</p>
				</div>
			</div>
		</a>
	</div>
</li>
