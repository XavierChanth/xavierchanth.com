import { getSeriesPosts } from "$lib/utils.js";
import { error } from "@sveltejs/kit";

/**
 * Every published post in this series, kept in the series' own part order from
 * `getSeriesPosts()` — deliberately not re-sorted by date — and reduced to the
 * serializable fields the shared `PostList` renders.
 *
 * @param {{ params: { seriesSlug: string } }} event
 */
export const load = async ({ params }) => {
  const posts = await getSeriesPosts(params.seriesSlug);

  if (!posts.length) {
    throw error(404, {
      message: "The series you requested doesn't exist!",
    });
  }

  return {
    series: {
      label: posts[0].series?.label ?? params.seriesSlug,
      slug: posts[0].series?.slug ?? params.seriesSlug,
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
