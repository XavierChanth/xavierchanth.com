<script>
	const { data } = $props();
	import PostListEntry from '$lib/components/PostListEntry.svelte';
	import { BLOG_DESCRIPTION, BLOG_TITLE, BLOG_URL } from '$lib/metadata';

	const canonical = `${BLOG_URL}/posts`;
	const blogJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Blog',
		name: `Blog Posts - ${BLOG_TITLE}`,
		description: `Posts from ${BLOG_TITLE}. ${BLOG_DESCRIPTION}`,
		url: canonical,
		blogPost: data.posts.map((post) => ({
			'@type': 'BlogPosting',
			headline: post.title,
			description: post.description,
			url: `${BLOG_URL}/posts/${post.slug}`,
			datePublished: post.date
		}))
	});
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

	<script type="application/ld+json">{JSON.stringify(blogJsonLd)}</script>
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-16 lg:py-20">
	<div class="text-center space-y-4">
		<p class="text-xs uppercase tracking-[0.35em] text-slate-500">Writing</p>
		<h1 class="text-4xl sm:text-5xl">My Posts</h1>
		<p class="mx-auto max-w-2xl text-lg text-slate-600">
			Deep dives, practical notes, thought leadership, and everything in-between.
		</p>
	</div>
	<ul class="mt-10 space-y-6">
		{#each data.posts as post}
			<PostListEntry {post} />
		{/each}
	</ul>
</div>
