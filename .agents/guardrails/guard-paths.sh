#!/usr/bin/env bash
# Guards file tools (Read, Edit, Write, Grep, Glob, Notebook). See GUARDRAILS.md.
#  - Outside the project folder: blocked.
#  - Secrets (.env, keys): blocked.
#  - Guardrail files: blocked for writes.
#  - Creating a NEW file: needs approval. Editing an existing file is allowed.

# shellcheck source=lib.sh
source "$(dirname "$0")/lib.sh"

TOOL="$(jq -r '.tool_name // empty' <<<"$INPUT")"
P="$(jq -r '.tool_input.file_path // .tool_input.notebook_path // .tool_input.path // .file_path // empty' <<<"$INPUT")"
[ -z "$P" ] && exit 0

ABS="$(resolve "$P")"
case "$ABS" in
  "$PROJECT_DIR"|"$PROJECT_DIR"/*) ;;
  *) deny "Path is outside the project folder ($P). Ask the owner." "$TOOL $P" ;;
esac

REL="${ABS#"$PROJECT_DIR"/}"
if is_secret "$REL"; then deny "Secret files must not be touched ($REL)." "$TOOL $P"; fi

case "$TOOL" in
  Write|Edit|MultiEdit|NotebookEdit)
    if is_protected "$REL"; then deny "$REL is a guardrail file. Only the owner may change it." "$TOOL $P"; fi
    if [ ! -e "$ABS" ]; then ask "Creating a new file: $REL." "$TOOL $P"; fi
    ;;
esac

exit 0
