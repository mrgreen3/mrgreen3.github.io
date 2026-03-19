# Blog Discoverability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add tag-based content discovery, curated Links hub, Archive page, and navigation widgets to enable readers to explore the blog naturally as it grows.

**Architecture:** Leverage Hugo's built-in tag system (no config changes needed), create curated content pages (Links, Archive), add simple HTML partials for tag cloud and related posts widgets. All changes follow Terminal theme's minimal aesthetic.

**Tech Stack:** Hugo (static generation), Markdown (content), HTML (partials), CSS (Terminal theme)

---

## File Structure

**Files to modify:**
- `hugo.toml` — Add Archive menu item
- `content/posts/welcome.md` — Add consistent tags
- `content/links/_index.md` — Expand with curated links
- `static/style.css` — Minor tag/archive styling adjustments

**Files to create:**
- `content/archive/_index.md` — New Archive page
- `layouts/partials/related-posts.html` — Show related posts on post pages
- `layouts/partials/tag-cloud.html` — Show all tags in footer

**Files unchanged but used:**
- `themes/terminal/layouts/` — Theme handles tag page generation (no changes)
- `docs/` — Generated output directory

---

## Task 1: Update Welcome Post with Proper Tags

**Files:**
- Modify: `content/posts/welcome.md`

- [ ] **Step 1: Read current welcome post**

Run: `cat content/posts/welcome.md`

Current post likely has basic or no tags. We'll add consistent primary + subtopic tags.

- [ ] **Step 2: Update welcome.md with proper tags**

Replace the tags line with:
```toml
tags = ["linux", "tips"]
```

Full post should look like:
```toml
+++
title = "Welcome"
date = "2026-03-19"
author = "mrgreen"
tags = ["linux", "tips"]
keywords = ["archbang", "linux"]
description = "Getting started with ArchBang and Linux configuration"
showFullContent = false
readingTime = true
hideComments = false
+++

Welcome to the ArchBang & Linux blog. This is where I document my journey with ArchBang distribution, system configuration, and Linux tinkering.

## What to expect

Posts here focus on practical ArchBang setups, Linux administration, configuration management, and the occasional deep dive into tools and workflows.

Whether you're running ArchBang, Arch, or any Linux distro, hopefully you'll find something useful here.

Stay minimal. Keep it simple.
```

- [ ] **Step 3: Verify tags are set correctly**

Run: `grep -A 3 "title = \"Welcome\"" content/posts/welcome.md`

Expected: Should show `tags = ["linux", "tips"]`

- [ ] **Step 4: Commit**

```bash
git add content/posts/welcome.md
git commit -m "chore: add consistent tags to welcome post"
```

---

## Task 2: Expand Links Page with Curated Content

**Files:**
- Modify: `content/links/_index.md`

- [ ] **Step 1: Read current links page**

Run: `cat content/links/_index.md`

Should have stub content. We'll expand it with tools, communities, and resources.

- [ ] **Step 2: Replace with curated content**

Rewrite `content/links/_index.md`:

```markdown
+++
date = '2026-03-19'
draft = false
title = 'Links'
+++

Useful resources and links related to Linux, ArchBang, and system administration.

## Tools & Utilities

Essential software for Linux workflow:

- **sway** — Tiling Wayland compositor. Minimal, powerful window manager for X11/Wayland.
  https://swaywm.org

- **alacritty** — GPU-accelerated terminal emulator. Fast, simple, cross-platform.
  https://github.com/alacritty/alacritty

- **neovim** — Hyperextensible Vim-based text editor. Modern, scriptable, fast.
  https://neovim.io

- **fish** — User-friendly command line shell. Smart completions and syntax highlighting.
  https://fishshell.com

- **fzf** — Fuzzy finder for command line. Search files, history, processes quickly.
  https://github.com/junegunn/fzf

## Communities

Connect with Linux and ArchBang communities:

- **r/archlinux** — Official Arch Linux subreddit. Ask questions, share setups, get help.
  https://reddit.com/r/archlinux

- **r/swaywm** — Sway window manager community. Discussion, tips, rice screenshots.
  https://reddit.com/r/swaywm

- **Arch Linux Forums** — Official support and discussion forums.
  https://bbs.archlinux.org

- **ArchBang Forum** — ArchBang-specific community and support.
  https://archbang.org

## Curated Resources

Guides, documentation, and learning materials:

- **Arch Linux Wiki** — Comprehensive documentation for Arch and ArchBang.
  https://wiki.archlinux.org

- **Linux from Scratch** — Build a Linux system from source. Deep learning resource.
  https://www.linuxfromscratch.org

- **The Linux Foundation** — Official Linux news, kernel information, certifications.
  https://www.linuxfoundation.org

- **Bash Guide for Beginners** — Learn shell scripting fundamentals.
  https://www.gnu.org/software/bash/manual/

---

**Last updated:** 2026-03-19

*This page is actively maintained. Found a great resource? Open an issue or let me know!*
```

