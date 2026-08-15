+++
title = "GreenBang: A Heavyweight ArchBang with MangoWM and DMS Shell"
date = 2026-08-15
path = "greenbang-mangowm-dms-shell"

[taxonomies]
tags = ["archbang", "linux", "wayland", "mangowm", "dms", "iso"]
+++

FruitBang was the first cut — ArchBang with MangoWM swapped in. GreenBang is the evolution: a heavyweight live ISO that pairs MangoWM with DankMaterialShell (DMS) for a fuller desktop experience without leaving the ArchBang family.

<!-- screenshot: GreenBang live ISO desktop showing MangoWM + DMS shell -->
![GreenBang desktop screenshot](placeholder.png)

## What it is

GreenBang sits at the full-featured end of the ArchBang family — alongside ArchBang (the standard no-frills image) and MiniBang (the lightest). Where FruitBang was MangoWM with Waybar, rofi, and mako bolted on, GreenBang replaces all of that with DMS shell, which handles the panel, launcher, notifications, and wallpaper natively. Less moving parts, more cohesive.

## The stack

- **Compositor:** MangoWM — lighter and simpler to configure than Hyprland, with visual effects (blur, shadows, rounded corners, per-window opacity) via scenefx
- **Shell:** DankMaterialShell — panel, launcher, notifications, wallpaper. Replaces Waybar, rofi, and mako from FruitBang's stack
- **Terminal:** foot — bound to `SUPER+Return` via MangoWM keybind, DMS theming applies live through its foot.ini matugen template
- **Browser:** Firefox
- **File manager:** Thunar
- **Dev tooling:** opencode carried over from FruitBang, so GreenBang can be developed on using the same GreenCode delegation workflow

## What's different from FruitBang

The big change is DMS replacing the loose collection of Waybar + rofi + mako. DMS gives a unified shell — one config system, one theme pipeline, one thing to reason about. The compositor is still MangoWM, but now with scenefx for the eye candy that would otherwise need separate tools.

Removed from FruitBang's base: Waybar, Mako, rofi. `yay` is kept and shipped prebuilt via a local AUR repo so it's ready at login without dragging the Go toolchain into the image.

Built on FruitBang's existing archiso profile rather than from scratch. Packages are mostly repo-based, plus a local prebuilt AUR file-repo for the compositor (`mangowm`, `scenefx0.5`).

## What I'm working on

New features are in progress — useful ones, not just polish. I'm not going to list them until they're baked. The goal is a desktop that works out of the box on a live ISO and doesn't fight you.

## Release plans

When I'm happy with it, I'll cut an RC. Not there yet — the pieces are coming together but I want to use it for a while before calling it ready. Watch this space.

`^!`