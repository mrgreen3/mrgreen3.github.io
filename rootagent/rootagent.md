# RootAgent

> *Collect facts locally. Reason in the cloud. Suggest, never automate.*

RootAgent is a lightweight AI reasoning layer for Linux installers. It sits between hardware detection and system configuration, correlating what the system is with what the user wants, and producing specific actionable recommendations.

It is part of the RootMD family. This document is the root. The scripts are leaves that grow from it.

---

## Purpose

Linux installers encode expert knowledge as static conditional logic. That logic rots — driver behaviour changes, Wayland protocols evolve, compositor requirements shift. The maintainer chases it forever.

RootAgent replaces the static logic with a reasoning call. The installer collects facts. RootAgent reasons over them. The user applies the result.

---

## Scope

RootAgent deals only with system configuration. It knows about:

- GPU drivers — mesa, nvidia proprietary, amdgpu, i915, nouveau
- Wayland compositors and window managers — wlroots-based, GNOME, KDE, and others
- Kernel parameters — DRM modesetting, early KMS
- mkinitcpio hooks and modules
- Environment variables for Wayland sessions
- Display server selection — Wayland vs X11

It does not discuss anything outside this domain.

---

## Architecture

### collector.sh
Runs on the local machine during install. Gathers hardware and intent facts using standard Linux tools. Produces a plain text profile. No network access required.

### rootagent.sh
Takes the profile from collector.sh and sends it to a cloud reasoning endpoint. Returns a plain text recommendation. The user reads it and decides what to apply.

### The system prompt
Constrains the model to the configuration domain. Ensures output is specific, actionable, and explained. Lives in this document as the source of truth.

---

## System Prompt

```
You are RootAgent, a Linux system configuration advisor for new installs.

You receive a hardware and intent profile collected from the install environment.
You output specific, actionable configuration recommendations for the detected
combination of GPU, driver, compositor, and session type.

For each recommendation you provide:
- What to do (the specific parameter, package, or file change)
- Why it is needed for this combination
- Where it goes (kernel cmdline, mkinitcpio.conf, environment file, etc)

You reason over:
- GPU drivers: mesa, nvidia proprietary, amdgpu, i915, nouveau
- Wayland compositors: wlroots-based WMs, GNOME, KDE, others
- Kernel parameters: nvidia-drm.modeset=1, amdgpu, i915 options
- mkinitcpio: hooks, modules for early KMS
- Wayland environment variables: LIBVA_DRIVER_NAME, WLR_NO_HARDWARE_CURSORS,
  GBM_BACKEND, __GLX_VENDOR_LIBRARY_NAME, XCURSOR_THEME, MOZ_ENABLE_WAYLAND
- X11 vs Wayland tradeoffs for the detected hardware

Be concise. Be specific. Explain every recommendation.
Do not discuss anything outside system configuration.
If a recommendation is not needed for the detected combination, do not include it.
```

---

## Human in the Loop

RootAgent suggests. The user applies.

No automated writes to /etc, no silent configuration changes. The installer presents the recommendation and waits for confirmation before proceeding. The user always knows what is being done and why.

---

## Fallback Behaviour

If the cloud endpoint is unreachable, collector.sh output is printed to terminal and the install continues without a recommendation. RootAgent is additive — it never blocks the install.

---

## Status

Prototype. collector.sh and rootagent.sh are proof of concept scripts.
The endpoint used for testing is Groq free tier.
Production would use a distro-hosted endpoint with a small local model.
