<script>
	import '../app.css';
	import '$lib/site/styles/site.css';
	import LinkRow from '$lib/site/components/LinkRow.svelte';
	import { renderJsonLd } from '$lib/json-ld.js';
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

	/** @type {{ label: string; href: string }[]} */
	// Absolute hrefs so the same navigation resolves from every route.
	const sectionLinks = [
		{ label: 'Writing', href: '/posts' },
		{ label: 'Work', href: '/#work' },
		{ label: 'Open source', href: '/#open-source' }
	];

	/** @type {{ label: string; href: string }[]} */
	const footerLinks = [
		{ label: 'All posts', href: '/posts' },
		{ label: 'RSS', href: '/rss.xml' },
		{ label: 'GitHub', href: `https://github.com/${BLOG_AUTHOR_GITHUB}` },
		{
			label: 'LinkedIn',
			href: `https://www.linkedin.com/in/${BLOG_AUTHOR_LINKEDIN}`
		}
	];

	const websiteJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: BLOG_TITLE,
		url: BLOG_URL,
		description: BLOG_DESCRIPTION
	};

	/**
	 * Indexability is owned here so a route never has to emit a second, competing
	 * `robots` meta: every real page is indexable, and any error rendering — the
	 * shared `+error.svelte` — is not.
	 */
	const robots = $derived(page.status >= 400 ? 'noindex,nofollow' : 'index,follow');

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
	<!--
    Site-wide head only. Every page supplies its own title, description,
    canonical, and social title/description, so none of those are repeated here.
    Svelte keeps a single <title>, so this one acts as a fallback for pages that
    do not set one (for example the error page).
  -->
	<title>{BLOG_TITLE}</title>
	<meta name="author" content={BLOG_AUTHOR} />
	<meta name="robots" content={robots} />
	<link
		rel="alternate"
		type="application/rss+xml"
		title={`${BLOG_TITLE} RSS`}
		href={`${BLOG_URL}/rss.xml`}
	/>

	<meta property="og:site_name" content={BLOG_TITLE} />
	<meta property="og:image" content={BLOG_IMAGE} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:image" content={BLOG_IMAGE} />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html renderJsonLd(websiteJsonLd)}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html renderJsonLd(personJsonLd)}
</svelte:head>

<div class="site-root">
	<a class="site-skip" href="#main">Skip to content</a>

	<header class="site-header">
		<div class="site-shell site-header-inner">
			<a class="site-wordmark" href="/">{BLOG_AUTHOR}</a>
			<nav class="site-header-nav" aria-label="Sections">
				<LinkRow links={sectionLinks} />
			</nav>
		</div>
	</header>

	<!--
    The single `<main>` landmark for every route. Pages using the quiet
    editorial system wrap their own content in `.site-shell`; routes that still
    render Tailwind Typography prose keep their existing containers.
  -->
	<main class="site-main" id="main">
		{@render children()}
	</main>

	<footer class="site-footer">
		<div class="site-shell site-footer-inner">
			<p class="site-meta">&copy; 2024–2026 {BLOG_AUTHOR}</p>
			<LinkRow links={footerLinks} label="Elsewhere" />
		</div>
	</footer>
</div>
