<script>
	const { data } = $props();
	import PostListEntry from '$lib/components/PostListEntry.svelte';
</script>

<div class="max-w-6xl mx-auto px-4 py-12">
	<div>
		<h1 class="text-center text-4xl font-bold text-gray-900 mb-4">My Posts</h1>
		<ul>
			{#each data.posts as post}
				<PostListEntry {post} />
			{/each}
		</ul>
	</div>
</div>
