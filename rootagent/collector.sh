#!/usr/bin/env bash
# collector.sh — RootAgent system profile collector
# Gathers hardware and intent facts from the install environment
# Part of the RootAgent / RootMD project
# Run as root or with sudo for full lspci output

set -euo pipefail

# --- GPU detection ---
GPU=$(lspci | grep -iE 'vga|3d|display' | sed 's/.*: //' | head -1)
GPU=${GPU:-"unknown"}

# --- CPU detection ---
CPU=$(grep 'model name' /proc/cpuinfo | head -1 | cut -d: -f2 | xargs)
CPU=${CPU:-"unknown"}

# --- Kernel version ---
KERNEL=$(uname -r)

# --- Loaded graphics drivers ---
DRIVERS=$(lsmod | awk '{print $1}' | grep -iE '^(nvidia|amdgpu|i915|nouveau|radeon)$' | tr '\n' ' ' | xargs)
DRIVERS=${DRIVERS:-"none detected"}

# --- Wayland support ---
if pacman -Qq wayland &>/dev/null; then
    WAYLAND="yes"
else
    WAYLAND="no"
fi

# --- Compositor / WM selection ---
# In a real installer these come from menu selections
# For testing, prompt the user
if [[ -z "${SELECTED_WM:-}" ]]; then
    echo "Available compositors/WMs:"
    echo "  1) sway"
    echo "  2) hyprland"
    echo "  3) river"
    echo "  4) gnome"
    echo "  5) kde"
    echo "  6) i3 (X11)"
    echo "  7) openbox (X11)"
    echo "  8) other"
    read -rp "Select compositor/WM [1-8]: " WM_CHOICE
    case $WM_CHOICE in
        1) SELECTED_WM="sway" ;;
        2) SELECTED_WM="hyprland" ;;
        3) SELECTED_WM="river" ;;
        4) SELECTED_WM="gnome" ;;
        5) SELECTED_WM="kde" ;;
        6) SELECTED_WM="i3" ;;
        7) SELECTED_WM="openbox" ;;
        *) read -rp "Enter compositor/WM name: " SELECTED_WM ;;
    esac
fi

# --- Session type ---
if [[ -z "${SELECTED_SESSION:-}" ]]; then
    read -rp "Session type [wayland/x11]: " SELECTED_SESSION
fi

# --- Driver preference ---
if [[ -z "${SELECTED_DRIVER:-}" ]]; then
    echo "Driver preference:"
    echo "  1) open (mesa/amdgpu/i915/nouveau)"
    echo "  2) proprietary (nvidia)"
    read -rp "Select driver preference [1-2]: " DRIVER_CHOICE
    case $DRIVER_CHOICE in
        2) SELECTED_DRIVER="proprietary" ;;
        *) SELECTED_DRIVER="open" ;;
    esac
fi

# --- Hybrid GPU detection ---
GPU_COUNT=$(lspci | grep -icE 'vga|3d|display')
if [[ $GPU_COUNT -gt 1 ]]; then
    HYBRID="yes — $GPU_COUNT GPUs detected"
else
    HYBRID="no"
fi

# --- Assemble profile ---
PROFILE="GPU: $GPU
CPU: $CPU
Kernel: $KERNEL
Loaded graphics drivers: $DRIVERS
Wayland libraries present: $WAYLAND
Selected compositor/WM: $SELECTED_WM
Selected session type: $SELECTED_SESSION
Driver preference: $SELECTED_DRIVER
Hybrid GPU: $HYBRID"

echo "$PROFILE"

# Export for use by rootagent.sh
export ROOTAGENT_PROFILE="$PROFILE"
