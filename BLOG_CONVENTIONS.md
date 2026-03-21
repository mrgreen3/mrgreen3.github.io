# Blog Publishing Conventions

## Gmail
Search query: label:greenblog from:mr.k.clarke@gmail.com is:unread

## Repository Structure
- Posts go in: `content/posts/`
- Filename format: `YYYY-MM-DD-slug-here.md`
- Hugo builds to: `docs/`
- Theme: risotto

## Frontmatter Template
+++
title = 'Post Title Here'
date = "2026-03-21"
draft = false
tags = ['tag1', 'tag2']
+++

## Style Guide
- Voice: casual, technical, first person
- Audience: Linux users, ArchBang community
- Keep it concise — this is a blog not a manual
- Code blocks for any commands or config snippets
- No AI waffle — write like Kev would write it
```

---

**The prompt to use each time you want to publish:**
```
Read BLOG_CONVENTIONS.md then create and publish a new blog post 
using the following draft content:

[paste the approved markdown from Claude.ai here]

- Generate an appropriate slug from the title
- Use today's date
- Place the file in content/posts/
- Commit with message "Add post: [title]"
- Push to main