- [ ] **Step 3: Verify links page renders correctly**

Run: `grep -c "^- \*\*" content/links/_index.md`

Expected: Should count at least 10+ links (tools, communities, resources)

- [ ] **Step 4: Commit**

```bash
git add content/links/_index.md
git commit -m "feat: expand links page with tools, communities, resources"
```

---

## Task 3: Create Archive Page

**Files:**
- Create: `content/archive/_index.md`

- [ ] **Step 1: Create archive file**

Run: `touch content/archive/_index.md`

- [ ] **Step 2: Write archive page content**

Write to `content/archive/_index.md`:

```markdown
+++
title = "Archive"
date = "2026-03-19"
draft = false
+++

All posts organized chronologically.

## 2026

### March

- **19 Mar** — [Welcome](/posts/welcome/) `#linux` `#tips`

---

**Browse by tag:** [configuration](/tags/configuration/) · [installation](/tags/installation/) · [tools](/tags/tools/) · [troubleshooting](/tags/troubleshooting/) · [tips](/tags/tips/) · [packages](/tags/packages/)
```

- [ ] **Step 3: Verify file created**

Run: `test -f content/archive/_index.md && echo "Archive page created"`

Expected: "Archive page created"

- [ ] **Step 4: Commit**

```bash
git add content/archive/_index.md
git commit -m "feat: create archive page for chronological post browsing"
```

---

## Task 4: Add Archive Link to Navigation Menu

**Files:**
- Modify: `hugo.toml`

- [ ] **Step 1: Read current hugo.toml**

Run: `cat hugo.toml | grep -A 20 "menu.main"`

Shows current menu items. We'll add Archive.

- [ ] **Step 2: Add Archive menu item to hugo.toml**

Find the menu section:
```toml
[[menu.main]]
  identifier = 'links'
  name = 'Links'
  url = '/links'
```

Add after it:
```toml
[[menu.main]]
  identifier = 'archive'
  name = 'Archive'
  url = '/archive'
```

- [ ] **Step 3: Verify menu config is valid TOML**

Run: `grep -A 4 "identifier = 'archive'" hugo.toml`

Expected: Should show the Archive menu item

- [ ] **Step 4: Commit**

```bash
git add hugo.toml
git commit -m "feat: add archive link to main navigation menu"
```

---

## Task 5: Create Tag Cloud Partial

**Files:**
- Create: `layouts/partials/tag-cloud.html`

- [ ] **Step 1: Create partials directory if it doesn't exist**

Run: `mkdir -p layouts/partials`

- [ ] **Step 2: Create tag-cloud.html partial**

Write to `layouts/partials/tag-cloud.html`:

```html
{{ if .Site.Taxonomies.tags }}
<div class="tag-cloud">
  <p class="tag-cloud-label">Browse by tag:</p>
  {{ $sorted := .Site.Taxonomies.tags.ByCount }}
  {{ range $sorted }}
    <a href="{{ .Page.RelPermalink }}" class="tag-link">{{ .Page.Title }}</a>
    {{ if ne (index $sorted (add 1 (index $sorted .))) nil }} · {{ end }}
  {{ end }}
</div>
{{ end }}
```

- [ ] **Step 3: Verify file created**

Run: `test -f layouts/partials/tag-cloud.html && echo "Tag cloud partial created"`

Expected: "Tag cloud partial created"

- [ ] **Step 4: Add tag-cloud to footer**

Read the theme's footer partial:
```bash
cat themes/terminal/layouts/partials/footer.html | head -20
```

Check if it has `extended_footer.html` inclusion. If not, we'll add tag-cloud to the extended footer.

Create/modify `layouts/partials/extended_footer.html`:

```html
{{ if templates.Exists "partials/tag-cloud.html" }}
  {{ partial "tag-cloud.html" . }}
{{ end }}
```

- [ ] **Step 5: Add CSS for tag cloud to static/style.css**

Append to `static/style.css`:

```css
/* Tag cloud styling */
.tag-cloud {
  margin-top: 2rem;
  padding: 1rem 0;
  border-top: 1px solid #6b9f7f;
  font-size: 0.95rem;
}

