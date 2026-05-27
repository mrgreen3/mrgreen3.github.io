#!/usr/bin/env bash
# rootagent.sh — RootAgent reasoning call
# Sends system profile to cloud endpoint, returns configuration recommendation
# Part of the RootAgent / RootMD project
#
# Usage:
#   source collector.sh && bash rootagent.sh
#   or: ROOTAGENT_PROFILE="..." bash rootagent.sh
#
# Requires:
#   curl, jq
#   GROQ_API_KEY environment variable (get a free key at console.groq.com)

set -euo pipefail

# --- Dependencies check ---
for cmd in curl jq; do
    if ! command -v "$cmd" &>/dev/null; then
        echo "Error: $cmd is required but not installed" >&2
        exit 1
    fi
done

# --- API key ---
if [[ -z "${GROQ_API_KEY:-}" ]]; then
    echo "Error: GROQ_API_KEY is not set" >&2
    echo "Get a free key at https://console.groq.com" >&2
    echo "Then: export GROQ_API_KEY=your_key_here" >&2
    exit 1
fi

# --- Profile ---
if [[ -z "${ROOTAGENT_PROFILE:-}" ]]; then
    echo "Error: ROOTAGENT_PROFILE is not set" >&2
    echo "Run collector.sh first: source collector.sh" >&2
    exit 1
fi

# --- System prompt ---
SYSTEM_PROMPT="You are RootAgent, a Linux system configuration advisor for new installs.

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
If a recommendation is not needed for the detected combination, do not include it."

# --- API call ---
echo ""
echo "=== RootAgent ==="
echo "Sending profile to reasoning endpoint..."
echo ""

RESPONSE=$(curl -s -X POST https://api.groq.com/openai/v1/chat/completions \
  -H "Authorization: Bearer $GROQ_API_KEY" \
  -H "Content-Type: application/json" \
  -d "$(jq -n \
    --arg system "$SYSTEM_PROMPT" \
    --arg profile "$ROOTAGENT_PROFILE" \
    '{
      model: "llama3-70b-8192",
      temperature: 0.2,
      max_tokens: 1024,
      messages: [
        {role: "system", content: $system},
        {role: "user", content: ("System profile:\n" + $profile)}
      ]
    }'
  )")

# --- Handle errors ---
if echo "$RESPONSE" | jq -e '.error' &>/dev/null; then
    echo "RootAgent endpoint error:" >&2
    echo "$RESPONSE" | jq -r '.error.message' >&2
    exit 1
fi

# --- Output recommendation ---
RECOMMENDATION=$(echo "$RESPONSE" | jq -r '.choices[0].message.content')

echo "=== Configuration Recommendation ==="
echo ""
echo "$RECOMMENDATION"
echo ""
echo "=== Review the above and apply manually ==="
echo ""
