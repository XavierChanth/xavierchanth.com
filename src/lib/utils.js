/**
 * @param {string} path
 * @returns {string | undefined}
 */
const slugFromPath = (/** @type {string} */ path) => {
	return path.match(/([\w-]+)\.md/i)?.[1];
};

/**
 * @returns {Promise<Md.ResolvedPost[]>}
 */
const getPosts = async () => {
	const posts = Object.entries(import.meta.glob('/src/posts/*.md')).map(
		async ([path, resolver]) => {
			const post = /** @type Md.Post */ (await resolver());
			return {
				component: post.default,
				slug: slugFromPath(path),
				...post.metadata
			};
		}
	);
	return await Promise.all(posts);
};

/**
 * @param {string} slug
 * @returns {Promise<Md.ResolvedPost>}
 */
const getPost = async (slug) => {
	const posts = Object.entries(import.meta.glob('/src/posts/*.md'))
		.filter(([path, _]) => {
			return slugFromPath(path) === slug;
		})
		.map(async ([path, resolver]) => {
			const post = /** @type Md.Post */ (await resolver());
			return {
				component: post.default,
				slug: slugFromPath(path),
				...post.metadata
			};
		});

	return posts[0];
};

export { getPosts, getPost };
