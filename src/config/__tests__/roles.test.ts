import { describe, it, expect } from "vitest";
import { ROLE_PERMISSIONS } from "@/config/roles";

describe("ROLE_PERMISSIONS", () => {
  it('EDITOR permission includes "dashboard.view" (#64)', () => {
    expect(ROLE_PERMISSIONS.EDITOR).toEqual(["dashboard.view", "products.manage"]);
  });

  it("does not contain the typo 'desboard.view'", () => {
    const perms = ROLE_PERMISSIONS.EDITOR;
    expect(perms.some((p) => p.includes("desboard"))).toBe(false);
  });
});
