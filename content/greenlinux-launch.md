+++
title = "GreenLinux - The OS That Builds Itself Around You"
date = 2026-05-30
description = "Introducing GreenLinux - a minimal Arch-based operating system with Claude AI as its core interface"
+++

# GreenLinux: The OS That Builds Itself Around You

I've been thinking about Linux distributions wrong for a long time.

Every distro ships with someone's answers. Omarchy ships with DHH's perfect setup — his keybindings, his apps, his workflow, his aesthetic. Ubuntu ships with Canonical's vision of what a desktop should be. Even minimal distros make assumptions about what you need before you've told them anything about yourself.

The paradox is that Linux's greatest strength — infinite customisability — is also its greatest barrier. The person who dares to try Linux for the first time lands in a world of choices they don't yet have the knowledge to make. They reach for the forum, the wiki, the subreddit. They get answers that may or may not apply to their hardware, their needs, their level of experience.

What if instead they just had a friend who knew everything?

## The Idea

GreenLinux ships almost nothing. A minimal Arch base, a Wayland compositor, a terminal. And Claude.

Not Claude the chatbot you visit in a browser. Claude Code — CC — running in your terminal, with full access to your system. Your Arch Wiki. Your forum. Your mentor. Your installer. All in one, all aware of your specific machine and your specific situation.

Ask it anything:
- "How do I connect to WiFi?"
- "I want to play music, what should I install?"
- "Make my terminal look nice"
- "Set up n8n for local automation"
- "Explain what a window manager is"

It answers. It acts. It installs, configures, explains. The system that emerges isn't GreenLinux's vision of a perfect desktop. It's yours.

## Why This Matters

DHH built one perfect Linux desktop — for himself. Millions of people use it and get DHH's workflow whether it suits them or not.

GreenLinux builds a different perfect desktop for every single person who boots it.

The curious teenager gets a system shaped by curiosity. The retired person tired of Windows gets a system shaped by simplicity. The developer gets a system shaped by their specific tools and languages. The privacy-conscious user gets a system shaped by their threat model.

Same base. Infinite outcomes.

## The Stack

```
base linux linux-firmware
networkmanager
sway
foot
nodejs
npm
claude-code
```

That's the entire ISO. Boot → Sway → foot → Claude Code. Everything else is a conversation away.

No browser. No file manager. No media player. No office suite. No assumptions.

## The Problem We Need Solved

GreenLinux has one unsolved problem and it's not technical.

Claude Code requires an Anthropic API key. That key costs money. For GreenLinux to fulfil its mission — bringing the power of AI to anyone who dares to try Linux — there needs to be a mechanism for new users to get their first taste without a credit card barrier at first boot.

This isn't a request for charity. Every person who boots GreenLinux is exactly the kind of curious, independent thinker who becomes a loyal Claude user. We're a distribution channel. We just need the door opened.

If you work at Anthropic and this resonates — we should talk.

## The Seed Is Planted

GreenLinux is early. The repo is at github.com/mrgreen3/greenlinux. The domain is greenlinux.org.

The philosophy is clear. The stack is defined. The mission is simple.

*Anyone who dares to try Linux deserves a guide, not someone else's opinions.*

That's what we're building.
