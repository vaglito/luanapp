import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import type { User } from "next-auth";

function makeUser(overrides: Partial<User> = {}): User {
  return {
    name: "Admin User",
    email: "admin@example.com",
    isAdmin: true,
    ...overrides,
  } as unknown as User;
}

describe("DashboardSidebar dead links (#62)", () => {
  it("hides 'Usuarios' link (route /dashboard/users does not exist)", () => {
    const user = makeUser({ isAdmin: true });
    render(<DashboardSidebar user={user} />);
    expect(screen.queryByText("Usuarios")).not.toBeInTheDocument();
  });

  it("hides 'Configuración' link (route /dashboard/settings does not exist)", () => {
    const user = makeUser({ isAdmin: true });
    render(<DashboardSidebar user={user} />);
    expect(screen.queryByText("Configuración")).not.toBeInTheDocument();
  });

  it("hides 'Ventas' link (route /dashboard/sales does not exist)", () => {
    const user = makeUser({ isAdmin: true });
    render(<DashboardSidebar user={user} />);
    expect(screen.queryByText("Ventas")).not.toBeInTheDocument();
  });

  it("hides 'Ordenes' link (route /dashboard/ordenes does not exist)", () => {
    const user = makeUser({ isAdmin: true });
    render(<DashboardSidebar user={user} />);
    expect(screen.queryByText("Ordenes")).not.toBeInTheDocument();
  });

  it("hides 'Servicio Técnico' link (route /dashboard/tech does not exist)", () => {
    const user = makeUser({ isAdmin: true });
    render(<DashboardSidebar user={user} />);
    expect(screen.queryByText("Servicio Técnico")).not.toBeInTheDocument();
  });

  it("still shows 'Panel Principal' link", () => {
    const user = makeUser({ isAdmin: true });
    render(<DashboardSidebar user={user} />);
    expect(screen.getByText("Panel Principal")).toBeInTheDocument();
  });

  it("still shows 'Proformas' link for admin/seller users", () => {
    const user = makeUser({ isAdmin: true, isSeller: true });
    render(<DashboardSidebar user={user} />);
    expect(screen.getByText("Proformas")).toBeInTheDocument();
  });

  it("still shows 'Mis Facturas' link", () => {
    const user = makeUser({ isAdmin: true });
    render(<DashboardSidebar user={user} />);
    expect(screen.getByText("Mis Facturas")).toBeInTheDocument();
  });
});
