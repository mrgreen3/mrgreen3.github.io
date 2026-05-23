+++
title = "Getting Claude to Manage My Blog (The Hard Way)"
date = 2026-05-23
path = "claude-mcp-github"

[taxonomies]
tags = ["ai", "linux", "tools", "mcp", "github"]
+++

I wanted Claude to manage this blog. Not just draft posts — actually push them. Read files, edit them, commit, done. No copy-pasting, no manual git, no faff. I had no particular plan for how that would work. I just told Claude what I wanted and left Claude to figure it out.

That turns out to be a reasonable way to approach this kind of problem.

## The Zapier Route

Claude.ai supports MCP connectors — a way to give Claude access to external tools and services. Zapier has an MCP endpoint, and Zapier has a GitHub integration. Claude started there.

It mostly worked. Claude could find repositories, read issue and pull request data. Then came the first wall.

Zapier's GitHub integration has a "Create or Update File" action, which sounds right. The problem is that GitHub's API requires a SHA when updating an existing file — a concurrency check. To get the SHA you need to call the Contents API, and Zapier's GitHub integration has no action that does that. It can find repositories, branches, issues. It cannot read a file.

So updating an existing file meant: Claude asks me for the SHA, I run a curl command in the terminal, paste it back into chat, then Claude pushes the update. Every. Single. Time.

```bash
curl https://api.github.com/repos/mrgreen3/mrgreen3.github.io/contents/content/links.md \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['sha'])"
```

That is not blog management. That is assisted manual labour.

## Why Not Just Hit the GitHub API Directly?

Claude can fetch URLs, but the claude.ai sandbox blocks `api.github.com` — the unauthenticated API was rate-limiting from the container's IP almost immediately. Raw GitHub URLs that do work don't return the file SHA anyway.

A personal access token would have solved it, but that means tokens in chat history and things to maintain. Claude kept looking.

## The Actual Fix

Claude.ai supports adding custom MCP servers directly, under Settings → Connectors → Add custom connector. The official GitHub MCP server runs at:

```
https://api.githubcopilot.com/mcp/
```

It authenticates via OAuth — connect your GitHub account, done. No tokens, no Zapier middleman, no workarounds.

Once connected, Claude gets proper GitHub tools: `get_file_contents` (which returns the SHA alongside the content), `create_or_update_file`, `push_files`. Everything needed to read a file, modify it, and push the result — without any input from me.

First real test was removing a dead link from the links page. Claude read the file, retrieved the SHA automatically, made the edit, committed. I didn't touch the terminal.

## There Are Always More Ways

What struck me about this is that I had no idea any of this infrastructure existed. MCP servers, Zapier's GitHub limitations, the official GitHub MCP endpoint — I wouldn't have known where to start. Claude worked through the options methodically: tried Zapier, hit the wall, identified why, looked for alternatives, found the right tool, connected it, and got the job done.

That's the part that's actually useful. Not that Claude can push a markdown file to GitHub — I can do that myself in thirty seconds. It's that Claude can figure out *how* to do something I didn't know how to set up, try multiple approaches when the first one doesn't work, and arrive at a clean solution without me having to understand the problem space at all.

## What's Connected Now

- **GitHub MCP** — reads and writes files in this repo directly. Zapier's GitHub integration is now disabled.
- **Zapier** — still handling WordPress (archbang.org), where it's capable enough for the job.

## The State of Things

Claude can now read any file in this repo, edit it, and push the result. New posts, page edits, link updates — all from a chat conversation. The SHA problem is gone because Claude retrieves it as part of reading the file.

The setup is clean. One OAuth connection, no tokens, no workarounds. Claude did the legwork. I made a cup of tea.
