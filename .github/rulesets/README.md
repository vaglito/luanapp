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
gh api repos/{owner}/{repo}/rulesets
git push origin main   # expect: rejected
git push origin dev    # expect: rejected
```

See `docs/BRANCHING.md` for what each rule enforces and why.
