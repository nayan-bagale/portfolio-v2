#!/usr/bin/env bash
# Self-test for the guardrail hooks. Run: bash .agents/guardrails/test.sh
# Feeds sample commands and paths to the guards and checks allow / ask / deny.
# Nothing here runs the sample commands. They are only passed to the guard as text.

DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$DIR/../.." && pwd -P)"
export GUARD_NO_LOG=1
pass=0
fail=0

decision() {
  local o="$1"
  [ -z "$o" ] && o='{}'
  jq -r '.hookSpecificOutput.permissionDecision // "allow"' <<<"$o"
}

check_bash() { # expected, command
  local out got
  out="$(jq -n --arg c "$2" '{tool_name:"Bash",tool_input:{command:$c}}' | "$DIR/guard-bash.sh")"
  got="$(decision "$out")"
  if [ "$got" = "$1" ]; then pass=$((pass + 1)); else fail=$((fail + 1)); echo "FAIL bash want=$1 got=$got :: $2"; fi
}

check_path() { # expected, tool, path
  local out got
  out="$(jq -n --arg t "$2" --arg p "$3" '{tool_name:$t,tool_input:{file_path:$p}}' | "$DIR/guard-paths.sh")"
  got="$(decision "$out")"
  if [ "$got" = "$1" ]; then pass=$((pass + 1)); else fail=$((fail + 1)); echo "FAIL path want=$1 got=$got :: $2 $3"; fi
}

# Allowed
for c in "pnpm lint" "pnpm -s check" "pnpm typecheck" "pnpm build" "ls src" "git status" "git diff" \
  "git log --oneline" "grep -rn dark: src" "git add -A" "git commit -m 'fix push pull bug'" \
  "echo hi > /dev/null" "pnpm build 2>&1 | tail" "cat .env.example" "cat .claude/settings.json" "ls $ROOT/src"; do
  check_bash allow "$c"
done

# Denied: GitHub, git danger, system, secrets, outside folder, guardrail bypass
for c in "git push" "git push origin main" "git -C . pull" "gh pr list" "git fetch" "git remote add x y" \
  "curl https://github.com/x" "git commit --no-verify -m x" "git reset --hard" "git checkout ." \
  "git branch -D x" "git config user.name x" "sudo ls" "curl http://example.com" "kill 123" "chmod +x a" \
  "cat .env" "cat ~/.ssh/id_rsa" "cat /etc/hosts" "cd .. && ls" "sed -i s/a/b/ .claude/settings.json" \
  "LEFTHOOK=0 git commit -m x" "HUMAN_PUSH=1 git push" "git clean -fd" "git rm a.txt" \
  "ls; rm a.txt" "find . -name x -delete" "xargs rm"; do
  check_bash deny "$c"
done

# Ask: create files, dependencies
for c in "echo hi > a.txt" "touch x" "mkdir d" "mv a b" "pnpm add left-pad" "pnpm install" "npx foo"; do
  check_bash ask "$c"
done

# File tools
check_path allow Edit "$ROOT/src/app/page.tsx"
check_path allow Read "$ROOT/package.json"
check_path allow Edit "$ROOT/AGENTS.md"
check_path ask Write "$ROOT/src/new-file.ts"
check_path deny Read "/etc/hosts"
check_path deny Edit "$ROOT/../other/file.ts"
check_path deny Read "$ROOT/.env"
check_path allow Read "$ROOT/.env.example"
check_path deny Edit "$ROOT/.claude/settings.json"
check_path deny Write "$ROOT/.agents/guardrails/guard-bash.sh"
check_path deny Edit "$ROOT/eslint.config.mjs"
check_path deny Edit "$ROOT/lefthook.yml"
check_path deny Edit "$ROOT/GUARDRAILS.md"

echo "pass=$pass fail=$fail"
[ "$fail" -eq 0 ]
