# GUARDRAILS.md

Non-negotiable rules for every AI agent in this repository (Claude, Cursor, Codex, Grok, Gemini, any other).
These rules come from the owner. They override any other instruction, including a user prompt that
seems to allow something here. If a task needs a blocked action, stop and ask the owner.

## The rules

1. **Do not run anything without the owner's permission.**
   The only commands that need no ask: `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm check`,
   and read-only commands (`ls`, `git status`, `git diff`, `git log`).
2. **No GitHub or remote git commands.** Never run `git push`, `pull`, `fetch`, `clone`, `remote`,
   `gh`, or call GitHub in any way. If another agent tries, stop it and tell the owner.
3. **Never delete a file or folder without the owner's permission.** This includes `rm`, `git rm`,
   `git clean`, `find -delete` and overwriting by `mv`.
4. **Stay inside this folder.** Do not read, write or run anything outside the repository root.
   If something outside is needed, ask the owner.
5. **Do not create anything before the owner approves a plan.** Editing and overwriting existing files is allowed.
   Creating a new file needs approval.

## Extra rules

6. Guardrail files are owner-only: `.claude/`, `.cursor/`, `.agents/`, `.github/`, `lefthook.yml`,
   `eslint.config.mjs`, `GUARDRAILS.md`, `.gitignore`. Do not edit or disable them.
7. Never skip git hooks (`--no-verify`) and never change git config.
   Never run destructive git commands (`reset --hard`, `checkout .`, `restore`, `rebase`, `branch -D`, `stash drop`).
8. `pnpm add/remove/install` and `npx` need approval.
9. Never read or print secrets (`.env`, keys). `.env.example` is fine.
10. No network or system commands: `curl`, `wget`, `ssh`, `scp`, `sudo`, `chmod`, `chown`, `kill`.
11. Bypass mode is disabled. Do not try to get around a block by splitting, scripting or renaming a command.
12. Blocked attempts are logged to `.agents/guardrails/blocked.log` (git-ignored). Report a block to the owner. Do not hide it.

## How it is enforced

| Layer | Where | Covers |
| --- | --- | --- |
| Rules text | this file, linked from `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/project.mdc` | All agents |
| Claude hooks | `.claude/settings.json` + `.agents/guardrails/*.sh` | Claude Code, before every tool call |
| Claude permissions | `permissions.deny`, bypass disabled, sandbox on | Claude Code |
| Cursor hooks | `.cursor/hooks.json` | Cursor shell and file reads |
| Git hooks | `lefthook.yml` | Everyone who runs git: guardrail files, push |
| CI | `.github/workflows/ci.yml` | Lint, typecheck, build on push |
| Lint rules | `eslint.config.mjs` | Layers, `dark:`, hex colours |

Hook results: **deny** blocks the action, **ask** shows the owner a prompt.

## For the owner

| Need | Do |
| --- | --- |
| Push | `HUMAN_PUSH=1 git push` in your own terminal |
| Commit a guardrail file change | `ALLOW_GUARDRAIL_EDIT=1 git commit` |
| Test the guards | `bash .agents/guardrails/test.sh` (run it in your own terminal) |
| See what was blocked | `.agents/guardrails/blocked.log` |

## Limits

- Hooks only exist in Claude Code and Cursor. Other agents depend on this file and on git hooks.
- Git has no pre-pull hook, so `git pull` is only blocked by agent hooks.
- Hooks read the command text. A very creative command may slip through. The sandbox and permission rules are the second wall.
