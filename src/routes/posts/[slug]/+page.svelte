<script>
	// @ts-nocheck

	import {
		BLOG_AUTHOR,
		BLOG_IMAGE,
		BLOG_TITLE,
		BLOG_URL
	} from '$lib/metadata';

	/** @type {{ data: Md.ResolvedPost }}*/
	const { data } = $props();
	const Component = data.component;

	const canonical = `${BLOG_URL}/posts/${data.slug}`;

	const articleJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: data.title,
		description: data.description,
		author: {
			'@type': 'Person',
			name: BLOG_AUTHOR
		},
		datePublished: data.date,
		image: BLOG_IMAGE,
		mainEntityOfPage: canonical
	};
</script>

<svelte:head>
	<title>{data.title} - {BLOG_TITLE}</title>
	<meta name="description" content={data.description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content="article" />
	<meta property="og:title" content={`${data.title} - ${BLOG_TITLE}`} />
	<meta property="og:description" content={data.description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={BLOG_IMAGE} />

	<meta name="twitter:title" content={`${data.title} - ${BLOG_TITLE}`} />
	<meta name="twitter:description" content={data.description} />
	<meta name="twitter:image" content={BLOG_IMAGE} />

	<script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-16 lg:py-20">
	<div class="max-w-4xl mx-auto text-center space-y-4">
		<p class="text-xs uppercase tracking-[0.3em] text-slate-500">
			{data.author} - {data.date}
		</p>
		<h1 class="text-4xl sm:text-5xl">{data.title}</h1>
		<p class="text-lg text-slate-600">{data.description}</p>
	</div>

	<div class="mt-12 max-w-4xl mx-auto">
		<div
			class="prose prose-slate max-w-none prose-headings:tracking-tight prose-a:text-[rgb(var(--accent))] prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-blockquote:border-l-[rgb(var(--accent))] prose-blockquote:bg-white/70"
		>
			<Component />
		</div>
	</div>
</div>
