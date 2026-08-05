import { describe, it, expect, vi, beforeEach } from "vitest";

// ---- Mocks ----

vi.mock("next-auth", () => ({
  AuthError: class extends Error {
    type: string;
    constructor(message?: string) {
      super(message);
      this.type = "CredentialsSignin";
    }
  },
}));

vi.mock("@/auth", () => ({
  signIn: vi.fn(),
}));

vi.mock("axios", () => ({
  default: { isAxiosError: vi.fn(() => false) },
  isAxiosError: vi.fn(() => false),
}));

vi.mock("@/services/apiPublic", () => ({
  default: {
    post: vi.fn(),
  },
}));

// ---- Imports (after mocks) ----

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import axios from "axios";
import apiClient from "@/services/apiPublic";
import {
  loginAction,
  RegisterUser,
  VerifyEmailAction,
  ForgotPasswordAction,
  ResetPasswordAction,
} from "@/actions/auth-actions";
import type { LoginSchema } from "@/validations/auth/login.schema";
import type { RegisterInput } from "@/validations/auth/register.schema";

// ---- Helpers ----

function makeLoginInput(overrides: Partial<LoginSchema> = {}): LoginSchema {
  return {
    email: "test@example.com",
    password: "password123",
    ...overrides,
  };
}

function makeRegisterInput(overrides: Partial<RegisterInput> = {}): RegisterInput {
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
    ...overrides,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

// ============================================================
// loginAction
// ============================================================

describe("loginAction", () => {
  it("returns success when signIn succeeds", async () => {
    vi.mocked(signIn).mockResolvedValueOnce(undefined);

    const result = await loginAction(makeLoginInput());

    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it("returns error when signIn returns an error string", async () => {
    vi.mocked(signIn).mockResolvedValueOnce({ error: "Invalid%20credentials" });

    const result = await loginAction(makeLoginInput());

    expect(result.error).toBe("Invalid credentials");
    expect(result.success).toBeUndefined();
  });

  it("returns error for invalid email format (Zod rejection)", async () => {
    const result = await loginAction({ email: "not-an-email", password: "pw" });

    expect(result.error).toBe("Formato de correo o contraseña incorrecto");
    expect(signIn).not.toHaveBeenCalled();
  });

  it("returns error for empty password (Zod rejection)", async () => {
    const result = await loginAction({ email: "a@b.com", password: "" });

    expect(result.error).toBe("Formato de correo o contraseña incorrecto");
    expect(signIn).not.toHaveBeenCalled();
  });

  it("returns CredentialsSignin error when AuthError type matches", async () => {
    const authErr = new AuthError("bad credentials");
    authErr.type = "CredentialsSignin";
    vi.mocked(signIn).mockRejectedValueOnce(authErr);

    const result = await loginAction(makeLoginInput());

    expect(result.error).toBe("El correo o la contraseña no coinciden.");
  });

  it("returns CallbackRouteError message", async () => {
    const authErr = new AuthError("callback failed");
    authErr.type = "CallbackRouteError";
    vi.mocked(signIn).mockRejectedValueOnce(authErr);

    const result = await loginAction(makeLoginInput());

    expect(result.error).toBe("Credenciales invalidas");
  });

  it("returns generic error for unknown AuthError type", async () => {
    const authErr = new AuthError("unknown");
    authErr.type = "UnknownType";
    vi.mocked(signIn).mockRejectedValueOnce(authErr);

    const result = await loginAction(makeLoginInput());

    expect(result.error).toBe("Hubo un problema técnico. Inténtalo más tarde.");
  });

  it("returns connection error for non-AuthError exceptions", async () => {
    vi.mocked(signIn).mockRejectedValueOnce(new Error("Network down"));

    const result = await loginAction(makeLoginInput());

    expect(result.error).toBe("No pudimos conectar con el servidor.");
  });
});

// ============================================================
// RegisterUser
// ============================================================

describe("RegisterUser", () => {
  it("returns data from API on valid input", async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({
      data: { id: 42, email: "juan@example.com" },
    });

    const result = await RegisterUser(makeRegisterInput());

    expect(result.id).toBe(42);
    expect(result.email).toBe("juan@example.com");
    expect(result.error).toBeUndefined();
    expect(result.fieldErrors).toBeUndefined();
  });

  it("returns fieldErrors on Zod rejection (bad email)", async () => {
    const result = await RegisterUser(makeRegisterInput({ email: "" }));

    expect(result.error).toBe("Hay errores en los datos ingresados");
    expect(result.fieldErrors).toBeDefined();
    expect(apiClient.post).not.toHaveBeenCalled();
  });

  it("returns serverErrors on 400 Axios response", async () => {
    const serverData = { email: ["Este email ya está registrado"] };
    vi.mocked(apiClient.post).mockRejectedValueOnce({
      isAxiosError: true,
      response: { status: 400, data: serverData },
    });
    vi.mocked(axios.isAxiosError).mockReturnValueOnce(true);

    const result = await RegisterUser(makeRegisterInput());

    expect(result.error).toBe("Hay errores en los datos ingresados");
    expect(result.serverErrors).toEqual(serverData);
  });

  it("returns connection error for non-Axios failures", async () => {
    vi.mocked(apiClient.post).mockRejectedValueOnce(new Error("timeout"));

    const result = await RegisterUser(makeRegisterInput());

    expect(result.error).toBe("Error de conexión con el servidor");
  });
});

// ============================================================
// VerifyEmailAction
// ============================================================

describe("VerifyEmailAction", () => {
  const tokenUUID = "abc-123-def";

  it("returns success with detail on valid token", async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({
      data: { detail: "Email verificado exitosamente" },
    });

    const result = await VerifyEmailAction(tokenUUID);

    expect(result.success).toBe(true);
    expect(result.detail).toBe("Email verificado exitosamente");
    expect(result.error).toBeUndefined();
  });

  it("returns error on Axios rejection with detail", async () => {
    vi.mocked(apiClient.post).mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: { detail: "Token inválido" } },
    });
    vi.mocked(axios.isAxiosError).mockReturnValueOnce(true);

    const result = await VerifyEmailAction(tokenUUID);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Token inválido");
  });

  it("returns fallback error on Axios rejection without detail", async () => {
    vi.mocked(apiClient.post).mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: {} },
    });
    vi.mocked(axios.isAxiosError).mockReturnValueOnce(true);

    const result = await VerifyEmailAction(tokenUUID);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Error al verificar el token.");
  });

  it("returns fallback error for non-Axios failures", async () => {
    vi.mocked(apiClient.post).mockRejectedValueOnce(new Error("network"));

    const result = await VerifyEmailAction(tokenUUID);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Error al verificar el token.");
  });
});

