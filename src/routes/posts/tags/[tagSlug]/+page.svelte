<script>
	// @ts-nocheck

	import PostListEntry from '$lib/components/PostListEntry.svelte';
	import { BLOG_DESCRIPTION, BLOG_TITLE, BLOG_URL } from '$lib/metadata';

	const { data } = $props();
	const canonical = $derived(`${BLOG_URL}/posts/tags/${data.tag.slug}`);
	const title = $derived(`${data.tag.label} Posts - ${BLOG_TITLE}`);
	const description = $derived(`Posts tagged ${data.tag.label}. ${BLOG_DESCRIPTION}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />

	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-16 lg:py-20">
	<div class="text-center space-y-4">
		<p class="text-xs uppercase tracking-[0.35em] text-slate-500">Tag</p>
		<h1 class="text-4xl sm:text-5xl">{data.tag.label}</h1>
	</div>
	<ul class="mt-10 space-y-6">
		{#each data.posts as post}
			<PostListEntry {post} />
		{/each}
	</ul>
</div>
