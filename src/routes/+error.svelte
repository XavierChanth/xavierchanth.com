<script>
  import LinkRow from "$lib/site/components/LinkRow.svelte";
  import { page } from "$app/state";
  import { BLOG_TITLE } from "$lib/metadata";

  const status = $derived(page.status);
  const heading = $derived(
    status === 404 ? "Page not found" : "Something went wrong",
  );

  /**
   * Only the loader-authored message is shown, and only when it is a real
   * sentence: SvelteKit's terse defaults and any empty message fall back to
   * plain copy. Nothing from the underlying exception is rendered.
   */
  const GENERIC = ["Not Found", "Internal Error"];
  const detail = $derived(page.error?.message?.trim());
  const message = $derived(
    detail && !GENERIC.includes(detail)
      ? detail
      : status === 404
        ? "The page you asked for isn't here."
        : "This page could not be loaded.",
  );

  /** @type {{ label: string; href: string }[]} */
  const links = [
    { label: "Overview", href: "/" },
    { label: "All posts", href: "/posts" },
  ];
</script>

<svelte:head>
  <title>{heading} - {BLOG_TITLE}</title>
</svelte:head>

<div class="site-shell">
  <div class="site-intro">
    <h1 class="site-title">{heading}</h1>
    <div class="site-intro-body">
      <p class="site-meta">Error {status}</p>
      <p class="site-lede site-muted">{message}</p>
      <LinkRow {links} label="Go elsewhere" />
    </div>
  </div>
</div>
