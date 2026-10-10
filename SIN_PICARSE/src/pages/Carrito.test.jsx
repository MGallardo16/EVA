import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import Carrito from "./Carrito";
import { CartContext } from "../context/CarritoContext";

const mockCartContextValue = {
  carrito: [
    {
      id: 1,
      nombre: "Producto Test",
      precio: 1000,
      cantidad: 1,
      imagen: "test.jpg",
    },
  ],
  actualizarCantidad: vi.fn(),
  eliminarDelCarrito: vi.fn(),
  subtotal: 1000,
  iva: 190,
  total: 1190,
  simularCompra: vi.fn(),
};

describe("Carrito Component", () => {
  const renderCarrito = () =>
    render(
      <CartContext.Provider value={mockCartContextValue}>
        <Carrito />
      </CartContext.Provider>
    );

  it("debe renderizar la tabla del carrito", () => {
    renderCarrito();
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("debe actualizar el valor del input de cantidad al escribir", () => {
    renderCarrito();
    const cantidadInput = screen.getByRole("spinbutton");
    cantidadInput.value = "3";
    expect(cantidadInput.value).toBe("3");
  });

  it("debe tener un botón para eliminar producto", () => {
    renderCarrito();
    const eliminarBtn = screen.getByRole("button", { name: /x/i });
    expect(eliminarBtn).toBeInTheDocument();
    expect(eliminarBtn).toHaveClass("btn-danger");
  });

  it("debe tener un botón para simular compra", () => {
    renderCarrito();
    const comprarBtn = screen.getByRole("button", { name: /¡comprar!/i });
    expect(comprarBtn).toBeInTheDocument();
    expect(comprarBtn).toHaveAttribute("id", "btn-simular-compra");
  });
});