+++
title = "FruitBANG: ArchBang Gets a Mango"
date = 2026-05-22
path = "fruitbang-archbang-mangowm"

[taxonomies]
tags = ["archbang", "linux", "wayland", "wm"]
+++

FruitBANG is my latest experiment — an ArchBang ISO variant that swaps out labwc for MangoWM.

MangoWM is a Wayland compositor in the dwl lineage — dwl being a Wayland port of dwm. If you know dwm, you already have the mental model: tag-based layout, keyboard-driven, minimal config, no framework overhead. I'd been running it on my desktop for a couple of weeks and liked it enough to want it in an ISO.

## Why a Separate ISO?

ArchBang already does what it does well. Swapping the compositor in place would mean diverging the main build and maintaining something harder to reason about. A fork keeps things clean — FruitBANG is its own thing, built on the same archiso foundation, just with a different compositor and the configs to match.

## What's In It

The stack is the same as my desktop setup:

- **MangoWM** as the compositor
- **waybar** for the panel
- **foot** as the terminal
- **rofi** as the launcher
- **mako** for notifications
- **swaybg** for wallpaper

Boot to a working Wayland session with a tiling window manager that gets out of your way.

## Current State

It builds. It boots. It works. Whether it's daily-driver ready depends on how much you like figuring things out — the MangoWM ecosystem is smaller than Hyprland or sway, and documentation is thin in places.

ISOs and source are up on the ArchBang site if you want to try it.
