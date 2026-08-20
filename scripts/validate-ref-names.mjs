#!/usr/bin/env node
/**
 * Validates branch names and PR titles against the two-trunk branching
 * strategy documented in docs/BRANCHING.md.
 *
 * Exposes pure functions for unit testing (see
 * scripts/__tests__/validate-ref-names.test.mjs) and a CLI entrypoint that
 * reads PR_BRANCH / PR_TITLE from process.env (never argv, never shell
 * interpolation) so it is safe to wire directly into CI with untrusted,
 * PR-author-controlled input.
 */

const MAX_LENGTH = 255;
const DOCS_LINK = "See docs/BRANCHING.md for the full branch and commit naming rules.";

/** Branch prefixes allowed by the branching strategy (ui/ removed — amendment #164). */
export const BRANCH_PREFIXES = Object.freeze([
  "feat",
  "fix",
  "chore",
  "docs",
  "ci",
  "refactor",
  "test",
  "perf",
  "hotfix",
]);

/**
 * Permanent trunks. These are not working branches, so the
 * "<prefix>/<description>" taxonomy does not apply — but they do appear as a
 * PR head: `dev` -> `main` is the release PR, `main` -> `dev` is the
 * back-merge. Both must be able to pass the `ci` check.
 */
export const TRUNK_BRANCHES = Object.freeze(["main", "dev"]);

/** Conventional Commit types allowed as PR title prefixes. */
export const COMMIT_TYPES = Object.freeze([
  "build",
  "chore",
  "ci",
  "docs",
  "feat",
  "fix",
  "perf",
  "refactor",
  "revert",
  "style",
  "test",
]);

const BRANCH_NAME_PATTERN = new RegExp(
  `^(${BRANCH_PREFIXES.join("|")})\\/[a-z0-9][a-z0-9._-]*$`,
);

const PR_TITLE_PATTERN = new RegExp(
  `^(${COMMIT_TYPES.join("|")})(\\([a-z0-9._-]+\\))?!?: .+$`,
);

/**
 * @param {string} name
 * @returns {{ valid: boolean, reason?: string }}
 */
export function isValidBranchName(name) {
  if (typeof name !== "string" || name.length === 0) {
    return { valid: false, reason: "Branch name is empty." };
  }

  if (name.length > MAX_LENGTH) {
    return {
      valid: false,
      reason: `Branch name exceeds ${MAX_LENGTH} characters.`,
    };
  }

  // Exact match only — never a pattern, so no name merely containing a trunk
  // name is exempted.
  if (TRUNK_BRANCHES.includes(name)) {
    return { valid: true };
  }

  if (!BRANCH_NAME_PATTERN.test(name)) {
    return {
      valid: false,
      reason: `Branch name must match "<prefix>/<kebab-description>". Allowed prefixes: ${BRANCH_PREFIXES.join(", ")}.`,
    };
  }

  return { valid: true };
}

/**
 * @param {string} title
 * @returns {{ valid: boolean, reason?: string }}
 */
export function isValidPrTitle(title) {
  if (typeof title !== "string" || title.length === 0) {
    return { valid: false, reason: "PR title is empty." };
  }

  if (title.length > MAX_LENGTH) {
    return {
      valid: false,
      reason: `PR title exceeds ${MAX_LENGTH} characters.`,
    };
  }

  if (!PR_TITLE_PATTERN.test(title)) {
    return {
      valid: false,
      reason: `PR title must follow Conventional Commits: "type(scope)?!: description". Allowed types: ${COMMIT_TYPES.join(", ")}.`,
    };
  }

  return { valid: true };
}

function main() {
  const branch = process.env.PR_BRANCH ?? "";
  const title = process.env.PR_TITLE ?? "";
  let failed = false;

  const branchResult = isValidBranchName(branch);
  if (branchResult.valid) {
    console.log(`OK branch name "${branch}" is valid.`);
  } else {
    failed = true;
    console.error(`FAIL branch name "${branch}": ${branchResult.reason}`);
    console.error(DOCS_LINK);
  }

  const titleResult = isValidPrTitle(title);
  if (titleResult.valid) {
    console.log(`OK PR title "${title}" is valid.`);
  } else {
    failed = true;
    console.error(`FAIL PR title "${title}": ${titleResult.reason}`);
    console.error(DOCS_LINK);
  }

  if (failed) {
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
