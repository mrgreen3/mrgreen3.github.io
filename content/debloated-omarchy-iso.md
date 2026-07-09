+++
title = "Building a Debloated Omarchy ISO"
date = 2026-07-09
path = "debloated-omarchy-iso"

[taxonomies]
tags = ["archiso", "arch", "linux", "omarchy"]
+++

Omarchy is DHH's opinionated Hyprland setup for Arch — good bones, but the install script hands you 1Password, Obsidian, Spotify, Signal, Typora, KDEnlive, OBS Studio, LibreOffice, six different AI CLI tools installed via npx, and fifteen Chromium "web apps" (Discord, Zoom, Google Photos, Figma...) whether you want them or not. All of that is trivially `yay -S`-able after the fact. None of it needs to be on the ISO. So I went digging into how the thing is actually built to figure out where to cut.

## Two Repos, Not One

The first thing that trips people up: the ISO builder and the installer are separate projects.

- **`basecamp/omarchy`** is the installer — the `install.sh` that runs *after* you already have a bootstrapped Arch system. It sources `helpers → preflight → packaging → config → login → post-install` in order.
- **`omacom-io/omarchy-iso`** is the ISO builder — an archiso wrapper that boots into "the Omarchy Configurator" (an `archinstall` front-end) to lay down a minimal base Arch system, then hands off to the installer above.

The ISO build script (`builder/build-iso.sh`) doesn't hardcode a package list. It clones the installer repo fresh:

```bash
git clone -b $OMARCHY_INSTALLER_REF https://github.com/$OMARCHY_INSTALLER_REPO.git
```

and later builds the ISO's offline package mirror straight from that checkout:

```bash
all_packages+=($(grep -v '^#' .../install/omarchy-base.packages | grep -v '^$'))
all_packages+=($(grep -v '^#' .../install/omarchy-other.packages | grep -v '^$'))
```

That's the lever. Trim `omarchy-base.packages` in a fork of the installer, and both the offline mirror *and* the resulting install get smaller — no need to touch the ISO builder itself at all.

## Where the Bloat Actually Lives

`install/omarchy-base.packages` is the blanket list — everything in it gets installed on every Omarchy machine, laptop or desktop, regardless of need. That's the real target: 1password-beta, 1password-cli, chromium, docker/docker-compose, kdenlive, libreoffice-fresh, obs-studio, obsidian, pinta, signal-desktop, spotify, tesseract(-data-eng), typora, xournalpp, and a pile of GNOME accessories nobody asked for.

`install/packaging/all.sh` also sources a few scripts worth gutting:

- **`webapps.sh`** — fifteen `omarchy-webapp-install` calls that wire up Chromium as a fake-native launcher for HEY, Basecamp, WhatsApp, Google Photos/Contacts/Messages/Maps, ChatGPT, YouTube, GitHub, X, Figma, Discord, Zoom, Fizzy.
- **`npx.sh`** — installs six AI coding CLIs (codex, gemini-cli, copilot, opencode, playwright, pi, ghui) via npm. The ISO builder even bundles a full Node.js tarball just for this.
- **`tuis.sh`** — a couple of TUI launcher shortcuts (dust, lazydocker), harmless but easy to drop.

`install/omarchy-other.packages` is a different animal — Nvidia dkms variants, T2 Mac, Surface, ASUS, Dell XPS, Framework packages. These are hardware-conditional, not blanket-installed, so trimming them buys nothing and risks breaking a machine you didn't test on. Leave it alone unless you know you're targeting one specific hardware profile.

## The Plan

1. Fork `basecamp/omarchy`.
2. Prune `install/omarchy-base.packages` down to what I'd actually use — keep the Hyprland/waybar/hyprlock core plus my own dev tooling, cut the app bloat.
3. Empty (or remove the `run_logged` lines for) `webapps.sh` and `npx.sh` in `install/packaging/all.sh`. Leave `tuis.sh` trimmed rather than deleted, since `omarchy-tui-install` is still useful for stuff I do want.
4. Iterate fast without rebuilding the ISO: boot a plain Arch VM and run the installer straight off my fork's branch — `install.sh` doesn't care where it's cloned from, just that `OMARCHY_PATH` points at it. Rebuilding a full archiso image for every package-list tweak would be miserable.
5. Once the package list is settled, build the actual ISO from `omarchy-iso`, pointed at the fork:

```bash
git clone https://github.com/omacom-io/omarchy-iso
cd omarchy-iso
OMARCHY_INSTALLER_REPO="mrgreen3/omarchy" OMARCHY_INSTALLER_REF="debloated" ./bin/omarchy-iso-make
```

6. Test it with `./bin/omarchy-iso-boot release/omarchy.iso` in QEMU before touching real hardware.

## Current State

Haven't cut the ISO yet — still trimming the package list and deciding what's core-enough to keep on first boot versus what I'll just pull in later with `yay`. The whole point is that "needed later" and "needed at boot" are different lists, and Omarchy's installer currently treats them as the same one.
