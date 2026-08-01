<script>
  import LinkRow from "$lib/site/components/LinkRow.svelte";
  import PostList from "$lib/site/components/PostList.svelte";
  import Section from "$lib/site/components/Section.svelte";
  import { BLOG_DESCRIPTION, BLOG_TITLE, BLOG_URL } from "$lib/metadata";

  const { data } = $props();

  const canonical = $derived(`${BLOG_URL}/posts/series/${data.series.slug}`);
  const title = $derived(`${data.series.label} Series - ${BLOG_TITLE}`);
  const description = $derived(
    `All posts in the ${data.series.label} series. ${BLOG_DESCRIPTION}`,
  );

  const total = $derived(data.posts.length);
  const lede = $derived(
    `${total} ${total === 1 ? "post" : "posts"} in the ${data.series.label} series, in reading order.`,
  );

  /** @type {{ label: string; href: string }[]} */
  const backLinks = [
    { label: "All posts", href: "/posts" },
    { label: "Browse series", href: "/posts#browse-series" },
  ];
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />

  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />

  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
</svelte:head>

<div class="site-shell">
  <div class="site-intro">
    <h1 class="site-title">{data.series.label}</h1>
    <div class="site-intro-body">
      <p class="site-lede site-muted">{lede}</p>
      <LinkRow links={backLinks} label="Back" />
    </div>
  </div>

  <!--
    The loader supplies the series' own part order, so the list is rendered as
    given rather than re-sorted by date. `excludeSeriesSlug` drops the repeated
    series label from every row while each post's tags stay.
  -->
  <Section id="series" title="In this series">
    <PostList
      posts={data.posts}
      taxonomy
      excludeSeriesSlug={data.series.slug}
    />
  </Section>
</div>
