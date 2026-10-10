import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Dashboard from "./DashboardAdmin";
import { AuthContext } from "../context/Autenticacion";

const mockAuthContextValue = {
  usuario: { nombre_usuario: "Admin Test", rol: "admin" },
  logout: vi.fn(),
};

describe("Dashboard Component", () => {
  const renderDashboard = () =>
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContextValue}>
          <Dashboard />
        </AuthContext.Provider>
      </MemoryRouter>
    );

  it("Debe renderizar las secciones principales", () => {
    renderDashboard();

    const sections = [
      "Gestión de usuarios",
      "Gestión de administradores",
      "Órdenes / Boletas",
      "Reportes",
      "Perfil",
    ];

    sections.forEach((section) => {
      expect(screen.getByText(section)).toBeInTheDocument();
    });
  });

  it("Debe reflejar el estado al cambiar de sección", () => {
    renderDashboard();
    const usuariosLink = screen.getByRole("link", { name: /gestión de usuarios/i });
    fireEvent.click(usuariosLink);
    expect(usuariosLink).toBeInTheDocument();
  });

  it("Debe tener botones de menú para navegar", () => {
    renderDashboard();
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach((btn) => {
      const type = btn.getAttribute("type") || "submit";
      expect(["button", "submit"]).toContain(type);
    });
  });
});