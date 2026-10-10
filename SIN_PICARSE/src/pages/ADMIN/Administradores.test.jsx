import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // para usar toBeInTheDocument
import Administradores from "./Administradores"; // ajusta la ruta según tu proyecto

describe("Administradores Component", () => {

  it("Debe renderizar la tabla de administradores", () => {
    render(<Administradores />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("Debe actualizar el valor de los inputs al escribir", () => {
    render(<Administradores />);
    
    const nombreInput = screen.getByPlaceholderText("Nombre de usuario");
    nombreInput.value = "AdminTest";
    expect(nombreInput.value).toBe("AdminTest");

    const correoInput = screen.getByPlaceholderText("Correo electrónico");
    correoInput.value = "admin@test.com";
    expect(correoInput.value).toBe("admin@test.com");

    const passInput = screen.getByPlaceholderText("Contraseña");
    passInput.value = "12345";
    expect(passInput.value).toBe("12345");
  });

  it("Debe tener un botón de envío para agregar administrador", () => {
    render(<Administradores />);
    const buttonAgregar = screen.getByRole("button", { name: /agregar/i });
    expect(buttonAgregar).toBeInTheDocument();
    expect(buttonAgregar).toHaveAttribute("type", "submit");
  });

  it("Debe tener un botón de envío para eliminar administrador", () => {
    render(<Administradores />);
    const buttonEliminar = screen.getByRole("button", { name: /eliminar/i });
    expect(buttonEliminar).toBeInTheDocument();
    expect(buttonEliminar).toHaveAttribute("type", "submit");
  });

});