.tag-cloud-label {
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #6b9f7f;
}

.tag-cloud .tag-link {
  display: inline;
  margin: 0 0.3rem;
  color: #6b9f7f;
  text-decoration: none;
}

.tag-cloud .tag-link:hover {
  text-decoration: underline;
  color: #5a8b6e;
}
```

- [ ] **Step 6: Commit**

```bash
git add layouts/partials/tag-cloud.html layouts/partials/extended_footer.html static/style.css
git commit -m "feat: add tag cloud widget to footer for easy tag browsing"
```

---

## Task 6: Create Related Posts Partial

**Files:**
- Create: `layouts/partials/related-posts.html`

- [ ] **Step 1: Create related-posts.html partial**

Write to `layouts/partials/related-posts.html`:

```html
{{ $page := . }}
{{ $related := where (where .Site.RegularPages "Section" $page.Section) "Tags" "intersect" $page.Tags }}
{{ $related = without $related $page }}
{{ range (first 3 $related) }}
  {{ if eq (len $related) 0 }}
  {{ else }}
    {{ if eq (index $related 0) $page }}
    {{ else }}
      <div class="related-posts">
        <h3>Related Posts</h3>
        <ul>
          {{ range first 3 $related }}
            <li><a href="{{ .RelPermalink }}">{{ .Title }}</a></li>
          {{ end }}
        </ul>
      </div>
      {{ break }}
    {{ end }}
  {{ end }}
{{ end }}
```

- [ ] **Step 2: Verify file created**

Run: `test -f layouts/partials/related-posts.html && echo "Related posts partial created"`

Expected: "Related posts partial created"

- [ ] **Step 3: Add related-posts to post layout**

Check if Terminal theme has a post layout:
```bash
ls -la themes/terminal/layouts/_default/
```

Should show `single.html`. We need to include the related-posts partial.

Create `layouts/_default/single.html` to override the theme:

```html
{{ define "main" }}
  {{ partial "post.html" . }}
  {{ if eq .Type "posts" }}
    {{ partial "related-posts.html" . }}
  {{ end }}
{{ end }}
```

(Note: Exact structure depends on theme. Check theme's single.html first.)

Actually, simpler approach: Create `layouts/partials/extended_post.html` if the theme supports it, or modify the theme directly.

For now, let's add related posts to the end of posts via a custom partial that wraps the post content. We'll create:

`layouts/posts/single.html`:

```html
{{ define "main" }}
  <article class="post">
    {{ .Content }}
  </article>
  {{ if gt (len .Tags) 0 }}
    {{ partial "related-posts.html" . }}
  {{ end }}
{{ end }}
```

- [ ] **Step 4: Add CSS for related posts**

Append to `static/style.css`:

```css
/* Related posts styling */
.related-posts {
  margin-top: 2rem;
  padding: 1rem;
  border-left: 3px solid #6b9f7f;
  background-color: rgba(107, 159, 127, 0.05);
}

.related-posts h3 {
  margin-top: 0;
  color: #6b9f7f;
}

.related-posts ul {
  list-style: none;
  padding-left: 0;
}

.related-posts li {
  margin: 0.5rem 0;
}

.related-posts a {
  color: #6b9f7f;
  text-decoration: none;
}

