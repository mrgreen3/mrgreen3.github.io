# Mr Green's Blog

Source for [mrgreen.blog](https://mrgreen.blog).

Built with [Astro](https://astro.build/). The look is the [terminimal](https://github.com/pawroman/zola-theme-terminimal) theme by pawroman (MIT), carried over from the old Zola site; its compiled CSS and Hack fonts live in `public/`.

## Layout

- `src/content/blog/` — posts and pages (Markdown, YAML front matter)
- `src/pages/` — routes: front page, pagination, posts, tags, feeds, sitemap
- `src/layouts/`, `src/components/` — terminimal markup
- `src/lib/zola-html.mjs` — keeps Zola's heading ids and external link attributes
- `public/` — static files (CSS, fonts, images, CNAME)

## Front matter

```yaml
---
title: "Title Here"
date: "YYYY-MM-DD"
slug: "url-path"
tags: ["linux", "tools"]
draft: true
---
```

`slug` is the URL path. Pages without a `date` are built but stay off the front page and feeds. Only top-level posts (no `/` in the slug) appear on the front page.

## Images

Put images in a folder next to the post and link them relatively:

```
src/content/blog/my-post.md
src/content/blog/my-post/desk.jpg
```

```markdown
![my desk](./my-post/desk.jpg)
```

They are converted to WebP with width/height set at build time; feeds and front-page summaries get the same optimised file. Anything in `public/` (e.g. `/mango.png`) is served as-is.

## Video

Paste a YouTube embed straight into the Markdown (privacy-friendly domain, full width at 16:9 via `custom.css`):

```html
<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
  title="What the video is" allowfullscreen></iframe>
```

`VIDEO_ID` is the part after `watch?v=` in the YouTube link.

## CI / Deployment

GitHub Actions (`.github/workflows/deploy.yml`) runs `npm ci` and `npm run build` on every push to `main`, then deploys `dist/` to GitHub Pages.

## Local

```sh
npm ci
npm run dev       # http://localhost:4321
npm run build     # output in dist/
```
