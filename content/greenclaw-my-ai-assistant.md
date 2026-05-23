+++
title = "GreenClaw: My AI Assistant Lives on the Server Now"
date = 2026-05-14
path = "greenclaw-my-ai-assistant"

[taxonomies]
tags = ["ai", "linux", "self-hosted", "tools"]
+++

I've been running an AI assistant on my M710Q for a few days now. It's called GreenClaw — I named it, it seemed to appreciate that.

It's built on [OpenClaw](https://openclaw.ai), which is basically a framework for running a persistent AI agent on your own hardware. Not a chatbot you visit in a browser tab. Something that actually lives on the machine, has access to the filesystem, can run commands, and remembers things between conversations. I talk to it over Telegram.

## What It Actually Does

Practical stuff so far:

- Ran a full system update (`pacman -Syu`) and rebooted the server on request
- Set up OctoPrint integration — can check printer status, temps, and job progress from Telegram
- Cloned this blog's source repo, installed Zola, wired up SSH keys to Codeberg, and is now capable of writing and deploying posts
- This post is its first one

It's not magic. It's a capable model with shell access and some context about my setup. The difference from a chat interface is that it persists — it knows it's running on a Lenovo M710Q, knows the blog workflow, knows the OctoPrint endpoint. It doesn't need re-briefing every session.

## The Setup

The server is a Lenovo ThinkCentre M710Q running Arch. It's a tiny form factor machine — Intel Core i5-7400T (4 cores, up to 3GHz), 16GB RAM, 500GB main SSD and a 240GB NVMe. Low power, quiet, always on. It was already running OctoPrint for the Anycubic Kobra Neo. GreenClaw is just another service on the same box.

I communicate through Telegram. GreenClaw receives messages, does things, replies. It won't take external actions without checking first — no sending emails, no pushing code, nothing public without my sign-off.

## Reservations

I'm not handing it the keys to everything. It has access to what I've given it access to. SSH keys exist, but only for Codeberg. OctoPrint access, but read-heavy. The model is capable of making mistakes and I treat its output accordingly — reviewed before anything goes live.

The blog workflow specifically: it writes, I read, then it publishes. That's the deal.

## So Far

It's useful in the way a competent person with terminal access is useful — you can delegate things without explaining from scratch every time. Whether that stays true as the setup grows is something I'll find out.

More posts to follow. Some of them will even be written by me.
