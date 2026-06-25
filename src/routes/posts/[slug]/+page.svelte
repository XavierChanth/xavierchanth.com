<script>
	// @ts-nocheck

	import { BLOG_AUTHOR, BLOG_IMAGE, BLOG_TITLE, BLOG_URL } from '$lib/metadata';
	import SeriesLabel from '$lib/components/SeriesLabel.svelte';
	import SeriesNavigation from '$lib/components/SeriesNavigation.svelte';
	import TagList from '$lib/components/TagList.svelte';

	/** @type {{ data: Md.ResolvedPost }}*/
	const { data } = $props();
	const Component = $derived(data.component);

	const canonical = $derived(`${BLOG_URL}/posts/${data.slug}`);

	const articleJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: data.title,
		description: data.description,
		author: {
			'@type': 'Person',
			name: BLOG_AUTHOR
		},
		datePublished: data.date,
		dateModified: data.updated ?? data.date,
		image: BLOG_IMAGE,
		mainEntityOfPage: canonical
	});

	const breadcrumbJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: BLOG_URL
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Blog Posts',
				item: `${BLOG_URL}/posts`
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: data.title,
				item: canonical
			}
		]
	});
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

	<script type="application/ld+json">
{JSON.stringify(articleJsonLd)}
	</script>
	<script type="application/ld+json">
{JSON.stringify(breadcrumbJsonLd)}
	</script>
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-16 lg:py-20">
	<div class="max-w-4xl mx-auto space-y-4">
		<div class="grid gap-3 sm:grid-cols-2 sm:items-start">
			<div class="space-y-2 text-center sm:text-left">
				<p class="text-xs uppercase tracking-[0.3em] text-slate-500">{data.author}</p>
				<p class="text-xs uppercase tracking-[0.3em] text-slate-500">{data.date}</p>
			</div>
			<div class="flex flex-col items-center gap-2 sm:items-end">
				{#if data.series}
					<SeriesLabel series={data.series} />
				{/if}
				{#if data.tags?.length}
					<TagList tags={data.tags} />
				{/if}
			</div>
		</div>
		<h1 class="text-4xl sm:text-5xl">{data.title}</h1>
		<p class="text-lg text-slate-600">{data.description}</p>
	</div>

	<div class="mt-12 max-w-4xl mx-auto">
		<div
			class="prose-post prose prose-slate max-w-none prose-headings:tracking-tight prose-a:text-[rgb(var(--accent))] prose-pre:bg-slate-900 prose-pre:text-slate-100"
		>
			<Component />
		</div>
		{#if data.series}
			<div class="mt-12">
				<SeriesNavigation series={data.series} currentSlug={data.slug} currentTitle={data.title} />
			</div>
		{/if}
	</div>
</div>
