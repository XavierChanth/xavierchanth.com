import { getTagPosts } from "$lib/utils.js";
import { error } from "@sveltejs/kit";

/**
 * Every published post carrying this tag, newest first, reduced to the
 * serializable fields the shared `PostList` renders.
 *
 * @param {{ params: { tagSlug: string } }} event
 */
export const load = async ({ params }) => {
  const posts = await getTagPosts(params.tagSlug);

  if (!posts.length) {
    throw error(404, {
      message: "The tag you requested doesn't exist!",
    });
  }

  const tag = posts
    .flatMap((post) => post.tags ?? [])
    .find((item) => item.slug === params.tagSlug);

  return {
    tag: {
      label: tag?.label ?? params.tagSlug,
      slug: tag?.slug ?? params.tagSlug,
    },
    posts: posts.map(({ slug, title, description, date, series, tags }) => ({
      slug,
      title,
      description,
      date,
      series: series
        ? { label: series.label, slug: series.slug, index: series.index }
        : undefined,
      tags: (tags ?? []).map(({ label, slug: tagSlug }) => ({
        label,
        slug: tagSlug,
      })),
    })),
  };
};
