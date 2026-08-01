<script>
  import LinkRow from "../lib/LinkRow.svelte";
  import PostList from "../lib/PostList.svelte";
  import Section from "../lib/Section.svelte";

  let { data } = $props();

  const TITLE = "Writing — Xavier Chanthavong";
  const DESCRIPTION =
    "Every published post by Xavier Chanthavong, newest first: notes on how software gets designed, shipped, and maintained.";

  /** @type {{ label: string; href: string }[]} */
  const backLinks = [{ label: "Back to overview", href: "/testing/" }];

  /** @type {{ label: string; href: string }[]} */
  const archiveLinks = [
    { label: "Back to overview", href: "/testing/" },
    { label: "RSS", href: "/rss.xml" },
  ];
</script>

<svelte:head>
  <title>{TITLE}</title>
  <meta name="description" content={DESCRIPTION} />
  <meta name="robots" content="noindex,nofollow" />
</svelte:head>

<div class="t-intro">
  <h1 class="t-title">Writing</h1>
  <div class="t-intro-body">
    <p class="t-lede t-muted">
      Everything I have published, newest first. Mostly notes on how software
      gets designed, shipped, and maintained.
    </p>
    <LinkRow links={backLinks} label="Back" />
  </div>
</div>

<Section id="archive" title="All posts">
  <PostList posts={data.posts} />
  <LinkRow links={archiveLinks} class="t-section-footer" label="More writing" />
</Section>
