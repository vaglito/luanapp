import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock usePathname and useRouter
vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
  useRouter: () => ({ push: vi.fn() }),
}));

import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
import type { User } from "next-auth";

function makeUser(overrides: Partial<User> = {}): User {
  return {
    name: "Admin User",
    email: "admin@example.com",
    isAdmin: true,
    ...overrides,
  } as unknown as User;
}

describe("DashboardBottomNav dead links (#60)", () => {
  it("does NOT render 'Ventas' link (route /dashboard/sales does not exist)", () => {
    const user = makeUser({ isAdmin: true, isSeller: true });
    render(<DashboardBottomNav user={user} onMenuClick={vi.fn()} />);
    expect(screen.queryByText("Ventas")).not.toBeInTheDocument();
  });

  it("does NOT render 'Servicio' link for technician user", () => {
    const user = makeUser({ isTechnician: true });
    render(<DashboardBottomNav user={user} onMenuClick={vi.fn()} />);
    expect(screen.queryByText("Servicio")).not.toBeInTheDocument();
  });

  it('always renders "Facturas" as the third action', () => {
    const user = makeUser({ isAdmin: true, isSeller: true });
    render(<DashboardBottomNav user={user} onMenuClick={vi.fn()} />);
    expect(screen.getByText("Facturas")).toBeInTheDocument();
  });

  it("renders 'Inicio' and 'Perfil' links", () => {
    const user = makeUser();
    render(<DashboardBottomNav user={user} onMenuClick={vi.fn()} />);
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Perfil")).toBeInTheDocument();
  });
});
