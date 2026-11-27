#!/usr/bin/env bash
# Checks that the live site serves the build of EXPECTED (a commit on main).
# Used by .github/workflows/verify-deploy.yml; runnable by hand:
#   EXPECTED=$(git rev-parse origin/main) WAIT_MINUTES=1 scripts/verify-deploy.sh
#
# Exit 0: live (the live commit is EXPECTED or newer).
# Exit 1: still stale after WAIT_MINUTES.
# Exit 2: Cloudflare reported the build for EXPECTED as failed (no point waiting).
set -uo pipefail

SITE_URL="${SITE_URL:-https://creators.select}"
WAIT_MINUTES="${WAIT_MINUTES:-25}"
INTERVAL="${INTERVAL:-30}"
# CHECK_BUILD=0 skips the Cloudflare check run (use after a retry: the old failure stays on the commit).
: "${EXPECTED:?set EXPECTED to the commit that should be live}"

live_commit() {
	curl -fsS --max-time 20 -H 'Cache-Control: no-cache' \
		"$SITE_URL/version.json?t=$(date +%s)" 2>/dev/null |
		sed -n 's/.*"commit":"\([0-9a-f]\{7,40\}\)".*/\1/p'
}

# True when the live commit is EXPECTED or a later commit on main.
is_current() {
	local live="$1"
	[ -n "$live" ] || return 1
	[ "$live" = "$EXPECTED" ] && return 0
	git fetch -q origin main 2>/dev/null || true
	git cat-file -e "$live^{commit}" 2>/dev/null && git merge-base --is-ancestor "$EXPECTED" "$live" 2>/dev/null
}

# Cloudflare posts a "Workers Builds: creators" check run on each commit it builds.
build_failed() {
	[ "${CHECK_BUILD:-1}" = 1 ] || return 1
	[ -n "${GITHUB_REPOSITORY:-}" ] && command -v gh >/dev/null || return 1
	gh api "repos/$GITHUB_REPOSITORY/commits/$EXPECTED/check-runs" \
		--jq '[.check_runs[] | select(.name | startswith("Workers Builds")) | .conclusion] | last' 2>/dev/null |
		grep -qx failure
}

deadline=$(( $(date +%s) + WAIT_MINUTES * 60 ))
echo "Waiting up to ${WAIT_MINUTES}m for $SITE_URL to serve ${EXPECTED:0:7}"
while :; do
	live="$(live_commit)"
	if is_current "$live"; then
		echo "Live: $SITE_URL serves ${live:0:7}."
		exit 0
	fi
	if build_failed; then
		echo "Cloudflare reported the build for ${EXPECTED:0:7} as failed (live is ${live:-unknown})."
		exit 2
	fi
	if [ "$(date +%s)" -ge "$deadline" ]; then
		echo "Stale: after ${WAIT_MINUTES}m the site still serves ${live:-nothing readable at /version.json}."
		exit 1
	fi
	echo "  $(date -u +%H:%M:%S) live=${live:0:7} want=${EXPECTED:0:7}"
	sleep "$INTERVAL"
done
