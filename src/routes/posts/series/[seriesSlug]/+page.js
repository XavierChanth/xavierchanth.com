import { getSeriesPosts } from "$lib/utils.js";
import { error } from "@sveltejs/kit";

/** @param {{ params: { seriesSlug: string } }} event */
export const load = async ({ params }) => {
  const posts = await getSeriesPosts(params.seriesSlug);

  if (!posts.length) {
    throw error(404, {
      message: "The series you requested doesn't exist!",
    });
  }

  return {
    series: posts[0].series,
    posts,
  };
};
