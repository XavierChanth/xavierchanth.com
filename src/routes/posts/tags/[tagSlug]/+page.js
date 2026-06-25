import { getTagPosts } from '$lib/utils.js';
import { error } from '@sveltejs/kit';

/** @param {{ params: { tagSlug: string } }} event */
export const load = async ({ params }) => {
	const posts = await getTagPosts(params.tagSlug);

	if (!posts.length) {
		throw error(404, {
			message: "The tag you requested doesn't exist!"
		});
	}

	const tag = posts.flatMap((post) => post.tags ?? []).find((item) => item.slug === params.tagSlug);

	return {
		tag,
		posts
	};
};
