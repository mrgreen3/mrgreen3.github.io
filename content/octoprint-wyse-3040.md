+++
title = "OctoPrint, a Dell Wyse, and a Green Lobster"
date = 2026-05-16
path = "octoprint-wyse-3040"

[taxonomies]
tags = ["3dprint", "ai", "linux", "self-hosted", "tools"]
+++

Spent most of today getting OctoPrint properly set up and moved off the M710Q onto a Dell Wyse 3040 that's been sitting around doing nothing useful. GreenClaw did most of the heavy lifting.

## The Problem

The M710Q is my main server — it runs indoors. The printer is in the workshop. Running OctoPrint on the server meant a USB cable trailing across the house, which was never a permanent solution. The Wyse 3040 is a tiny fanless machine that can sit next to the printer without me worrying about it.

## The Wyse 3040

It was already running Alpine Linux with Docker installed. First job was stripping out Docker — no need for it when OctoPrint is the only thing running. Cleaned up, updated, and moved to a proper pip virtualenv install of OctoPrint 1.11.7.

A few things to sort along the way:

- The system clock was nearly 9 years out of sync. Had to install chrony and force a time sync before pip would talk to PyPI over SSL.
- The Alpine package for OctoPrint is pinned to Python 3.12 and currently broken on edge. Virtualenv with system site packages for netifaces was the fix.
- The `mrgreen` user needed adding to the `dialout` group before OctoPrint could access `/dev/ttyUSB0`.

All fixable. GreenClaw handled it from the server over SSH while I plugged things in at the printer end.

## Printer Calibration

While we were at it, ran through some bed calibration. The Kobra Neo's auto levelling had never been run properly — previous prints were surviving on a Z offset of -1.76 and a prayer. Saved the offset to EEPROM with M851/M500, ran a G28 + G29, and printed a 50x50x2mm test square to verify.

Came out 49x49x2mm — close enough for practical prints, and the 2mm thickness was spot on.

## The Stack Now

- **M710Q** — main server, running GreenClaw, stays indoors
- **Wyse 3040** — dedicated OctoPrint box, lives in the workshop next to the printer
- **Kasa smart plug** — GreenClaw can turn the printer on and off remotely
- **Anycubic Kobra Neo** — doing its job

GreenClaw can check printer status, temps, and job progress over Telegram, start and cancel prints, and power the whole thing on and off via the smart plug. First proper test of the full setup and it worked well.

Not bad for a Saturday.
