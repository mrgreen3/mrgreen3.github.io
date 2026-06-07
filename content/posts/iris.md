+++
title = 'Iris: a Telegram bridge to Claude on my home server'
date = "2026-06-07"
draft = false
tags = ['ai', 'homelab', 'self-hosting', 'python']
+++

A few months ago my AI workflow was entirely on my laptop: open a browser, navigate to Claude, type a thing, wait. Fine for deep work but useless when I'm away from the desk and want to check on the server, jot something down, or kick off a task while I'm mobile.

Iris fixes that. It's a small Python process running on my Lenovo M710q home server — a headless Arch box, no display, boots to TTY — and it bridges Telegram to Claude. One message to the bot and the server responds.

## The default channel

Send anything to the bot and it hits a Claude Haiku 4.5 agentic loop. Haiku because it's cheap and fast enough for the things I actually ask: check disk space, what's in my notes, is that service running, tail the log. The loop has three tools — `run_shell`, `add_note`, `list_notes` — and it runs until Haiku decides it's done.

There are spend guards. A daily alert at $0.50 and a hard cap at $2.00. After 22:00 messages are silently dropped because I don't need the server talking to me in the middle of the night. The bot is locked to my chat ID; anyone else gets a one-word reply.

## The iris trigger

`iris <prompt>` or `ask iris <prompt>` escalates the job out of the Haiku loop entirely. Iris shells out to the Claude Code CLI in headless mode, passes the prompt, and waits up to fifteen minutes for a result.

This is for the jobs Haiku can't meaningfully do in one shot: refactoring code, writing longer documents, multi-step tasks that need full agentic autonomy. Claude Code gets `--dangerously-skip-permissions` and a 20-calls-per-day budget before it's blocked. That keeps costs predictable while still letting me hand off genuinely complex work from my phone.

## The local channel

`g <prompt>` bypasses the API entirely. It hits Ollama running locally on the same box, routing to `qwen2.5:3b-instruct`. Same tool loop as the Haiku channel — shell, notes — but zero cost and no internet round-trip. Fast for quick lookups. Not as sharp for anything that needs reasoning depth, but it doesn't need to be.

Three channels, three cost tiers: free local, cheap API, full Claude Code.

## The blog flow

`blog <topic>` is the one that made me actually use this. The command routes through the iris trigger, and Claude Code's job is to write a complete post, drop it in `~/blog/content/posts/`, commit it, and push. GitHub Actions handles the deploy from there.

The prompt Iris passes down specifies frontmatter format, the content directory, the slug convention — enough that the output lands in the right place without me touching anything on the server. By the time I put my phone down the post is in a PR or already live.

It's not always perfect on the first pass, but it's good enough to iterate from. Beats staring at a blank file.

## The shape of it

The whole thing is one Python file, around 490 lines. The Telegram side is a long-poll loop — no webhook, no reverse proxy dependency for the bot itself. Secrets in a `.env` file. Usage logged to a JSONL file per call so I can see what it's costing over time.

It runs as a systemd user service, starts at boot, auto-restarts on failure. The machine was purpose-built for this kind of always-on low-overhead work: mini form factor, fanless-quiet, draws maybe 10W at idle.

Iris isn't a product. It's infrastructure I built for myself, and it shows — the channel routing is a handful of `startswith()` checks, the error handling is minimal, the sleep window is hardcoded. But it does exactly what I need and nothing else. That's the right shape for a personal tool.

*MrG*
