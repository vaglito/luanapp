# Branch protection rulesets

**Committing these files activates nothing.** Unlike `.github/workflows/`,
GitHub does not auto-apply anything under `.github/rulesets/`. These are
plain JSON exports — inert until explicitly imported via the API.

## Activate

Run these only after `ci/pr-validation-gate` has merged into `main` and the
`ci` check has reported at least once (a check name is not selectable by a
ruleset until GitHub has seen it):

```bash
gh api --method POST repos/{owner}/{repo}/rulesets --input .github/rulesets/main.json
gh api --method POST repos/{owner}/{repo}/rulesets --input .github/rulesets/dev.json
```

Run `main.json` before `dev.json` — order does not matter functionally, but
keeps activation output easy to read against this doc.

If the API rejects `bypass_actors`, add the bypass actor manually afterwards
in **Settings → Rules → Rulesets → \<ruleset\> → Bypass list**.

## Verify

```bash
gh api repos/{owner}/{repo}/rulesets   # expect: two rulesets, enforcement "active"
gh api repos/{owner}/{repo}/rules/branches/main
gh api repos/{owner}/{repo}/rules/branches/dev
```

Each branch should report four rules: `deletion`, `non_fast_forward`,
`pull_request`, `required_status_checks`.

### These rules do not apply to a repository admin

Both rulesets grant `RepositoryRole 5` (admin) a `bypass_mode` of `always`.
Confirm what that means for your own account:

```bash
gh api repos/{owner}/{repo}/rulesets/{id} --jq '.current_user_can_bypass'
```

If this returns `always`, then `git push origin main` **will succeed for you**
and is not a valid way to test that protection works. Verify with the API
output above instead.

The bypass is deliberate — it keeps a single maintainer from being locked out
of their own repository during an incident. The cost is that it is on you, not
on GitHub, to follow `docs/BRANCHING.md` when the tooling would let you skip
it. To make the rules bind the admin too, remove the `bypass_actors` entry from
both JSON files before importing.

See `docs/BRANCHING.md` for what each rule enforces and why.
