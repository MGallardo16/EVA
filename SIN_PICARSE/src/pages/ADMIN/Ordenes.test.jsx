import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Ordenes from "./Ordenes";

describe("Ordenes Component", () => {
  it("Debe renderizar la tabla de órdenes", () => {
    render(<Ordenes />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("Debe actualizar el estado al cargar datos", () => {
    render(<Ordenes />);
    const filas = screen.getAllByRole("row");
    expect(filas.length).toBeGreaterThan(0);
  });

  it("Debe renderizar el título del componente de órdenes", () => {
    render(<Ordenes />);
    const titulo = screen.getByRole("heading", { name: /órdenes \/ boletas/i });
    expect(titulo).toBeInTheDocument();
  });
});