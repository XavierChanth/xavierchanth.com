import { getPosts } from '$lib/utils.js';

export const load = async () => {
	const posts = (await getPosts())
		.filter((post) => post.published)
		.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
		.slice(0, 3);

	return { posts };
};
