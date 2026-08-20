import { describe, it, expect } from "vitest";
import {
  BRANCH_PREFIXES,
  COMMIT_TYPES,
  isValidBranchName,
  isValidPrTitle,
} from "../validate-ref-names.mjs";

describe("BRANCH_PREFIXES", () => {
  it("exposes exactly the nine allowed branch prefixes (ui/ removed per amendment #164)", () => {
    expect(BRANCH_PREFIXES).toEqual([
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
  });
});

describe("COMMIT_TYPES", () => {
  it("exposes exactly the eleven Conventional Commit types", () => {
    expect(COMMIT_TYPES).toEqual([
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
  });
});

describe("isValidBranchName — valid branches", () => {
  it.each(BRANCH_PREFIXES)("accepts prefix %s/ with a kebab description", (prefix) => {
    const result = isValidBranchName(`${prefix}/my-feature-123`);
    expect(result).toEqual({ valid: true });
  });

  it("accepts a single-character description", () => {
    expect(isValidBranchName("feat/x")).toEqual({ valid: true });
  });

  it("accepts dots and underscores-like separators within the description", () => {
    expect(isValidBranchName("chore/update-v1.2.3-notes")).toEqual({ valid: true });
  });
});

describe("isValidBranchName — permanent trunks", () => {
  // The trunks are not working branches, so the "<prefix>/<description>"
  // taxonomy does not apply to them. They still appear as a PR head_ref:
  // `dev` -> `main` is the release PR, `main` -> `dev` is the back-merge.
  // Rejecting them made the `ci` check unpassable for both flows, which the
  // required_status_checks rule on `main` then turned into a hard block.
  it.each(["main", "dev"])("accepts the trunk branch %s as a PR head", (trunk) => {
    expect(isValidBranchName(trunk)).toEqual({ valid: true });
  });

  it("still rejects a bare word that is not a trunk", () => {
    expect(isValidBranchName("ticket").valid).toBe(false);
  });

  it("does not exempt trunk names used as a description", () => {
    expect(isValidBranchName("feat/main")).toEqual({ valid: true });
    expect(isValidBranchName("mainly").valid).toBe(false);
    expect(isValidBranchName("develop").valid).toBe(false);
  });
});

describe("isValidBranchName — invalid branches", () => {
  it("rejects ui/ — REMOVED as an allowed prefix per amendment #164", () => {
    const result = isValidBranchName("ui/anything");
    expect(result.valid).toBe(false);
    expect(result.reason).toBeTruthy();
  });

  it("rejects a non-taxonomy prefix like feature/", () => {
    const result = isValidBranchName("feature/x");
    expect(result.valid).toBe(false);
    expect(result.reason).toBeTruthy();
  });

  it("rejects pr/01-x", () => {
    const result = isValidBranchName("pr/01-x");
    expect(result.valid).toBe(false);
  });

  it("rejects a bare word with no prefix at all", () => {
    const result = isValidBranchName("ticket");
    expect(result.valid).toBe(false);
    expect(result.reason).toBeTruthy();
  });

  it("rejects uppercase characters", () => {
    const result = isValidBranchName("feat/MyFeature");
    expect(result.valid).toBe(false);
  });

  it("rejects a trailing slash with no description", () => {
    const result = isValidBranchName("feat/");
    expect(result.valid).toBe(false);
  });

  it("rejects an empty description after a valid prefix", () => {
    const result = isValidBranchName("fix/");
    expect(result.valid).toBe(false);
  });

  it("rejects an empty string", () => {
    const result = isValidBranchName("");
    expect(result.valid).toBe(false);
    expect(result.reason).toBeTruthy();
  });
});

describe("isValidBranchName — injection payloads (threat matrix: PR commands / attacker-influenceable strings)", () => {
  const payloads = [
    "feat/x; rm -rf /",
    "feat/$(id)",
    "feat/`id`",
    "feat/line1\nline2",
    "feat/-leading-dash",
    "feat/../escape",
    "feat/UPPERCASE",
    `feat/${"a".repeat(300)}`,
  ];

  it.each(payloads)("rejects branch payload: %j", (payload) => {
    const result = isValidBranchName(payload);
    expect(result.valid).toBe(false);
    expect(result.reason).toBeTruthy();
  });
});

describe("isValidPrTitle — valid titles", () => {
  it.each(COMMIT_TYPES)("accepts type %s with a description", (type) => {
    const result = isValidPrTitle(`${type}: a real change happened`);
    expect(result).toEqual({ valid: true });
  });

  it("accepts an optional scope", () => {
    expect(isValidPrTitle("feat(cart): x")).toEqual({ valid: true });
  });

  it("accepts a breaking-change marker with no scope", () => {
    expect(isValidPrTitle("feat!: x")).toEqual({ valid: true });
  });

  it("accepts a breaking-change marker with a scope", () => {
    expect(isValidPrTitle("fix(auth)!: x")).toEqual({ valid: true });
  });
});

describe("isValidPrTitle — invalid titles", () => {
  it("rejects a type not in the Conventional Commit set", () => {
    const result = isValidPrTitle("update: fixed stuff");
    expect(result.valid).toBe(false);
    expect(result.reason).toBeTruthy();
  });

  it("rejects a title with no colon separator", () => {
    const result = isValidPrTitle("fixed stuff");
    expect(result.valid).toBe(false);
  });

  it("rejects a title with no description after the colon", () => {
    const result = isValidPrTitle("fix:");
    expect(result.valid).toBe(false);
  });

  it("rejects an uppercase type", () => {
    const result = isValidPrTitle("Fix: bug");
    expect(result.valid).toBe(false);
  });

  it("rejects an empty string", () => {
    const result = isValidPrTitle("");
    expect(result.valid).toBe(false);
    expect(result.reason).toBeTruthy();
  });
});

describe("isValidPrTitle — injection payloads (threat matrix: PR commands / attacker-influenceable strings)", () => {
  const payloads = [
    "; rm -rf /",
    "$(id)",
    "`id`",
    "feat: ok\nmalicious",
    "-leading-dash: x",
    "../escape: x",
    "FEAT: uppercase type",
    `feat: ${"a".repeat(300)}`,
  ];

  it.each(payloads)("rejects title payload: %j", (payload) => {
    const result = isValidPrTitle(payload);
    expect(result.valid).toBe(false);
    expect(result.reason).toBeTruthy();
  });
});

describe("Real-world acceptance checks used by this change itself", () => {
  it("accepts the branch name for this SDD change", () => {
    expect(isValidBranchName("chore/gitflow-branching-strategy")).toEqual({ valid: true });
  });

  it("accepts the intended PR title for this SDD change", () => {
    expect(
      isValidPrTitle("chore: formalize and enforce the branching strategy"),
    ).toEqual({ valid: true });
  });
});
