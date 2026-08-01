<script>
  import LinkRow from "./lib/LinkRow.svelte";
  import PostList from "./lib/PostList.svelte";
  import ProjectList from "./lib/ProjectList.svelte";
  import Section from "./lib/Section.svelte";
  import WorkList from "./lib/WorkList.svelte";
  import { PROJECTS } from "./data/projects.js";
  import { WORK } from "./data/work.js";
  import {
    BIO,
    COLOPHON_DOTFILES,
    CONTACT_LINKS,
    EDUCATION,
    NAME,
    PORTRAIT,
    ROLE,
  } from "./data/profile.js";

  let { data } = $props();

  const TITLE = "Xavier Chanthavong — a writer who builds";
  const DESCRIPTION =
    "Writing, work, and open source from Xavier Chanthavong: Co-Founder & CTO at Woosah Technologies and an independent software consultant since 2017.";

  /** @type {{ label: string; href: string }[]} */
  const writingLinks = [
    { label: "All posts", href: "/posts" },
    { label: "RSS", href: "/rss.xml" },
  ];
</script>

<svelte:head>
  <title>{TITLE}</title>
  <meta name="description" content={DESCRIPTION} />
  <meta name="robots" content="noindex,nofollow" />
</svelte:head>

<div class="t-intro">
  <div class="t-intro-head">
    <img
      class="t-portrait"
      src={PORTRAIT.src}
      alt={PORTRAIT.alt}
      width={PORTRAIT.width}
      height={PORTRAIT.height}
    />
    <div>
      <h1 class="t-title">{NAME}</h1>
      <p class="t-lede t-muted">{ROLE}</p>
    </div>
  </div>

  <div class="t-intro-body">
    {#each BIO as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    <LinkRow links={CONTACT_LINKS} label="Contact" />
  </div>
</div>

<Section id="writing" title="Writing">
  <PostList posts={data.posts} />
  <LinkRow links={writingLinks} class="t-section-footer" label="More writing" />
</Section>

<Section id="work" title="Work">
  <WorkList entries={WORK} />
</Section>

<Section id="open-source" title="Open source">
  <ProjectList projects={PROJECTS} />
</Section>

<Section id="colophon" title="Colophon">
  <div class="t-colophon t-small t-muted t-section-footer">
    <p>{EDUCATION}</p>
    <p>
      Machine setup lives in
      <a href={COLOPHON_DOTFILES.href} rel="noopener noreferrer"
        >{COLOPHON_DOTFILES.label}</a
      >.
      {COLOPHON_DOTFILES.description}
    </p>
  </div>
</Section>
