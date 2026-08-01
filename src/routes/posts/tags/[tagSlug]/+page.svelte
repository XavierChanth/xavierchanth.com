<script>
  import LinkRow from "$lib/site/components/LinkRow.svelte";
  import PostList from "$lib/site/components/PostList.svelte";
  import Section from "$lib/site/components/Section.svelte";
  import { BLOG_DESCRIPTION, BLOG_TITLE, BLOG_URL } from "$lib/metadata";

  const { data } = $props();

  const canonical = $derived(`${BLOG_URL}/posts/tags/${data.tag.slug}`);
  const title = $derived(`${data.tag.label} Posts - ${BLOG_TITLE}`);
  const description = $derived(
    `Posts tagged ${data.tag.label}. ${BLOG_DESCRIPTION}`,
  );

  const total = $derived(data.posts.length);
  const lede = $derived(
    `${total} ${total === 1 ? "post" : "posts"} tagged ${data.tag.label}, newest first.`,
  );

  /** @type {{ label: string; href: string }[]} */
  const backLinks = [
    { label: "All posts", href: "/posts" },
    { label: "Browse tags", href: "/posts#browse-tags" },
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
    <h1 class="site-title">Tagged {data.tag.label}</h1>
    <div class="site-intro-body">
      <p class="site-lede site-muted">{lede}</p>
      <LinkRow links={backLinks} label="Back" />
    </div>
  </div>

  <!--
    `excludeTagSlug` keeps the rest of each post's taxonomy useful while
    dropping the tag this page is already about from every row.
  -->
  <Section id="tagged" title="Posts">
    <PostList posts={data.posts} taxonomy excludeTagSlug={data.tag.slug} />
  </Section>
</div>
