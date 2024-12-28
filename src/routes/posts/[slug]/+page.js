import { getPost } from '$lib/utils';
import { error } from '@sveltejs/kit';

//@ts-ignore
export const load = async ({ params }) => {
	const post = await getPost(params.slug);
	if (!post) {
		throw error(404, {
			message: "The post you requested doesn't exist!"
		});
	} else if (!post.published) {
		throw error(404, {
			message: 'This post no longer exists!'
		});
	}

	return post;
};
