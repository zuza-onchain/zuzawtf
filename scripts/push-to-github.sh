#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/zuza-onchain/zuzawtf.git"
TARGET_BRANCH="main"
COMMIT_MESSAGE="chore: sync"
DRY_RUN="false"
SKIP_COMMIT="false"

# Ensure commits are authored as Zuza for this repo.
GIT_USER_NAME="Zuza"
GIT_USER_EMAIL="zuza@zuza.wtf"

usage() {
  cat <<USAGE
Usage: scripts/push-to-github.sh [--dry-run] [--message "commit message"] [--skip-commit]

Options:
  --dry-run            Show what would run without pushing
  --message <message>  Commit message (default: ${COMMIT_MESSAGE})
  --skip-commit         Do not stage/commit; only push current HEAD
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)
      DRY_RUN="true"
      shift
      ;;
    --message)
      COMMIT_MESSAGE="${2:-}"
      if [[ -z "$COMMIT_MESSAGE" ]]; then
        echo "[push:github] ERROR: --message requires a value"
        exit 1
      fi
      shift 2
      ;;
    --skip-commit)
      SKIP_COMMIT="true"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "[push:github] ERROR: Unknown option '$1'"
      usage
      exit 1
      ;;
  esac
done

if [[ -f ".env" ]]; then
  # Don't `source .env` (it is not guaranteed to be valid shell syntax).
  # Read only the token keys we care about in a minimal, non-eval way.
  #
  # Supports:
  #   GITHUB_TOKEN=...
  #   GITHUB_TOKEN="..."
  #   GITHUB_TOKEN='...'
  #
  # Ignores comments and unrelated lines.
  read_env_token() {
    local key="$1"
    local line value
    line="$(grep -E "^[[:space:]]*${key}=" .env 2>/dev/null | tail -n 1 || true)"
    [[ -z "${line}" ]] && return 1
    value="${line#*=}"
    # trim leading/trailing whitespace
    value="$(printf "%s" "$value" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')"
    # strip matching quotes
    if [[ "$value" =~ ^\".*\"$ ]]; then
      value="${value:1:${#value}-2}"
    elif [[ "$value" =~ ^\'.*\'$ ]]; then
      value="${value:1:${#value}-2}"
    fi
    printf "%s" "$value"
    return 0
  }

  if [[ -z "${GITHUB_TOKEN:-}" ]]; then
    GITHUB_TOKEN="$(read_env_token "GITHUB_TOKEN" || true)"
  fi
  if [[ -z "${GITHUB_API_KEY:-}" ]]; then
    GITHUB_API_KEY="$(read_env_token "GITHUB_API_KEY" || true)"
  fi
fi

GITHUB_TOKEN="${GITHUB_TOKEN:-${GITHUB_API_KEY:-}}"
if [[ -z "${GITHUB_TOKEN}" ]]; then
  echo "[push:github] ERROR: Missing GITHUB_TOKEN (or GITHUB_API_KEY) in environment/.env"
  exit 1
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "[push:github] ERROR: Current directory is not a git repository"
  exit 1
fi

# Keep the repo remote aligned with REPO_URL for convenience.
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REPO_URL"
else
  git remote add origin "$REPO_URL"
fi

AUTH_HEADER="AUTHORIZATION: basic $(printf 'x-access-token:%s' "$GITHUB_TOKEN" | base64 | tr -d '\n')"

if [[ "$DRY_RUN" == "true" ]]; then
  echo "[push:github] DRY RUN"
  if [[ "$SKIP_COMMIT" == "true" ]]; then
    echo "[push:github] Would NOT stage/commit changes (--skip-commit)."
  else
    echo "[push:github] Would stage/commit changes with: git add -A && git commit --no-verify -m \"${COMMIT_MESSAGE}\""
  fi
  echo "[push:github] Would set git identity: ${GIT_USER_NAME} <${GIT_USER_EMAIL}>"
  echo "[push:github] Would set remote: origin -> $REPO_URL"
  echo "[push:github] Would run: git -c http.extraheader='<redacted>' push $REPO_URL HEAD:$TARGET_BRANCH"
  exit 0
fi

if [[ "$SKIP_COMMIT" != "true" ]]; then
  if [[ -n "$(git status --porcelain)" ]]; then
    git config user.name "$GIT_USER_NAME"
    git config user.email "$GIT_USER_EMAIL"
    echo "[push:github] Staging and committing local changes (hooks disabled)..."
    git add -A
    # Avoid triggering husky/lint-staged during automation.
    git commit --no-verify -m "$COMMIT_MESSAGE" || true
  else
    echo "[push:github] No local changes to commit."
  fi
else
  echo "[push:github] Skipping stage/commit; pushing current HEAD."
fi

echo "[push:github] Pushing HEAD to $REPO_URL ($TARGET_BRANCH)..."
git -c http.extraheader="$AUTH_HEADER" push "$REPO_URL" "HEAD:$TARGET_BRANCH"

echo "[push:github] Push complete."

