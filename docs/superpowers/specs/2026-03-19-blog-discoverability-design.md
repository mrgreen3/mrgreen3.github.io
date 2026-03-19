# Blog Discoverability & Organization Design

**Date:** 2026-03-19
**Project:** Mr Green's Linux Blog (mrgreen3.github.io)
**Scope:** Content organization, discovery features, and navigation improvements

---

## Overview

The blog is launching with strong visual design (Terminal theme + green customization) but minimal content structure. As the blog grows, readers need a way to discover and explore posts. This design adds a tag-based discovery system, curated Links hub, and navigation improvements while keeping the minimal aesthetic intact.

**Core principle:** Use Hugo's built-in tag system + simple navigation widgets to enable natural discoverability without heavy SEO optimization or feature bloat.

---

## 1. Tag Structure

### Primary + Subtopic Tagging

Every post uses:
- **Primary tag:** `linux` (consistent, on all posts)
- **Subtopic tags:** One or more from this list as applicable:
  - `configuration` — system configs, dotfiles, setup guides
  - `troubleshooting` — fixes, debugging, error resolution
  - `installation` — install guides, setup procedures
  - `tools` — software reviews, utility recommendations
  - `tips` — quick how-tos, shortcuts, best practices
  - `packages` — package management, pacman, AUR

**Example post front matter:**
```toml
+++
title = "Setting up sway with dotfiles"
tags = ["linux", "configuration", "tools"]
+++
```

### Why This Structure

- **Consistent:** Every post has `linux`, making it easy to filter
- **Flexible:** Subtopics grow naturally as you write (add new tags as needed)
- **Discoverable:** Readers can explore by interest without rigid category hierarchies
- **Minimal effort:** Just tag as you write; Hugo generates the rest

---

## 2. Tag Pages

Hugo automatically generates:
- `/tags/` — Index of all tags
- `/tags/configuration/` — All posts tagged `#configuration`
- `/tags/troubleshooting/` — All posts tagged `#troubleshooting`
- etc.

**No additional configuration needed.** The Terminal theme already supports these pages out of the box.

**User experience:** Readers click a tag on any post and see all related posts.

---

## 3. Links Page (Curated Hub)

The `/links/` page becomes a curated resource hub with three sections:

### Tools & Utilities
- Recommended software relevant to ArchBang/Linux
- Brief 1-2 sentence description per item
- Link to project repo or official site

Example structure:
```
## Tools & Utilities

- **sway** — Tiling Wayland compositor. Minimal, powerful window manager.
  https://swaywm.org

- **alacritty** — GPU-accelerated terminal. Fast, simple, Rust-based.
  https://github.com/alacritty/alacritty
```

### Communities
- Forums, subreddits, Discord servers
- Brief description of what each community focuses on
- Link to community

Example:
```
## Communities

- **r/archlinux** — Official Arch Linux subreddit. Ask questions, share setups.
  https://reddit.com/r/archlinux

- **r/swaywm** — Sway window manager community.
  https://reddit.com/r/swaywm
```

### Curated Resources
- Useful guides, tutorials, articles
- External learning resources
- Mix of official docs and community content

### Layout
Simple sections with clean link lists. No fancy styling—matches Terminal theme aesthetic. Update as you discover/find new resources.

---

## 4. Archive Page

A dedicated `/archive/` page showing all posts chronologically (newest first).

**Structure:** Simple list format:
```
## 2026

### March
- 19 Mar — Setting up sway with dotfiles
- 19 Mar — Welcome

### February
(posts from Feb, if any)
```

**Purpose:**
- Readers can browse everything you've written
- Helps with "I read something about X, where was it?"
- Improves perceived content depth as blog grows

**No implementation complexity:** Can be created as a simple Markdown page with manual updates, or Hugo can auto-generate this via templates.

---

## 5. RSS Feed & Discoverability

### RSS Feed
- Terminal theme includes built-in RSS feed generation at `/index.xml`
- Ensure `publishDir = 'docs'` is set in `hugo.toml` (already done)
- Feed includes post titles, dates, and full content

**Action:** Add RSS link to navigation menu or footer for visibility.

### Tag Cloud / Navigation Widget
Add a simple tag list (footer or sidebar) showing all active tags as clickable links:

Example:
```
Browse by tag: linux · configuration · installation · tools · troubleshooting · tips · packages
```

Each tag is a link to its dedicated page (`/tags/configuration/`, etc.).

**Purpose:** Readers immediately see what content exists and can explore by interest.

---

## 6. Navigation Improvements

### Internal Linking
- When viewing a post, show 2-3 "related posts" by shared tags
- Link tag pages from post pages
- Breadcrumb navigation: Blog > Posts > Tag > Post (if complexity warranted)

### Menu Updates
- Consider adding "Browse by tag" or "Archive" link in main navigation
- Keep main menu minimal (About, Posts, Links, Archive) to match Terminal theme style

---

## 7. Implementation Details

### What Changes
1. **hugo.toml** — Verify tag configuration, add dateFormat for UK dates (already done)
2. **content/links/_index.md** — Add tools, communities, resources (stub already created)
3. **content/archive/_index.md** — Create new archive page
4. **layouts/partials/** (if needed) — Add tag cloud widget and related posts partial
5. **static/style.css** — Adjust tag/archive styling if needed (may already be done)

### What Doesn't Change
- Theme remains Terminal with green customization
- Publishing to GitHub Pages (docs/ folder)
- Post creation workflow (unchanged)

### Hugo Features Used
- **Tags:** Built-in, no configuration needed beyond front matter
- **Tag pages:** Auto-generated by Hugo
- **RSS:** Built-in via Terminal theme
- **Custom pages:** New Markdown files for Archive and improved Links

---

## 8. SEO & Performance

- No heavy SEO optimization (per user preference, "nice to have")
- RSS feed provides natural discoverability for subscribers
- Tag pages help readers explore related content
- Static site remains fast (no changes impact performance)

---

## 9. Success Criteria

✅ Posts can be tagged consistently with primary + subtopic tags
✅ Tag pages are accessible and show all posts with that tag
✅ Links page is curated and useful to readers
✅ Archive page exists and shows all posts chronologically
✅ RSS feed is discoverable and functional
✅ Tag cloud appears somewhere (footer/sidebar/menu) for navigation
✅ Related posts are visible on individual post pages
✅ Navigation remains minimal and matches Terminal aesthetic

---

## 10. Future Extensibility

This design is minimal and lets the blog grow naturally:
- Add new subtopic tags as writing evolves
- Expand Links page as you discover resources
- Archive auto-updates as new posts are added
- Can add search functionality later if needed
- Can refine related posts logic based on what readers find useful