.related-posts a:hover {
  text-decoration: underline;
}
```

- [ ] **Step 5: Commit**

```bash
git add layouts/partials/related-posts.html layouts/posts/single.html static/style.css
git commit -m "feat: add related posts widget to individual post pages"
```

---

## Task 7: Test All Tag Pages and Navigation

**Files:**
- Test: All generated pages

- [ ] **Step 1: Build the site locally**

Run: `hugo --minify`

Expected: Build succeeds with no errors. Check output:
```
Start building sites …
...
Total in XXX ms
```

- [ ] **Step 2: Verify tag pages generated**

Run: `ls -la docs/tags/`

Expected: Should show directories for each tag: `configuration/`, `installation/`, `tools/`, `troubleshooting/`, `tips/`, `packages/`

- [ ] **Step 3: Verify archive page generated**

Run: `test -f docs/archive/index.html && echo "Archive page generated"`

Expected: "Archive page generated"

- [ ] **Step 4: Verify links page generated**

Run: `grep -c "sway\|alacritty\|archlinux" docs/links/index.html`

Expected: Should find multiple links (count > 0)

- [ ] **Step 5: Verify tag cloud appears in footer**

Run: `grep -c "tag-cloud\|Browse by tag" docs/index.html`

Expected: Should find tag-cloud in generated HTML (count > 0)

- [ ] **Step 6: Verify related posts appear on post pages**

Run: `grep -c "related-posts\|Related Posts" docs/posts/welcome/index.html`

Expected: Should find related-posts section (count > 0)

- [ ] **Step 7: Verify RSS feed is generated and accessible**

Run: `test -f docs/index.xml && echo "RSS feed exists"`

Expected: "RSS feed exists"

Check feed contains posts:
```bash
grep -c "<title>" docs/index.xml
```

Expected: Should find multiple entries (count >= 3, including site title and posts)

- [ ] **Step 8: Verify navigation menu includes Archive**

Run: `grep -c "Archive" docs/index.html`

Expected: Should find "Archive" in navigation (count > 0)

- [ ] **Step 9: Commit test results**

```bash
git add -A
git commit -m "test: verify all tag pages, archive, links, and navigation work correctly"
```

---

## Task 8: Final Build and Deploy to GitHub Pages

**Files:**
- Deploy: `docs/` directory

- [ ] **Step 1: Ensure all changes are committed**

Run: `git status`

Expected: "On branch main, working tree clean" or "nothing to commit"

- [ ] **Step 2: Run final build**

Run: `hugo --minify`

Expected: Build succeeds with no errors.

- [ ] **Step 3: Stage and commit generated files**

Run: `git add docs/ && git commit -m "build: regenerate site with new discoverability features"`

- [ ] **Step 4: Push to GitHub**

Run: `git push origin main`

Expected: Push succeeds, shows something like:
```
To https://github.com/mrgreen3/mrgreen3.github.io.git
   abc1234..def5678  main -> main
```

- [ ] **Step 5: Verify deployment**

Wait 30 seconds for GitHub Pages to build, then open: https://mrgreen3.github.io/

Check:
- [ ] Homepage loads with tag cloud in footer
- [ ] Tag pages work (click a tag, see all posts with that tag)
- [ ] Archive page loads and shows posts
- [ ] Links page shows all tools, communities, resources
- [ ] Individual post shows related posts section
- [ ] RSS feed is accessible: https://mrgreen3.github.io/index.xml
- [ ] Navigation menu shows About, Posts, Links, Archive

- [ ] **Step 6: Final commit summary**

Run:
```bash
git log --oneline -5
```

Should show recent commits:
- "build: regenerate site with new discoverability features"
- "test: verify all tag pages, archive, links, and navigation work correctly"
- "feat: add related posts widget to individual post pages"
- "feat: add tag cloud widget to footer for easy tag browsing"
- "feat: add archive link to main navigation menu"

---

## Success Criteria

✅ All posts tagged with primary `linux` + one or more subtopic tags
✅ Tag pages auto-generated and accessible
✅ Links page curated with tools, communities, resources
✅ Archive page exists and shows posts chronologically
✅ Tag cloud widget appears in footer for easy browsing
✅ Related posts shown on individual post pages
✅ Archive link added to main navigation menu
✅ RSS feed discoverable and functional
✅ Site deployed to GitHub Pages
✅ All features tested and working

---

## Implementation Notes

- **Tag system:** No configuration changes needed. Just add tags to front matter.
- **Tag pages:** Hugo's Terminal theme handles auto-generation. No custom code required.
- **Partials:** Keep simple and focused. Follow Terminal theme's minimal aesthetic.
- **CSS:** Add to existing `static/style.css` for green color consistency.
- **Posts:** As you write more posts, just follow the tagging pattern (primary `linux` + subtopic).
- **RSS:** Already works; just ensure it's discoverable via footer/menu.

---

## Rollback Plan

If something breaks during implementation:
- Revert last commit: `git revert HEAD`
- Or reset to before changes: `git reset --hard HEAD~N` (where N = number of commits to undo)
- Rebuild: `hugo --minify && git push`

