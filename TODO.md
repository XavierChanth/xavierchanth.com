# TODO

## SEO / AEO

1. [x] Fix `bun run check`
   - Resolve the current `fs/promises` type error in `src/routes/rss.xml/+server.js`.
   - Keep validation quiet enough that SEO and metadata regressions are easy to catch.

2. [x] Add `sitemap.xml`
   - Include the homepage, posts index, and all published posts.
   - Submit the sitemap in Google Search Console and Bing Webmaster Tools.

3. [x] Add `robots.txt`
   - Allow crawling.
   - Reference the sitemap URL.

4. [x] Add RSS discovery metadata
   - Add `<link rel="alternate" type="application/rss+xml">` in the shared head.

5. [x] Improve structured data
   - Keep `WebSite`, `Person`, and `BlogPosting`.
   - Add `Blog` schema on `/posts`.
   - Add `BreadcrumbList` schema for post pages.
   - Consider `dateModified` support in post frontmatter for revised posts.

6. Add an `/about` page
   - Explain who Xavier is, what he works on, and why his technical perspective is credible.
   - Link to GitHub, LinkedIn, and relevant projects.

7. Strengthen internal linking
   - Link related posts from inside article bodies where relevant.
   - Add a related posts section once there are enough posts to make it useful.

8. Improve post descriptions
   - Make descriptions more query-shaped and specific.
   - Prefer descriptions that clearly answer what question the post helps with.

9. Make posts easier for answer engines to cite
   - Put the main thesis early.
   - Use descriptive headings.
   - Include concise definitions where useful.
   - Prefer concrete examples over broad claims.
   - Keep recap lists and named frameworks where they clarify the post.
