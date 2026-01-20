<script>
	import '../app.css';
  import RssLink from "$lib/components/RssLink.svelte";
	import { page } from '$app/state';
	import {
		BLOG_AUTHOR,
		BLOG_AUTHOR_GITHUB,
		BLOG_AUTHOR_LINKEDIN,
		BLOG_DESCRIPTION,
		BLOG_IMAGE,
		BLOG_TITLE,
		BLOG_URL
	} from '$lib/metadata';
	let { children } = $props();

	const canonical = $derived(`${BLOG_URL}${page.url.pathname}`);

	const websiteJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: BLOG_TITLE,
		url: BLOG_URL,
		description: BLOG_DESCRIPTION
	};

	const personJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: BLOG_AUTHOR,
		url: BLOG_URL,
		image: BLOG_IMAGE,
		sameAs: [
			`https://github.com/${BLOG_AUTHOR_GITHUB}`,
			`https://www.linkedin.com/in/${BLOG_AUTHOR_LINKEDIN}`
		]
	};
</script>

<svelte:head>
	<title>{BLOG_TITLE}</title>
	<meta name="description" content={BLOG_DESCRIPTION} />
	<meta name="author" content={BLOG_AUTHOR} />
	<meta name="robots" content="index,follow" />
	<link rel="canonical" href={canonical} />

	<meta property="og:site_name" content={BLOG_TITLE} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={BLOG_TITLE} />
	<meta property="og:description" content={BLOG_DESCRIPTION} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={BLOG_IMAGE} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={BLOG_TITLE} />
	<meta name="twitter:description" content={BLOG_DESCRIPTION} />
	<meta name="twitter:image" content={BLOG_IMAGE} />

	<script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
	<script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
</svelte:head>

<main class="min-h-screen flex flex-col relative overflow-hidden bg-[rgb(var(--page))]">
	<div
		class="pointer-events-none absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(14,116,144,0.25),transparent_65%)] blur-3xl"
	></div>
	<div
		class="pointer-events-none absolute top-40 -left-24 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.2),transparent_60%)] blur-3xl"
	></div>

	<nav class="sticky top-0 z-20 border-b border-black/5 bg-[rgb(var(--page))]/80 backdrop-blur">
		<div class="max-w-6xl mx-auto px-4">
			<div class="flex justify-between items-center h-16">
				<a href="/" class="text-xl font-semibold tracking-tight">
					<span class="text-[rgb(var(--accent))]">Xavier</span>Chanth
				</a>
				<div class="flex items-center gap-3">
					<a
						href="/posts"
						class="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/70 px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-900"
					>
						Blog posts
					</a>
					<a
						href="https://github.com/xavierchanth"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
						class="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/70 p-2 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-900"
					>
						<svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true" fill="currentColor">
							<path
								d="M12 .5a12 12 0 00-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.78-1.34-1.78-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.62-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.57.12-3.28 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0C17.02 5 18.03 5.32 18.03 5.32c.66 1.71.24 2.97.12 3.28.77.84 1.24 1.91 1.24 3.22 0 4.61-2.82 5.62-5.5 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0012 .5z"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</nav>
	<div class="flex-grow">
		{@render children()}
	</div>

	<footer class="bg-slate-900 text-slate-200 py-10">
		<div class="max-w-6xl mx-auto px-4 text-center space-y-2">
			<p class="text-sm tracking-wide">&copy; 2025 Xavier Chanthavong. All rights reserved.</p>
			<RssLink />
		</div>
	</footer>
</main>
