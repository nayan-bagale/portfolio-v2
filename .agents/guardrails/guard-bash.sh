#!/usr/bin/env bash
# Blocks or asks before dangerous shell commands. See GUARDRAILS.md.
# Hook input comes on stdin (Claude Code PreToolUse or Cursor beforeShellExecution).

# shellcheck source=lib.sh
source "$(dirname "$0")/lib.sh"

CMD="$(jq -r '.tool_input.command // .command // empty' <<<"$INPUT")"
[ -z "$CMD" ] && exit 0

# Same command with quoted strings removed, so words inside messages do not trigger rules.
NQ="$(sed -E "s/\"[^\"]*\"//g; s/'[^']*'//g" <<<"$CMD")"

# True when $1 (regex) is used as a command: at the start or after ; & | ( or env assignments.
at_cmd() {
  grep -Eq "(^|[;&|(\`]|\\\$\()[[:space:]]*([A-Za-z_]+=[^[:space:]]*[[:space:]]+)*(sudo[[:space:]]+)?($1)([[:space:]]|\$)" <<<"$NQ"
}
has() { grep -Eq -e "$1" <<<"$NQ"; }

# Allowed without a prompt: the project's own checks.
if grep -Eqx "[[:space:]]*pnpm( -s)? (lint|typecheck|build|check)[[:space:]]*" <<<"$CMD"; then
  exit 0
fi

# 1. GitHub and remote git. Never allowed.
if at_cmd "gh|hub"; then deny "GitHub CLI is not allowed." "$CMD"; fi
if at_cmd "git" && has "(^|[[:space:]])(push|pull|fetch|clone|remote|ls-remote|submodule|request-pull|send-email)([[:space:]]|\$)"; then
  deny "Remote git commands (push, pull, fetch, clone, remote) are not allowed." "$CMD"
fi
if grep -Eqi "github\.com|api\.github|githubusercontent" <<<"$CMD"; then
  deny "Talking to GitHub is not allowed." "$CMD"
fi

# 2. Delete. Never without the owner.
if at_cmd "rm|rmdir|unlink|shred|trash|srm" || has "(xargs|-exec|-execdir)[[:space:]]+(-[^[:space:]]+[[:space:]]+)*(rm|unlink|rmdir)" || has "find[[:space:]].*-delete"; then
  deny "Deleting files is not allowed without the owner's permission." "$CMD"
fi
if at_cmd "git" && has "(^|[[:space:]])(rm|clean)([[:space:]]|\$)"; then
  deny "git rm and git clean delete files. Not allowed." "$CMD"
fi

# 3. Risky git operations.
if at_cmd "git"; then
  if has "--no-verify|--no-gpg-sign|(^|[[:space:]])-n[[:space:]]"; then deny "Skipping git hooks is not allowed." "$CMD"; fi
  if has "(^|[[:space:]])config([[:space:]]|\$)"; then deny "Changing git config is not allowed." "$CMD"; fi
  if has "reset[[:space:]]+.*--hard|checkout[[:space:]]+(--[[:space:]]+)?\.|checkout[[:space:]]+--|(^|[[:space:]])restore([[:space:]]|\$)|stash[[:space:]]+(drop|clear)|branch[[:space:]]+-[dD]|(^|[[:space:]])(rebase|filter-branch|filter-repo|update-ref|replace)([[:space:]]|\$)|reflog[[:space:]]+(expire|delete)|gc[[:space:]]+.*--prune|worktree[[:space:]]+remove|tag[[:space:]]+-d"; then
    deny "This git command can destroy work. Not allowed." "$CMD"
  fi
fi

# 4. Network, system and process control.
if at_cmd "curl|wget|ssh|scp|sftp|rsync|nc|ncat|netcat|telnet|ftp|sudo|su|doas|chmod|chown|chgrp|chflags|kill|killall|pkill|launchctl|systemctl|crontab|osascript|open"; then
  deny "Network, system and process commands are not allowed." "$CMD"
fi
if has "(curl|wget)[^|]*\|[[:space:]]*(ba|z)?sh"; then deny "Piping downloads into a shell is not allowed." "$CMD"; fi

# 5. Bypassing the guardrails.
if grep -Eq "dangerously-skip-permissions|core\.hooksPath|lefthook[[:space:]]+(uninstall|run)|LEFTHOOK=|HUSKY=|HUMAN_PUSH|ALLOW_GUARDRAIL_EDIT|\.agents/guardrails|\.claude/settings|\.cursor/hooks" <<<"$CMD"; then
  if ! grep -Eqx "[[:space:]]*(cat|ls|head|tail|wc|grep)[[:space:]].*" <<<"$CMD"; then
    deny "Touching the guardrails or hooks is not allowed." "$CMD"
  fi
fi

# 6. Secrets.
if grep -Eq "(^|[[:space:]/])\.env(\.[A-Za-z]+)?([[:space:]]|\$)|\.pem|id_rsa|id_ed25519" <<<"$CMD" && ! grep -Eq "\.env\.example" <<<"$CMD"; then
  deny "Secret files (.env, keys) must not be read." "$CMD"
fi

# 7. Stay inside the project folder.
if grep -Eq '\$\{?HOME\}?|\$\{?(PWD|OLDPWD)\}?/\.\.' <<<"$CMD"; then deny "Leaving the project folder is not allowed." "$CMD"; fi
while IFS= read -r tok; do
  [ -z "$tok" ] && continue
  case "$tok" in
    /dev/null|/dev/stdin|/dev/stdout|/dev/stderr) ;;
    "$PROJECT_DIR"|"$PROJECT_DIR"/*) ;;
    /*|~*|..|../*|*/../*|*/..) deny "Leaving the project folder is not allowed ($tok). Ask the owner." "$CMD" ;;
  esac
done < <(tr -s ' \t;&|()<>"`' '\n' <<<"$CMD" | tr -d "'" )

# 8. Create, move and change dependencies need approval.
if at_cmd "touch|mkdir|mktemp|cp|mv|ln|install|tee|dd|truncate|patch"; then
  ask "This command creates or moves files." "$CMD"
fi
STRIPPED="$(sed -E 's#[0-9]*>&[0-9]+##g; s#[0-9]*>>?[[:space:]]*/dev/null##g' <<<"$NQ")"
if grep -Eq "[0-9]*>>?[[:space:]]*[^[:space:]&]" <<<"$STRIPPED"; then
  ask "Shell redirection can create a file." "$CMD"
fi
if at_cmd "pnpm|npm|yarn|npx|bun|bunx|pnpx|corepack" && has "(^|[[:space:]])(add|remove|rm|install|i|ci|update|up|upgrade|uninstall|un|dlx|exec|link|unlink|publish|create|init|approve-builds|patch|rebuild)([[:space:]]|\$)|^[[:space:]]*(npx|bunx|pnpx)"; then
  ask "This changes dependencies or runs a downloaded package." "$CMD"
fi

exit 0
