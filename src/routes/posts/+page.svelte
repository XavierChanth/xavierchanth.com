<script>
	const { data } = $props();
	import PostListEntry from '$lib/components/PostListEntry.svelte';
	import { BLOG_DESCRIPTION, BLOG_TITLE, BLOG_URL } from '$lib/metadata';

	const canonical = `${BLOG_URL}/posts`;
</script>

<svelte:head>
	<title>Blog Posts - {BLOG_TITLE}</title>
	<meta name="description" content={`Posts from ${BLOG_TITLE}. ${BLOG_DESCRIPTION}`} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={`Blog Posts - ${BLOG_TITLE}`} />
	<meta property="og:description" content={`Posts from ${BLOG_TITLE}. ${BLOG_DESCRIPTION}`} />
	<meta property="og:url" content={canonical} />

	<meta name="twitter:title" content={`Blog Posts - ${BLOG_TITLE}`} />
	<meta name="twitter:description" content={`Posts from ${BLOG_TITLE}. ${BLOG_DESCRIPTION}`} />
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-16 lg:py-20">
	<div class="text-center space-y-4">
		<p class="text-xs uppercase tracking-[0.35em] text-slate-500">Writing</p>
		<h1 class="text-4xl sm:text-5xl">Notes from the lab</h1>
		<p class="mx-auto max-w-2xl text-lg text-slate-600">
			Deep dives, practical notes, and discoveries along the way.<br />New posts show up as soon as
			they ship.
		</p>
	</div>
	<ul class="mt-10 space-y-6">
		{#each data.posts as post}
			<PostListEntry {post} />
		{/each}
	</ul>
</div>
