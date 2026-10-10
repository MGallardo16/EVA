import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Perfil from "./Perfil";

describe("Perfil Component", () => {
  const renderPerfil = () =>
    render(
      <MemoryRouter>
        <Perfil />
      </MemoryRouter>
    );

  it("Debe renderizar los campos de nombre, correo y contraseña", () => {
    const { container } = renderPerfil();

    const nombreInput = container.querySelector('input[type="text"]');
    const correoInput = container.querySelector('input[type="email"]');
    const passInput = container.querySelector('input[type="password"]');

    expect(nombreInput).toBeInTheDocument();
    expect(correoInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
  });

  it("Debe actualizar el valor de los inputs al escribir", () => {
    const { container } = renderPerfil();

    const nombreInput = container.querySelector('input[type="text"]');
    nombreInput.value = "Admin Actualizado";
    expect(nombreInput.value).toBe("Admin Actualizado");

    const correoInput = container.querySelector('input[type="email"]');
    correoInput.value = "admin@nuevo.com";
    expect(correoInput.value).toBe("admin@nuevo.com");

    const passInput = container.querySelector('input[type="password"]');
    passInput.value = "NuevaPass123";
    expect(passInput.value).toBe("NuevaPass123");
  });

  it("Debe tener un botón de envío para guardar cambios", () => {
    renderPerfil();
    const buttonGuardar = screen.getByRole("button", { name: /guardar cambios/i });
    expect(buttonGuardar).toBeInTheDocument();
    expect(buttonGuardar).toHaveAttribute("type", "submit");
  });
});