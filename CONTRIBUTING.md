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

## Releasing (maintainers)

Nothing deploys until a `vX.Y.Z` tag is pushed. Merging to `main` is not a
release; tagging is.

**1. Open the release PR.** `dev` → `main`, titled `feat: release vX.Y.Z`:

```bash
gh pr create --base main --head dev --title "feat: release v3.6.0"
```

**2. Wait for `ci` to pass.** It is a required status check on `main`.

**3. Merge with a merge commit — not squash.**

```bash
gh pr merge <N> --merge
```

> `main` allows both `merge` and `squash`, and it has to: `hotfix/*` → `main`
> is squashed while `dev` → `main` is a merge commit. GitHub cannot pick the
> method based on where the PR came from, so **this step is not enforced by
> any rule.** Squashing a release rewrites every commit on `dev` into one new
> commit that `dev` does not contain, which breaks the shared ancestry and
> forces a resync on every release. See `docs/BRANCHING.md`.

**4. Tag the merge commit and push the tag.**

```bash
git checkout main && git pull origin main
git tag v3.6.0          # tags main's tip: the merge commit created in step 3
git push origin v3.6.0
```

Version numbers come from the tag history, not from `package.json` (whose
`version` field is not maintained). `git tag -l 'v*' --sort=-v:refname | head -1`
shows the current release.

**5. Watch the deploy.**

```bash
gh run watch
```

The workflow rejects any tag that is malformed or whose commit is not
reachable from `main`, then checks out that exact commit on the server.

**6. Verify what actually landed.** The deploy checks out the tagged commit
rather than `main`'s tip, so prove it:

```bash
git rev-parse v3.6.0^{commit}
ssh <user>@<host> 'cd /home/luana/luanapp && git rev-parse HEAD'
```

The two SHAs must match. If they do not, stop and investigate before tagging
anything else — a deploy that does not ship the tagged commit cannot be rolled
back by re-pushing an older tag.

### Rolling back

Deploy an earlier release by re-pushing its tag:

```bash
git push origin --force refs/tags/v3.5.6
```

This works only because the workflow deploys the tagged commit. Confirm with
step 6 afterwards.

### Hotfixes

A `hotfix/*` branch cuts from `main`, PRs into `main`, and is squashed. Tag the
squash commit, then back-merge `main` into `dev` immediately — see the
back-merge rule in `docs/BRANCHING.md`.
