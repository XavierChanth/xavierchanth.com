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
 * @param {string[]} tags
 * @returns {Md.Tag[]}
 */
const normalizeTags = (tags = []) => {
	const seen = new Set();

	return tags
		.map((tag) => tag.trim())
		.filter(Boolean)
		.map((label) => ({ label, slug: kebabCase(label) }))
		.filter((tag) => {
			if (seen.has(tag.slug)) return false;
			seen.add(tag.slug);
			return true;
		});
};

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
 * @param {Md.ResolvedPost[]} posts
 * @returns {Map<string, Md.ResolvedPost[]>}
 */
const groupPostsByTag = (posts) => {
	/** @type {Map<string, Md.ResolvedPost[]>} */
	const groups = new Map();

	for (const post of posts) {
		for (const tag of post.tags ?? []) {
			const tagPosts = groups.get(tag.slug) ?? [];
			tagPosts.push(post);
			groups.set(tag.slug, tagPosts);
		}
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
		const { series: frontmatterSeries, tags: frontmatterTags, ...metadata } = post.metadata;
		const series = frontmatterSeries?.trim();
		return {
			component: post.default,
			slug: slugFromPath(path),
			...metadata,
			seriesLabel: series || undefined,
			seriesSlug: series ? kebabCase(series) : undefined,
			tags: normalizeTags(frontmatterTags)
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
 * @param {string} slug
 * @returns {{ seriesSlug: string; index: number } | undefined}
 */
const seriesAliasFromSlug = (slug) => {
	const match = slug.match(/^(.+)-([1-9]\d*)$/);
	if (!match) return undefined;

	return {
		seriesSlug: match[1],
		index: Number(match[2])
	};
};

/**
 * @param {string} slug
 * @returns {Promise<Md.ResolvedPost | undefined>}
 */
const getPostBySeriesAlias = async (slug) => {
	const alias = seriesAliasFromSlug(slug);
	if (!alias) return undefined;

	const posts = await getSeriesPosts(alias.seriesSlug);
	return posts.find((post) => post.series?.index === alias.index);
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

/**
 * @param {string} tagSlug
 * @returns {Promise<Md.ResolvedPost[]>}
 */
const getTagPosts = async (tagSlug) => {
	const posts = await getPosts();
	return posts
		.filter((post) => post.published && post.tags?.some((tag) => tag.slug === tagSlug))
		.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
};

/**
 * @returns {Promise<Md.TagSummary[]>}
 */
const getTagSummaries = async () => {
	const posts = (await getPosts()).filter((post) => post.published);
	const groups = groupPostsByTag(posts);

	return Array.from(groups.entries())
		.map(([slug, tagPosts]) => {
			const tag = tagPosts.flatMap((post) => post.tags ?? []).find((item) => item.slug === slug);
			return {
				label: tag?.label ?? slug,
				slug,
				total: tagPosts.length
			};
		})
		.sort((a, b) => a.label.localeCompare(b.label));
};

export {
	getPosts,
	getPost,
	getPostBySeriesAlias,
	getSeriesPosts,
	getSeriesSummaries,
	getTagPosts,
	getTagSummaries,
	kebabCase
};