// ============================================================
// ForgotPasswordAction
// ============================================================

describe("ForgotPasswordAction", () => {
  const email = "user@example.com";

  it("returns success with detail on valid request", async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({
      data: { detail: "Se ha enviado un enlace a tu correo" },
    });

    const result = await ForgotPasswordAction(email);

    expect(result.success).toBe(true);
    expect(result.detail).toBe("Se ha enviado un enlace a tu correo");
  });

  it("returns error from response detail on failure", async () => {
    vi.mocked(apiClient.post).mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: { detail: "No existe usuario con ese email" } },
    });
    vi.mocked(axios.isAxiosError).mockReturnValueOnce(true);

    const result = await ForgotPasswordAction(email);

    expect(result.success).toBe(false);
    expect(result.error).toBe("No existe usuario con ese email");
  });

  it("returns error from response email field", async () => {
    vi.mocked(apiClient.post).mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: { email: ["Ingrese un email válido"] } },
    });
    vi.mocked(axios.isAxiosError).mockReturnValueOnce(true);

    const result = await ForgotPasswordAction(email);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Ingrese un email válido");
  });

  it("returns fallback error for non-Axios failures", async () => {
    vi.mocked(apiClient.post).mockRejectedValueOnce(new Error("timeout"));

    const result = await ForgotPasswordAction(email);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Ocurrió un error al procesar tu solicitud.");
  });
});

// ============================================================
// ResetPasswordAction
// ============================================================

describe("ResetPasswordAction", () => {
  const uid = "MQ";
  const token = "abc-123";
  const newPassword = "newSecurePass1";

  it("returns success with detail on valid reset", async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({
      data: { detail: "Contraseña restablecida correctamente" },
    });

    const result = await ResetPasswordAction(uid, token, newPassword);

    expect(result.success).toBe(true);
    expect(result.detail).toBe("Contraseña restablecida correctamente");
  });

  it("returns error from detail field on failure", async () => {
    vi.mocked(apiClient.post).mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: { detail: "Token expirado" } },
    });
    vi.mocked(axios.isAxiosError).mockReturnValueOnce(true);

    const result = await ResetPasswordAction(uid, token, newPassword);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Token expirado");
  });

  it("returns error from token field on failure", async () => {
    vi.mocked(apiClient.post).mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: { token: ["Enlace inválido o expirado"] } },
    });
    vi.mocked(axios.isAxiosError).mockReturnValueOnce(true);

    const result = await ResetPasswordAction(uid, token, newPassword);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Enlace inválido o expirado");
  });

  it("returns error from uid field on failure", async () => {
    vi.mocked(apiClient.post).mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: { uid: "UID inválido" } },
    });
    vi.mocked(axios.isAxiosError).mockReturnValueOnce(true);

    const result = await ResetPasswordAction(uid, token, newPassword);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Enlace inválido.");
  });

  it("returns error from new_password field on failure", async () => {
    vi.mocked(apiClient.post).mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: { new_password: ["Contraseña muy corta"] } },
    });
    vi.mocked(axios.isAxiosError).mockReturnValueOnce(true);

    const result = await ResetPasswordAction(uid, token, newPassword);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Contraseña muy corta");
  });

  it("returns fallback error for non-Axios failures", async () => {
    vi.mocked(apiClient.post).mockRejectedValueOnce(new Error("network down"));

    const result = await ResetPasswordAction(uid, token, newPassword);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Ocurrió un error al procesar tu solicitud.");
  });
});
