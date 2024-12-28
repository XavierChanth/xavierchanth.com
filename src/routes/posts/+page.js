import { getPosts } from '$lib/utils.js';

export const load = async () => {
	const posts = await getPosts();
	const filteredPosts = posts.filter((post) => post.published);
	filteredPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	// TODO: add pagination
	return { posts: filteredPosts };
};
