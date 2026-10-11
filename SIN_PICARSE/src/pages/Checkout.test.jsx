import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Checkout from "./Checkout";
import { CartContext } from "../context/CarritoContext";
import { AuthContext } from "../context/Autenticacion";
import { supabase } from "../supabaseClient";

//Intercepta la inserción de la orden en la base de datos
vi.mock("../supabaseClient", () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() =>
            Promise.resolve({
              data: { id: 101 },
              error: null,
            })
          ),
        })),
      })),
    })),
  },
}));

const mockCartContextValue = {
  carrito: [
    { id: 1, nombre: "Producto Test", precio: 5000, cantidad: 2 },
  ],
  total: 10000,
  vaciarCarrito: vi.fn(),
};

const mockAuthContextValue = {
  usuario: { nombre_usuario: "Cliente Test" },
};

describe("Checkout Component", () => {
  const renderCheckout = (cartValue = mockCartContextValue) =>
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContextValue}>
          <CartContext.Provider value={cartValue}>
            <Checkout />
          </CartContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    );

  it("Debe renderizar los campos del formulario de envío", () => {
    renderCheckout();

    expect(screen.getByPlaceholderText(/Av. Vicuña Mackenna 4860/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Región Metropolitana/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Macul/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/12345678/i)).toBeInTheDocument();
  });

  it("Debe actualizar el valor de los inputs al simular la escritura con fireEvent", () => {
    renderCheckout();

    const calleInput = screen.getByPlaceholderText(/Av. Vicuña Mackenna 4860/i);
    const regionInput = screen.getByPlaceholderText(/Región Metropolitana/i);
    const comunaInput = screen.getByPlaceholderText(/Macul/i);
    const telefonoInput = screen.getByPlaceholderText(/12345678/i);

    fireEvent.change(calleInput, { target: { value: "Av. Siempre Viva 742" } });
    fireEvent.change(regionInput, { target: { value: "Valparaíso" } });
    fireEvent.change(comunaInput, { target: { value: "Viña del Mar" } });
    fireEvent.change(telefonoInput, { target: { value: "98765432" } });

    expect(calleInput.value).toBe("Av. Siempre Viva 742");
    expect(regionInput.value).toBe("Valparaíso");
    expect(comunaInput.value).toBe("Viña del Mar");
    expect(telefonoInput.value).toBe("98765432");
  });

  it("Debe procesar el formulario de envío al hacer clic en Pagar", async () => {
    renderCheckout();

    const calleInput = screen.getByPlaceholderText(/Av. Vicuña Mackenna 4860/i);
    const regionInput = screen.getByPlaceholderText(/Región Metropolitana/i);
    const comunaInput = screen.getByPlaceholderText(/Macul/i);
    const telefonoInput = screen.getByPlaceholderText(/12345678/i);

    fireEvent.change(calleInput, { target: { value: "Calle Prueba 123" } });
    fireEvent.change(regionInput, { target: { value: "Región Metropolitana" } });
    fireEvent.change(comunaInput, { target: { value: "Santiago" } });
    fireEvent.change(telefonoInput, { target: { value: "91234567" } });

    const pagarBtn = screen.getByRole("button", { name: /pagar/i });
    fireEvent.click(pagarBtn);

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith("ordenes");
      expect(screen.getByText(/¡Pago Exitoso!/i)).toBeInTheDocument();
    });
  });

  it("Debe mostrar mensaje de carrito vacío si no hay ítems", () => {
    const emptyCartValue = { ...mockCartContextValue, carrito: [], total: 0 };
    renderCheckout(emptyCartValue);

    expect(
      screen.getByText(/No tienes productos en tu carrito para procesar el checkout/i)
    ).toBeInTheDocument();
  });
});