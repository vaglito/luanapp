import { describe, it, expect } from "vitest";
import { getUserRoles } from "@/lib/getUserRoles";
import type { JWT } from "next-auth/jwt";

function makeToken(overrides: Record<string, unknown> = {}): JWT {
  return {
    name: "Test User",
    email: "test@example.com",
    sub: "123",
    accessToken: "fake-access-token",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
    jti: "jti-123",
    ...overrides,
  } as unknown as JWT;
}

describe("getUserRoles", () => {
  it('includes EDITOR when token.isEditor is true (#63)', () => {
    const token = makeToken({ isEditor: true });
    const roles = getUserRoles(token);
    expect(roles).toContain("EDITOR");
  });

  it("does NOT include EDITOR when token.isEditor is false", () => {
    const token = makeToken({ isEditor: false });
    const roles = getUserRoles(token);
    expect(roles).not.toContain("EDITOR");
  });

  it("does NOT include EDITOR when token.isEditor is undefined", () => {
    const token = makeToken({});
    const roles = getUserRoles(token);
    expect(roles).not.toContain("EDITOR");
  });

  it("EDITOR coexists with other roles", () => {
    const token = makeToken({ isEditor: true, isAdmin: true, isSeller: true });
    const roles = getUserRoles(token);
    expect(roles).toContain("ADMIN");
    expect(roles).toContain("SELLER");
    expect(roles).toContain("EDITOR");
  });
});
