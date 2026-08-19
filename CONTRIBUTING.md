# Contributing

Thanks for contributing. This is the quick, practical path — for the full
branch model (taxonomy, merge methods, hotfix rules, protection), see
[`docs/BRANCHING.md`](docs/BRANCHING.md).

## Quick path

1. Branch from `dev`: `git checkout dev && git pull && git checkout -b feat/my-change`
   (see `docs/BRANCHING.md` for the full prefix list and when to use
   `hotfix/*` instead).
2. Commit using [Conventional Commits](#pr-title-rules): `git commit -m "feat: add cart summary"`.
3. Push and open a PR **into `dev`** (not `main`).
4. Wait for the `ci` check to go green (see [CI failed?](#ci-failed--what-to-do) below if it doesn't).
5. Squash-merge once green.

## Local commands

Run these before pushing — they are exactly what `ci` runs:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
```

## PR title rules

Title must follow Conventional Commits: `type(scope)?!: description`.

| Type | Meaning |
| --- | --- |
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | Code change with no behavior change |
| `chore` | Tooling, config, maintenance |
| `test` | Adding or fixing tests |
| `perf` | Performance improvement |
| `ci` | CI/workflow changes |
| `build` | Build system or dependencies |
| `style` | Formatting, no logic change |
| `revert` | Reverts a previous commit |

Scope is optional; `!` marks a breaking change.

**Good:**

```
feat(cart): add quantity stepper
fix(auth): handle expired refresh token
docs: clarify hotfix threshold
feat!: drop support for Node 18
```

**Bad:**

```
Fixed stuff                 # no type, uppercase description
update: bump deps           # "update" is not a valid type
feat: Add Cart Feature.     # type ok, but avoid title case / trailing period
WIP                         # no type, no description
```

## CI failed — what to do

| Check | Failure means | Fix |
| --- | --- | --- |
| Validate branch name | Branch prefix isn't in the allowed taxonomy | Rename the branch, or open a fresh one with an allowed prefix — see `docs/BRANCHING.md` |
| Validate PR title | Title doesn't match `type(scope)?!: description` | Edit the PR title (the check re-runs automatically) |
| `pnpm lint` | ESLint found a violation | Run `pnpm lint` locally, fix, push |
| `pnpm typecheck` | TypeScript compile error | Run `pnpm typecheck` locally, fix, push |
| `pnpm test` | A test failed | Run `pnpm test` locally, fix the code or the test, push |

## Contributor checklist

- [ ] Branch cut from `dev` (or `main` for a qualifying `hotfix/*` — see `docs/BRANCHING.md`)
- [ ] Commits and PR title follow Conventional Commits
- [ ] `pnpm lint && pnpm typecheck && pnpm test` pass locally
- [ ] PR targets `dev` (or `main` for `hotfix/*`)
