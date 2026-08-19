# Branching strategy

Two permanent trunks — `main` (production) and `dev` (integration) — plus
short-lived working branches. This is the normative model: what each branch
type is for, how it merges, and what gets tagged. For the day-to-day
procedure (commands, PR checklist), see [`CONTRIBUTING.md`](../CONTRIBUTING.md).

## Branch taxonomy

| Branch type | Cut from | PR into | Merge method | Tagged? |
| --- | --- | --- | --- | --- |
| `feat/*` | `dev` | `dev` | Squash | No |
| `fix/*` | `dev` | `dev` | Squash | No |
| `chore/*` | `dev` | `dev` | Squash | No |
| `docs/*` | `dev` | `dev` | Squash | No |
| `ci/*` | `dev` | `dev` | Squash | No |
| `refactor/*` | `dev` | `dev` | Squash | No |
| `test/*` | `dev` | `dev` | Squash | No |
| `perf/*` | `dev` | `dev` | Squash | No |
| `hotfix/*` | `main` | `main` | Squash | Yes — squash commit is tagged |
| `dev` → `main` release | `dev` | `main` | Merge commit (`--no-ff`) | Yes — merge commit is tagged |
| `main` → `dev` back-merge | `main` | `dev` | Merge commit (`--no-ff`) | No |

No permanent `release/*` branches exist.

## Why `dev` → `main` is a merge commit, not squash or rebase

GitHub pull requests cannot fast-forward — every merge method creates a new
commit or rewrites history. Squash or rebase on the `dev` → `main` release PR
would break `dev` being an ancestor of `main`, which forces a hard reset of
`dev` on every single release just to resync it. A `--no-ff` merge commit
avoids that entirely:

- `dev` stays a true ancestor of `main` after every release — no reset ever
  required.
- `git log --first-parent main` becomes a one-line-per-release changelog:
  each entry is exactly one release merge commit, in order, with nothing
  from individual working-branch commits cluttering it.

Every other merge (working branch → `dev`, `hotfix/*` → `main`) squashes
instead, because those commits are *not* meant to be release checkpoints —
squash keeps `dev`'s and `main`'s per-commit history to one entry per PR.

## `hotfix/*` qualification threshold

**QUALIFIES** for `hotfix/*` (cut from `main`, merges straight back into
`main`):

- Site does not load.
- Cart or checkout is broken.
- Users cannot log in.
- Customer data is exposed.

**DOES NOT QUALIFY** — use `fix/*` into `dev` instead:

- Visual/layout defects.
- Misaligned prices.
- Typos.
- Images not loading.
- Mobile button placement.
- Slowness without an error.

Without a written threshold, everything becomes "urgent," the fast lane
wins, and `dev` gets bypassed under a new name. When in doubt, it does not
qualify — open `fix/*` into `dev`.

## Tagging rules

- Format: `vX.Y.Z` (semver) only. No other tag pattern triggers a deploy.
- Tags are created on `main` only, on the commit that PR merged (the release
  merge commit, or the hotfix squash commit).
- The deploy workflow triggers on `v*` tag pushes and checks out the exact
  tagged commit — not `main`'s current tip. Tagging a commit that is not
  `main`'s tip and pushing it deploys exactly that commit.

## Back-merge rule

Immediately after any change lands on `main` outside the normal `dev` →
`main` release flow (a `hotfix/*` merge, or a bootstrap-exception PR — see
below), `main` MUST be merged back into `dev` via a merge commit:

```bash
git checkout dev
git merge --no-ff origin/main
git push origin dev
```

This keeps `main` reachable from `dev`, verified by:

```bash
git merge-base --is-ancestor origin/main origin/dev
```

This command exits `0` when the invariant holds and non-zero when `dev` has
drifted behind `main`. Run it after every back-merge.

## Prefix-vs-commit-type asymmetry

Branch prefixes and Conventional Commit types are two different lists, kept
deliberately close but not identical:

| Case | Direction |
| --- | --- |
| `hotfix/*` | Branch-only — its PR title still uses `fix:` |
| `build`, `style`, `revert` | Title-only — no matching branch prefix |

This is now a small, one-directional asymmetry (a prior draft also allowed a
`ui/` branch prefix with no matching `ui` commit type — that was removed
specifically to eliminate the asymmetry it created; see the amendment note
in the project's SDD decision log). Everything else lines up 1:1 between
branch prefix and commit type.

## Branch protection

| Rule | `main` | `dev` |
| --- | --- | --- |
| PR required before merge | Yes | Yes |
| Required status check | `ci` | `ci` |
| Force pushes | Blocked | Blocked |
| Branch deletion | Blocked | Blocked |
| Required approving reviews | 0 | 0 |
| Allowed merge methods | Merge, Squash | Squash |
| Repo owner bypass | Yes (break-glass, always) | Yes (break-glass, always) |

Required approving reviews are `0` on both branches today because
self-approval is impossible on GitHub with a near-solo contributor — a
review requirement would just block every PR on itself.

**Escalation trigger**: the moment a second regular contributor joins the
project, required approving reviews on both `main` and `dev` MUST be raised
to `1`, and a `CODEOWNERS` file MUST be added so review assignment is
automatic instead of ad hoc.

## Bootstrap exception (historical)

The four governance PRs that introduced this branching strategy (deploy
fix, lint/typecheck toolchain, this documentation, and the CI gate itself)
targeted `main` directly, one time only, documented as a bootstrap exception
in each PR body. This was necessary because the new rules say `main` only
accepts `dev`, and merging `dev` at that point would have dragged in
unrelated, out-of-scope product commits already sitting on `dev`.
Immediately after the last of those four PRs merged, `main` was back-merged
into `dev` (see the rule above) to restore the ancestry invariant, and
rulesets were activated — which makes repeating this exception impossible
going forward.
