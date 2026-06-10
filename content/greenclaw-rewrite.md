+++
title = "GreenClaw: The Rewrite"
date = 2026-06-10
path = "greenclaw-rewrite"

[taxonomies]
tags = ["ai", "linux", "python", "self-hosted", "tools"]
+++

GreenWire was a first cut at an idea I'd been chewing on for a while: a small, honest AI bridge that lives on a box I already own, talks to me on Telegram, and doesn't cost me anything I haven't already agreed to pay for. I wrote it in an afternoon, ran it for a week or two, and learned what I actually wanted out of it. This post is about the rewrite — same idea, different shape, kept what worked, threw out what didn't.

The new version is called GreenClaw. The code is at [github.com/mrgreen3/greenclaw](https://github.com/mrgreen3/greenclaw).

## What the rewrite changes

**No metered path.** Everything that goes to Claude runs through Claude Code over my claude.ai Pro subscription — OAuth session, flat-rate, no API key, no per-token billing. I never wanted to operate on metered credits and I don't. GreenWire had an `ANTHROPIC_API_KEY` lying around for an experimental direct-Haiku loop, and the danger was that the key being present in the environment could make Claude Code fall back to billing API credits instead of using the OAuth session. GreenClaw removes the trap entirely: `ask_cc()` builds a clean subprocess environment with the key stripped out, so Claude Code always uses Pro. If something breaks it breaks cleanly; it can't silently slip onto a billing path.

**Qwen-first by default.** I have an Ollama install on the same box running `qwen2.5:3b-instruct`. It's small, free, and instant. In GreenClaw the local model is the first responder for every un-prefixed message. It handles what it can — shell inspection, file reads, simple questions — and delegates to Claude Code via a `delegate_to_cc` tool only when it needs reach it doesn't have. That covers email, the web, GitHub, anything multi-step. The result is that most casual queries never leave the house.

**No timers.** GreenWire had an hourly mail-check loop that called the API in the background. I pulled that out and made a `/mail` skill instead. The principle is now explicit in the project rules: nothing runs on a timer, no scheduled or background CC invocations, ever. Claude Code only runs when a message or a triggered skill actually needs it. The reason is partly philosophical and partly practical — headless `claude -p` is automated use, which from 2026-06-15 draws a separate paid Agent SDK credit pool rather than the Pro subscription. Better to stay clearly inside ordinary individual use.

## Skills

The biggest structural change. Capabilities don't live in code anymore — they live in `skills/*.md` as markdown recipes. The gateway stays static; adding a capability means dropping a file and restarting. No `route()` edits.

A skill is just front matter plus a body:

```markdown
---
name: system-health
description: Check disk, memory, load, and the bot service.
exposes: local
trigger: /health
locked: false
source: owner
---

Run df -h, free -h, and uptime. Summarise in a few lines, flag anything off.
```

The gateway reads only front matter at boot, so skills don't eat into the local model's context just by existing. Bodies load on demand the turn they actually run. Skills marked `locked: true` only run if their name is listed in `skills.allow` — that's the safety catch for anything with reach or anything destructive. The shipped `blog-post` skill is locked by default; the mail skill is locked but armed.

There's also a built-in `/cheat` (not a skill — a route in the gateway itself) that reads `static/cheat.md` for the static text and substitutes the current skills list from the live `SKILLS` dict. Instant, no LLM involved, accurate by construction. I tried doing it as a skill first; Qwen 2.5 3B choked on the multi-line python in the body and replied "(no reply)". The lesson there was: if a thing doesn't need a model, don't route it through one.

## Tasks

Skills are recipes for *what to do* with a message. Tasks are connectors for *how messages get in and out*.

A task is a Python module in `tasks/` that exposes one function:

```python
def start(on_message):
    # loop forever; for each incoming message call
    #   on_message(text, reply)
    # where reply(text) sends the answer back on the same channel
```

Today there's exactly one task: `tasks/telegram.py`. It long-polls the Bot API, locks to a single chat ID, dispatches each incoming message in a worker thread so 15-minute Claude Code calls never freeze the poll loop. Adding another connector — Signal, Discord, an MQTT topic, a local Unix socket — means dropping `tasks/signal.py` in the folder and restarting. No flags, no wiring. The core gateway is dispatch-only and doesn't know which connector a message came in on.

This is the bit I'm most pleased with. GreenWire had Telegram bolted into the main loop; pulling it out into a generic task layer was an hour's work and immediately made the whole thing feel cleaner.

## What stayed the same

A lot. The shape is the same as GreenWire: single Python file, a tools list, a tool dispatch function, a long-poll Telegram front end, a `cc`/`gc` prefix system, a notes file for "remember this", and a hard rule against adding abstraction the project doesn't need. The README still says "Lean and auditable over clever." That hasn't changed and isn't going to.

The single-file constraint matters more than I expected. The whole gateway is about five hundred lines. I can read it in five minutes. I can debug it without a stack trace that spans four libraries. When I added skills, then tasks, then the cheat sheet, the file grew but stayed comprehensible. The day it stops being comprehensible is the day I split it.

## What's next

Three small things I'm thinking about:

- **Model-authored skills** — let Claude Code (or Qwen) write a new skill file on request. "Greenclaw, make me a skill that checks whether Ollama is responding" → `skills/ollama-check.md` on disk, live after a reload. The reload bit is the interesting part; today skills load at boot. There's a GitHub issue tracking this.
- **A cheat-sheet style menu for skill selection** — right now skills are explicit-trigger only (`/health`, `/mail`). Eventually the local model should be able to pick a skill from the description menu when no trigger fires. Skills v2.
- **A second task** — probably Signal, maybe a Tailscale-local Unix socket I can pipe into from anywhere on the tailnet. Mostly to prove the tasks layer is doing what I think it's doing.

Nothing on a timer. Nothing that touches a metered API path. Nothing that requires a model to do work a four-line route() check can do faster and more reliably. That's the brief.

The repo is at [github.com/mrgreen3/greenclaw](https://github.com/mrgreen3/greenclaw) if you want to look or lift from it. The README is honest about what it is and isn't — including that it runs `--dangerously-skip-permissions` on Claude Code, which is fine for a sole-user box on a private network and would not be fine for anything else.
