import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Login from "./Login";
import { AuthContext } from "../context/Autenticacion";

const mockAuthContextValue = {
  login: vi.fn(),
  registro: vi.fn(),
};

describe("Login Component", () => {
  const renderLogin = () =>
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContextValue}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    );

  it("Debe renderizar los campos de correo y contraseña", () => {
    renderLogin();
    const correoInput = screen.getByPlaceholderText(/ejemplo@duocuc.cl/i);
    const passInput = screen.getByPlaceholderText(/••••••••/i);
    expect(correoInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
  });

  it("Debe actualizar el valor del campo contraseña al escribir", () => {
    renderLogin();
    const passInput = screen.getByPlaceholderText(/••••••••/i);
    passInput.value = "12345";
    expect(passInput.value).toBe("12345");
  });

  it("Debe tener un botón de envío para iniciar sesión", () => {
    renderLogin();
    const button = screen.getByRole("button", { name: /entrar/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });
});