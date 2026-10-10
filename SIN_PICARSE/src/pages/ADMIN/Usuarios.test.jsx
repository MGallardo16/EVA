import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // para usar toBeInTheDocument
import Usuarios from "./Usuarios";

describe("Usuarios Component", () => {

  it("debe renderizar la tabla de usuarios", () => {
    render(<Usuarios />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("debe actualizar el valor del input al escribir", () => {
    render(<Usuarios />);
    const nombreInput = screen.getByPlaceholderText("Nombre de usuario");
    fireEvent.change(nombreInput, { target: { value: "NuevoUser" } });
    expect(nombreInput.value).toBe("NuevoUser");
  });

  it("debe tener un botón para agregar usuario", () => {
    render(<Usuarios />);
    const buttonAgregar = screen.getByRole("button", { name: /agregar/i });
    expect(buttonAgregar).toBeInTheDocument();
    expect(buttonAgregar).toHaveAttribute("type", "submit");
  });

  it("debe tener un botón para eliminar usuario", () => {
    render(<Usuarios />);
    const buttonEliminar = screen.getByRole("button", { name: /eliminar/i });
    expect(buttonEliminar).toBeInTheDocument();
    expect(buttonEliminar).toHaveAttribute("type", "submit");
  });

});
