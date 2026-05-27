+++
title = "RootAgent — An AI Reasoning Layer for Linux Installers"
path = "rootagent"
+++

> *The problem isn't the installer. It's that static logic can't keep up with a moving target.*

---

## The Problem

Linux installers are hard to write well — not because the individual tasks are complicated, but because the decision space is enormous and constantly shifting.

Consider GPU support for Wayland compositors. The installer needs to know:

- Which GPU is present
- Which driver to use (open, proprietary, nouveau)
- Which compositor or window manager is being installed
- Whether it is wlroots-based, GNOME, KDE, or something else
- Whether the system is a hybrid laptop with integrated and discrete graphics
- Whether the target session is Wayland or X11

Each combination of answers requires a different set of kernel parameters, environment variables, mkinitcpio hooks, and package choices. The decision tree fans out fast — and then it changes. What was correct configuration for Nvidia and a wlroots compositor six months ago may be wrong or unnecessary today. Driver versions shift. Wayland protocols evolve. Compositor support varies.

Installers deal with this by encoding expert knowledge as static conditional logic. That logic rots. The maintainer chases it forever.

---

## The Gap

No major distribution is solving this problem with AI reasoning. Current approaches either:

- Do the basics and leave the rest to the user (Arch, EndeavourOS)
- Optimise for one desktop target and do that well (Ubuntu with GNOME, Fedora with GNOME and KDE)
- Ship opinionated pre-configured images where it has already been solved by hand (Nobara, Garuda)

The third approach works but it is a human doing the reasoning once and baking it in. It does not scale and it still rots over time.

The gap is a dynamic reasoning layer — something that can correlate hardware profile, user intent, and current knowledge to produce the right configuration for *this* system, *now*.

---

## RootAgent

RootAgent is a proposed AI agent that sits between hardware detection and system configuration. It is part of the RootMD family — a reasoning layer built on the same principle that documentation of intent matters as much as the implementation itself.

**The input** is a system profile assembled by the installer:

- GPU model and vendor (from `lspci`)
- Kernel version
- Intended compositor or window manager
- Session type (Wayland or X11)
- Driver preference

**The reasoning** correlates that profile against a knowledge base of known good configurations, documented conflicts, and current best practice — the kind of knowledge that lives in the Arch wiki, upstream changelogs, and forum postings, but is too scattered and too volatile for a static installer to encode reliably.

**The output** is a validated configuration set:

- Packages to install
- Kernel parameters
- Environment variables
- mkinitcpio hooks and modules
- Any compositor-specific configuration

Crucially, RootAgent explains its decisions. *"I added `nvidia-drm.modeset=1` because you are using the proprietary driver with a wlroots compositor."* The user understands what was done and why.

---

## Human in the Loop

RootAgent suggests. The user applies.

Automated writes to `/etc` on a fresh install are too high-risk. The value is in the reasoning — correlating variables that a human would have to chase across multiple wiki pages and forum threads. The application of the resulting configuration remains a deliberate human act.

---

## Post-Install Verification

Most installers walk away after applying configuration. RootAgent would not.

A verification loop after first boot could check whether Wayland actually started, whether the GPU is being used correctly, and whether DRM modesetting is active. If something is wrong, RootAgent can reason about why and suggest remediation — rather than leaving the user to debug from scratch.

---

## Relationship to RootMD

RootAgent is a natural extension of the RootMD philosophy. RootMD says: document intent before writing code, and let the documentation be the source of truth. RootAgent applies the same principle at the system level — the reasoning about *why* a configuration is correct is as important as the configuration itself.

A system configured by RootAgent is a system you can understand, not just a system that happens to work.

---

## Status

Concept stage. No implementation yet. This page is a stake in the ground — a description of a gap in the Linux ecosystem that nobody has filled.

The installer problem is not going to be solved by better bash. It needs a reasoning layer. RootAgent is what that looks like.
