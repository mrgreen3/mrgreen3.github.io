+++
title = "Omunchy: An Omarchy-Style Desktop, Minus the Weight"
date = 2026-10-17
path = "omunchy"

[taxonomies]
tags = ["archbang", "linux", "wayland", "wm", "desktop", "tools"]
+++

[Omarchy](https://omarchy.org) is a good idea with a lot of opinions attached. I like the idea — a tiling Wayland desktop that arrives configured instead of asking you twenty questions — and I don't want the rest of the meal. So I've been building Omunchy: a lean, Omarchy-inspired desktop delivered as an Arch-based live ISO built on ArchBang's archiso conventions, with an installer that copies that live system to disk.

The code is at [github.com/mrgreen3/Omunchy](https://github.com/mrgreen3/Omunchy).

## Three compositors in two weeks

Omunchy started on [MangoWC](https://github.com/mangowm/mango) on 23 September, moved to Hyprland the next day, was ported to sway a day after that, and then on 4 October came back to mango. That's not a tidy story, and I'm leaving it in, because the churn was the useful part — each move was made for a reason I could only see by living in the previous one.

Hyprland bought me parity with Omarchy and cost me a Lua config layer I didn't need. sway was rock-solid but had no dwindle layout, and approximating one with `autotiling` was never quite it. mango is dwl-lineage, sits in the official Arch repos, and has dwindle as a real layout — `Super+V` flips the split direction, and tags 1–5 all ship as dwindle. Coming back wasn't defeat; it was the only stack that gave me the behaviour without a translation layer bolted on.

## What's in it

- **mango** (`mangowm`, official repo) — compositor, dwl/Scenefx-based
- **waybar** — the bar
- **noctalia** — notifications, launcher panels, lock, idle, wallpaper, screenshots, clipboard, polkit agent, control centre
- **rofi** — the `Super+Space` application launcher
- **foot** — terminal
- **firefox** — browser

The stack is entirely official-repo. `yay` ships as an optional AUR helper, but nothing in the desktop needs it — no custom package repo, no offline mirror either. The package list is 144 entries, and it carries the kernel and the firmware split out by vendor rather than the firmware meta-package.

Noctalia is the biggest change since I last wrote about this. It quietly took over plumbing I'd hand-wired: mako, swaylock, swayidle, swaybg and the system-monitor panel are all gone, replaced by one shell doing notifications, the lock screen, the idle timeout, the wallpaper and the control centre. What stayed is the split I actually like — waybar draws the bar, and `Super+Space` is still rofi. The two are tied together: Noctalia emits a `colors_changed` hook that regenerates rofi's colour file from a template, so a palette change recolours the launcher without me opening a config.

## The installer is the product now

The original pitch was "a script that layers a desktop onto an existing ArchBang install". The interesting part now is `obinstall`, and it inverts that: the ISO boots a live mango session, and the installer copies the running system to disk.

It's a `gum` wizard — keyboard, account, hostname, timezone, disk, optional LUKS2 — with a summary screen before anything is touched, and a `--dry-run` flag that prints every step and modifies nothing. Behind the wizard are ten phases: preflight, prepare disk, copy system, configure, user, mkinitcpio, greeter, bootloader, validate, finish.

Some details I'm quietly pleased with. Partitioning is GPT with a 1 GiB ESP and btrfs subvolumes (`@`, `@home`, `@log`, `@pkg`). The system copy is `tar | pv | tar` from the live root, so it needs no network at all — the kernel comes off the ISO media, and live-session changes come across with it. It re-runs itself through sudo, so you don't prefix it. It rebuilds a fresh pacman keyring, because the live one is a tmpfs and the copy has none; if signatures complain later, `fix-keys` sorts it out with a connection. One password from the wizard covers the user, root, and the LUKS volume if you asked for one — and an encrypted install auto-logs in through greetd, so the disk passphrase is the only gate to the session.

## Boot

The last week went into the parts you see before the desktop exists. There's a Plymouth theme with a graphical LUKS unlock — you type the passphrase into the boot splash rather than the console — a short prompt on that splash, and the GRUB menu hidden behind it.

## What I threw out

Deliberately gone: the `omunchy` CLI dispatcher and its web-app and TUI installers, the theme-switch and wallpaper commands, and the matugen recolouring from the sway era. There's one fixed palette now — the forest green off the wallpaper — and one wallpaper, both plain config. The web apps went too: Chromium in `--app=` mode is out, Firefox is in, with a small `userChrome.css` and a policy file that skips the first-run and terms pages.

That's the trade I keep making on this project. I'd rather have one thing configured well than a verb for everything.

## The assistant

`opencode` is offered on the installed system rather than shipped on the live ISO — on a live session it would evaporate at reboot. It installs from the official repos and opens on a single `omunchy-guide` skill, which reads `~/Documents/Guide.md`, the same file a human reads. The skill lives in `~/.config/omunchy/skills` and is linked into the paths opencode, pi, Gemini CLI and Claude Code each scan, so whichever of them you have will find it.

On the live ISO, `omunchy-welcome` shows the `Super+K` keybind hint at login and, when you're offline, keeps a warning up with connection hints until a connection appears — watched for thirty minutes, which is roughly how long it takes to give up on a laptop's wifi.

## Status

No ISO is published yet. There are no releases on the repo and no build artefacts in it; the profile (`iso_name = "omunchy-rc"`) is there, but I haven't put a binary up.

`obinstall` is the least proven part and I'd rather say so — the README's own words are "untested on real hardware: try it in a VM first." The disk copy, the LUKS install and the greeter handover are all in that category. The desktop configuration is the part that has had real use; the installer is where the risk sits.

There is an update path, which for an installer-shaped project is the part that usually rots: `omunchy-update` pulls the Omunchy source, refreshes `~/Scripts`, and runs one-shot migration scripts from `migrations/` in name order, each of which has to be safe to re-run.
