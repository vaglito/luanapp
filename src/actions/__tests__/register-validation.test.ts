import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock next-auth to avoid pnpm module resolution issues
vi.mock("next-auth", () => ({
  AuthError: class extends Error {
    type: string;
    constructor(message: string) {
      super(message);
      this.type = "CredentialsSignin";
    }
  },
}));

vi.mock("@/auth", () => ({
  signIn: vi.fn().mockResolvedValue({ ok: true }),
}));

// Mock axios before importing (RegisterUser imports axios inline)
vi.mock("axios", () => ({
  default: { isAxiosError: vi.fn(() => false) },
  isAxiosError: vi.fn(() => false),
}));

// Mock apiClient to avoid real HTTP calls
vi.mock("@/services/apiPublic", () => ({
  default: {
    post: vi.fn().mockResolvedValue({ data: { id: 1, email: "test@test.com" } }),
  },
}));

import { RegisterUser } from "@/actions/auth-actions";
import type { RegisterInput } from "@/validations/auth/register.schema";

function makeValidInput(): RegisterInput {
  return {
    name: "Juan",
    lastName: "Pérez",
    email: "juan@example.com",
    password: "password123",
    confirmPassword: "password123",
    phone: "999888777",
    birthdate: "1990-01-01",
    document: "DNI",
    documentNumber: "12345678",
  };
}

describe("RegisterUser Zod validation (#59)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns field errors for invalid input (missing email)", async () => {
    const badInput = { ...makeValidInput(), email: "" };
    const result = await RegisterUser(badInput);

    expect(result).toHaveProperty("error");
    expect(result).toHaveProperty("fieldErrors");
    expect((result as { error: string; fieldErrors: unknown }).error).toBe(
      "Hay errores en los datos ingresados"
    );
  });

  it("returns field errors when password and confirmPassword mismatch", async () => {
    const badInput = {
      ...makeValidInput(),
      password: "password123",
      confirmPassword: "different",
    };
    const result = await RegisterUser(badInput);

    expect(result).toHaveProperty("error");
    expect(result).toHaveProperty("fieldErrors");
  });

  it("returns field errors for short name", async () => {
    const badInput = { ...makeValidInput(), name: "A" };
    const result = await RegisterUser(badInput);

    expect(result).toHaveProperty("error");
    expect(result).toHaveProperty("fieldErrors");
  });

  it("does NOT call the API for invalid input", async () => {
    const apiClient = await import("@/services/apiPublic");
    const badInput = { ...makeValidInput(), email: "" };
    await RegisterUser(badInput);

    expect(apiClient.default.post).not.toHaveBeenCalled();
  });

  it("returns data for valid input (API call proceeds)", async () => {
    const validInput = makeValidInput();
    const result = await RegisterUser(validInput);

    // Valid input should not have validation errors
    expect(result).not.toHaveProperty("fieldErrors");
  });
});
