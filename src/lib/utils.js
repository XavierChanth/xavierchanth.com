/**
 * @param {string} path
 * @returns {string}
 */
const slugFromPath = (path) => {
	return path.match(/([\w-]+)\.md/i)?.[1] ?? path /** @type {string} */;
};

/**
 * @param {string} value
 * @returns {string}
 */
const kebabCase = (value) => {
	return value
		.trim()
		.toLowerCase()
		.replace(/['"]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
};

/**
 * @typedef {Md.ResolvedPost & { seriesLabel?: string }} PostWithSeriesLabel
 */

/**
 * @param {PostWithSeriesLabel[]} posts
 * @returns {Map<string, PostWithSeriesLabel[]>}
 */
const groupPostsBySeries = (posts) => {
	/** @type {Map<string, PostWithSeriesLabel[]>} */
	const groups = new Map();

	for (const post of posts) {
		if (!post.seriesSlug) continue;
		const seriesPosts = groups.get(post.seriesSlug) ?? [];
		seriesPosts.push(post);
		groups.set(post.seriesSlug, seriesPosts);
	}

	return groups;
};

/**
 * @param {PostWithSeriesLabel[]} posts
 * @returns {Md.ResolvedPost[]}
 */
const attachSeriesMetadata = (posts) => {
	const seriesGroups = groupPostsBySeries(posts.filter((post) => post.seriesLabel));
	for (const seriesPosts of seriesGroups.values()) {
		seriesPosts.sort((a, b) => {
			const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime();
			return dateComparison || a.slug.localeCompare(b.slug);
		});

		for (const [index, post] of seriesPosts.entries()) {
			const first = seriesPosts[0];
			const previous = seriesPosts[index - 1];
			const next = seriesPosts[index + 1];
			const latest = seriesPosts[seriesPosts.length - 1];

			post.series = {
				label: /** @type {string} */ (post.seriesLabel),
				slug: /** @type {string} */ (post.seriesSlug),
				index: index + 1,
				total: seriesPosts.length,
				first: toSeriesReference(first, 1),
				previous: previous ? toSeriesReference(previous, index) : undefined,
				next: next ? toSeriesReference(next, index + 2) : undefined,
				latest: toSeriesReference(latest, seriesPosts.length)
			};
		}
	}

	return posts;
};

/**
 * @param {Md.ResolvedPost} post
 * @param {number} index
 * @returns {Md.SeriesReference}
 */
const toSeriesReference = (post, index) => ({
	title: post.title,
	slug: post.slug,
	index,
	date: post.date
});

/**
 * @returns {Promise<Md.ResolvedPost[]>}
 */
const getPosts = async () => {
	const posts = Object.entries(import.meta.glob('/src/posts/*.md')).map(async ([path, resolver]) => {
		const post = /** @type Md.Post */ (await resolver());
		const { series: frontmatterSeries, ...metadata } = post.metadata;
		const series = frontmatterSeries?.trim();
		return {
			component: post.default,
			slug: slugFromPath(path),
			...metadata,
			seriesLabel: series || undefined,
			seriesSlug: series ? kebabCase(series) : undefined
		};
	});
	return attachSeriesMetadata(await Promise.all(posts));
};

/**
 * @param {string} slug
 * @returns {Promise<Md.ResolvedPost | undefined>}
 */
const getPost = async (slug) => {
	const posts = await getPosts();
	return posts.find((post) => post.slug === slug);
};

/**
 * @param {string} seriesSlug
 * @returns {Promise<Md.ResolvedPost[]>}
 */
const getSeriesPosts = async (seriesSlug) => {
	const posts = await getPosts();
	return posts
		.filter((post) => post.published && post.series?.slug === seriesSlug)
		.sort((a, b) => (a.series?.index ?? 0) - (b.series?.index ?? 0));
};

/**
 * @returns {Promise<Md.SeriesSummary[]>}
 */
const getSeriesSummaries = async () => {
	const posts = (await getPosts()).filter((post) => post.published && post.series);
	const groups = groupPostsBySeries(posts);

	return Array.from(groups.values()).map((seriesPosts) => {
		const firstPost = seriesPosts[0];
		return {
			label: firstPost.series?.label ?? '',
			slug: firstPost.series?.slug ?? '',
			total: seriesPosts.length
		};
	});
};

export { getPosts, getPost, getSeriesPosts, getSeriesSummaries, kebabCase };
