+++
title = 'Building GreenBang: A Wayland-First Alpine Linux Live ISO'
date = "2026-04-03"
draft = false
tags = ['linux', 'alpine', 'wayland', 'labwc']
+++

I wanted a systemd-free version of ArchBang. Something minimal, keyboard-driven, and built on Alpine Linux instead. The name—GreenBang—references Alpine's green branding and my own username, and it became the foundation for a distro that strips away the overhead while keeping the philosophy: intentional, lean, dark Wayland desktop with no cruft.

That project is GreenBang, and it's still very much in beta.

## Why Alpine? Why Wayland?

Alpine is ruthlessly lean. A base ISO is measured in megabytes, not gigabytes. That's the core philosophy here—do more with less. Wayland felt like the right move because X11 is aging, and if I'm building something new, why carry legacy baggage?

The challenge: Alpine's build system is fundamentally different from anything I'd worked with before. It uses `mkimage.sh` and overlays, not Arch's airootfs. Two separate files that have to stay in perfect sync: a profile that declares what packages exist on the ISO, and an overlay script that configures what actually loads at boot. Get them out of sync and packages silently fail to install. I learned that the hard way.

## What Actually Works

Right now, I can boot the ISO into a Wayland session. labwc starts. The user gets created. NetworkManager handles wired and wireless. waybar renders. foot terminal launches. It's *functional*. Not pretty yet, not complete, but it boots and does things.

That took longer than it should have. Shell sourcing issues, missing dependencies, overlay structure gotchas—Alpine doesn't hold your hand the way some distros do. The documentation is thin. You read C code and source scripts to understand how things work.

## What's Still Ahead

Plenty. There are gaps to fill, configurations to polish, and a few things I want that aren't quite there yet. Some will land quickly. Others will take time. I'd rather get it right than rush it out.

## The Personal Part

This is a side project, not a product. There's no timeline, no roadmap beyond "make it usable." Some days I push a commit. Some days it sits. When I do work on it, I'm usually testing builds in QEMU on a VM, iterating through failed boots and profile tweaks.

I'd be lying if I didn't mention that Claude Code has done most of the heavy lifting—building the profiles, wrangling the overlay scripts, debugging the alpine build system quirks. At first it felt like cheating. But the real work has been mine: understanding what's broken, knowing what the fix *should* look like, and directing the approach. That's where my Linux experience actually matters. Anyone can run a build. Actually knowing *why* it failed and what to try next? That part is still all me.

It's therapeutic, honestly. In a world of bloated desktops and frameworks, there's something satisfying about making something minimal that's *yours*.

GreenBang is very much work in progress. Until then, it's a thing I'm building, learning Alpine's quirks, and slowly moving closer to something I'd actually use as a daily driver.
