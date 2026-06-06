+++
title = "GreenWire: A Poor Man's AI Agent"
date = 2026-06-06
path = "greenwire-poor-mans-ai-agent"

[taxonomies]
tags = ["ai", "linux", "python", "self-hosted", "tools"]
+++

I keep seeing people build elaborate AI agent frameworks — multi-node orchestration, vector stores, retrieval pipelines, YAML config files stretching to three hundred lines. It's impressive engineering. It's also overkill for what I actually need, which is: talk to Claude from my phone, have it run a command on my server, and not cost me more than a few cents a day to do it.

GreenWire is my answer to that. It's a single Python file — just over three hundred lines including blank lines and comments — that wraps the Anthropic API into something that feels like an agent without any of the framework ceremony.

## What It Is

At its core GreenWire is a message loop. You give it a prompt, it sends that to Claude (Haiku by default, because Haiku is fast and cheap), Claude optionally calls one of a handful of tools, the loop executes those tools on the machine, feeds the results back, and you get a reply. That's it. The conversation history is kept in memory for the session, so follow-up questions work the way you'd expect.

There are two front ends. Run it without arguments and you get a plain terminal REPL — type a prompt, get a reply, Ctrl-D to quit. Run it with `--telegram` and it becomes a long-polling Telegram bot, locked to a single whitelisted chat ID so only I can talk to it.

I use the Telegram mode almost exclusively. My phone is always with me; my server is in the next room running headless. Being able to ping it a question — "what's the disk usage on the media drive?", "did that cron job run last night?", "make a note that I need to check the nginx cert next week" — without opening an SSH session is genuinely useful. It's the difference between doing something and not doing it.

## The Tools

Claude has access to three tools. `run_shell` does what it says: runs an arbitrary shell command on the box and returns stdout, stderr, and the exit code. This is the workhorse. Claude can check `df -h`, grep a log file, restart a service, do a git pull — anything I'd do at a terminal myself. I thought hard about whether to constrain this and decided against it. I'm the only one talking to the bot, the box is on my LAN, and the friction of a restricted tool list is worse than the (theoretical) risk of Claude running something unintended. It hasn't happened yet.

`add_note` and `list_notes` are a simple append-only notes file. When I say "note that X" or "remember Y", Claude writes a timestamped line to `~/notes.md`. When I ask "what did I write down about the OctoPrint setup?", it reads it back. Nothing clever — just a flat file with a timestamp prefix per line. I've found I use it more than I expected for capturing things I'd otherwise have to dig out of a chat history or a browser tab.

## Handing Off to Claude Code

The interesting part is the `cc` prefix. Type `cc <prompt>` or `ask cc <prompt>`, and GreenWire doesn't send the message to the API loop at all. Instead it shells out to the `claude` CLI — Claude Code — in headless mode with full autonomy, waits up to fifteen minutes for it to finish, and returns whatever it printed.

This matters because Claude Haiku in a short tool loop is good at operational tasks: check a thing, run a command, report back. It's bad at things that require judgment across a large codebase, multi-step reasoning, or file editing with context. Claude Code is a different beast — it has the whole repo in context, it can read and write files with care, it understands project structure. The `cc` escape hatch lets me get to that power without building it into GreenWire itself.

There's also a `blog` prefix that's a specific canned version of this: `blog <topic>` constructs a detailed prompt for Claude Code that includes the content directory path, frontmatter format, filename conventions, and the git commands to commit and push. That's how this post was written and deployed.

## Usage Tracking

Typing `usage` (or `tokens` or `cost`) drops a summary of what the router loop has spent in API tokens today and in total. It's logged as newline-delimited JSON to `~/router/usage.jsonl`, with separate fields for input tokens, output tokens, cache reads, and cache writes, along with a computed cost estimate using the published per-million-token rates.

This only covers the direct API calls through the router. `cc` jobs go through Claude Code's own billing, which it tracks separately. The split is intentional — the two paths have very different cost profiles and I wanted to see them independently.

The numbers are reassuring. Haiku is genuinely cheap for this use case. A day's worth of casual queries — a dozen or so short interactions — runs to a cent or two. Even days where I lean on it harder haven't broken ten cents. For a box that's already running 24/7 and already costing me electricity, that's fine.

## What It Isn't

GreenWire has no persistence between sessions for the Haiku conversation history. Restart the process, the context is gone. This is a deliberate tradeoff — the notes file covers the "remember this" use case, and most of what I'm doing is stateless enough that session context doesn't matter. Adding a persistent message store would complicate the code for a benefit I don't actually need day to day.

It also has no rate limiting, no retry logic, no structured logging beyond the usage file. If the Anthropic API returns an error, Python raises an exception and you see it. That's fine for a single-user setup on a server I monitor. It would need work before it could run unsupervised at any scale.

## Why Not Just Use OpenClaw

The honest answer is that GreenWire predates the OpenClaw integration and is simpler to reason about. OpenClaw is a full workspace — it has the gateway process, the Claude Code session with memory and projects, the whole apparatus. That's the right tool for development work. GreenWire is the right tool for "I'm in bed and want to know if the cron job ran." They coexist on the same machine and serve different moments.

The three-hundred-line constraint is also meaningful to me. I can read the whole thing in five minutes. I can debug it without a stack trace that spans four libraries. If something breaks, I know where to look. That's worth something.

The code is at [github.com/mrgreen-archbang/router](https://github.com/mrgreen-archbang/router) if you want to look at it or lift from it.
