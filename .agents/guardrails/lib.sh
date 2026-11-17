#!/usr/bin/env bash
# Shared helpers for the guardrail hooks. Works with Claude Code and Cursor hook input.
# Sourced by guard-bash.sh and guard-paths.sh. Do not run directly.

GUARD_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$GUARD_DIR/../.." && pwd -P)"
LOG_FILE="$GUARD_DIR/blocked.log"

INPUT="$(cat)"

# Cursor sends a top-level "command" or "file_path". Claude Code sends "tool_input".
if jq -e '.tool_input' >/dev/null 2>&1 <<<"$INPUT"; then
  AGENT="claude"
else
  AGENT="cursor"
fi

log_event() { # decision, reason, detail
  [ -n "${GUARD_NO_LOG:-}" ] && return 0 # used by tests only
  printf '%s\t%s\t%s\t%s\t%s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$AGENT" "$1" "$2" "$3" >>"$LOG_FILE" 2>/dev/null || true
}

emit() { # decision (deny|ask), reason
  if [ "$AGENT" = "claude" ]; then
    jq -n --arg d "$1" --arg r "$2" \
      '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:$d,permissionDecisionReason:$r}}'
  else
    jq -n --arg d "$1" --arg r "$2" \
      '{permission:$d,user_message:$r,agent_message:$r}'
  fi
}

deny() { # reason, detail
  log_event deny "$1" "$2"
  emit deny "GUARDRAIL BLOCKED: $1 See GUARDRAILS.md."
  exit 0
}

ask() { # reason, detail
  log_event ask "$1" "$2"
  emit ask "GUARDRAIL: $1 Needs the owner's approval."
  exit 0
}

# Paths that agents must never write or delete: the guardrails themselves.
is_protected() { # path relative to project
  case "$1" in
    .claude/*|.cursor/*|.agents/*|.github/*|lefthook.yml|eslint.config.mjs|GUARDRAILS.md|.gitignore) return 0 ;;
  esac
  return 1
}

is_secret() { # path
  case "$(basename "$1")" in
    .env.example) return 1 ;;
    .env|.env.*|*.pem|*.key|id_rsa*|id_ed25519*) return 0 ;;
  esac
  return 1
}

# Resolve a path (it may not exist yet) to an absolute, symlink-free path.
resolve() {
  python3 -c 'import os,sys; print(os.path.realpath(os.path.join(sys.argv[1], os.path.expanduser(sys.argv[2]))))' "$PROJECT_DIR" "$1"
}
