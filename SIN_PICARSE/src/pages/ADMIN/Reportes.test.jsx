import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Reportes from "./Reportes";

describe("Reportes Component", () => {
  it("Debe renderizar la tabla de reportes", () => {
    render(<Reportes />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("Debe reflejar datos en la tabla al cargar", () => {
    render(<Reportes />);
    const filas = screen.getAllByRole("row");
    expect(filas.length).toBeGreaterThan(0);
  });

  it("Debe renderizar el título de la sección", () => {
    render(<Reportes />);
    const titulo = screen.getByRole("heading", { name: /reportes del sistema/i });
    expect(titulo).toBeInTheDocument();
  });
});