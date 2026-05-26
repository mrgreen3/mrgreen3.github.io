+++
title = "GreenClaw Moves to Hermes"
date = 2026-05-26
path = "from-openclaw-to-hermes"

[taxonomies]
tags = ["ai", "linux", "self-hosted", "hermes", "tools"]
+++

GreenClaw has a new engine. As of today it's running on [Hermes](https://hermes-agent.nousresearch.com) rather than OpenClaw.

The short version: OpenClaw worked, but token burn was a real problem. Hitting limits quickly when in active use made it impractical for anything sustained. Hermes is the replacement — same idea, different implementation, with better controls over where the expensive models actually get used.

## What Changed

The server itself didn't move. Still the same Lenovo ThinkCentre M710Q on Arch, still headless, still talking over Telegram. What changed is the agent framework underneath.

Hermes runs [Claude](https://anthropic.com/claude) as the main model but lets you assign lighter models to background tasks — compressing context, routing decisions, naming conversations, MCP calls. Those are now handled by Claude Haiku rather than burning Sonnet tokens on every internal housekeeping step. The main conversation stays on Sonnet where the quality actually matters.

## What We Did Today

First session with the new setup covered a fair bit:

- Confirmed [n8n](https://n8n.io) was still running with the Archbang email workflows intact — `Archbang Mail Notifier` and `Check Mail on Demand` both active
- Ran a full system update (`pacman -Syu`) — cloudflared, libisoburn, libisofs, libva-intel-driver
- Tuned auxiliary model assignments to use Haiku for background tasks
- Cloned the blog repos (`mrgreen/blog` and `mrgreen/pages`) fresh, confirmed the deploy pipeline still works
- This post

## The Blog Workflow

No change here. I write or ask GreenClaw to draft, I read it, it publishes. The [Codeberg](https://codeberg.org/mrgreen/blog) repo holds the Zola source, `deploy.sh` builds and pushes to the [pages repo](https://codeberg.org/mrgreen/pages). That hasn't changed and isn't changing.

## On Token Burn

It's worth being honest about: AI assistants running on API billing are expensive if you're not careful. The OpenClaw setup didn't give much visibility or control over where tokens went. Hermes at least makes it configurable — you can point auxiliary tasks at cheaper models and reserve the capable ones for actual reasoning.

Whether that's enough in practice is something I'll find out over the next few weeks.
