import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import Contacto from "./Contacto";
import { supabase } from "../supabaseClient";

vi.mock("../supabaseClient", () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => Promise.resolve({ error: null })),
    })),
  },
}));

describe("Contacto Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Debe renderizar los campos del formulario de contacto", () => {
    render(<Contacto />);

    expect(screen.getByRole("heading", { name: /contacto/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tu nombre/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/tu@email.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ej: Duda sobre un pedido o producto/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Escribe tu mensaje aquí.../i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar mensaje/i })).toBeInTheDocument();
  });

  it("Debe actualizar el valor de los inputs al simular la escritura con fireEvent", () => {
    render(<Contacto />);

    const nombreInput = screen.getByPlaceholderText(/Tu nombre/i);
    const correoInput = screen.getByPlaceholderText(/tu@email.com/i);
    const asuntoInput = screen.getByPlaceholderText(/Ej: Duda sobre un pedido o producto/i);
    const mensajeInput = screen.getByPlaceholderText(/Escribe tu mensaje aquí.../i);

    fireEvent.change(nombreInput, { target: { value: "Juan Pérez" } });
    fireEvent.change(correoInput, { target: { value: "juan@example.com" } });
    fireEvent.change(asuntoInput, { target: { value: "Consulta de stock" } });
    fireEvent.change(mensajeInput, { target: { value: "Hola, ¿tienen disponibilidad de Catan?" } });

    expect(nombreInput.value).toBe("Juan Pérez");
    expect(correoInput.value).toBe("juan@example.com");
    expect(asuntoInput.value).toBe("Consulta de stock");
    expect(mensajeInput.value).toBe("Hola, ¿tienen disponibilidad de Catan?");
  });

  it("Debe procesar el formulario y enviar los datos a Supabase al hacer clic en Enviar Mensaje", async () => {
    render(<Contacto />);

    const nombreInput = screen.getByPlaceholderText(/Tu nombre/i);
    const correoInput = screen.getByPlaceholderText(/tu@email.com/i);
    const asuntoInput = screen.getByPlaceholderText(/Ej: Duda sobre un pedido o producto/i);
    const mensajeInput = screen.getByPlaceholderText(/Escribe tu mensaje aquí.../i);

    fireEvent.change(nombreInput, { target: { value: "Juan Pérez" } });
    fireEvent.change(correoInput, { target: { value: "juan@example.com" } });
    fireEvent.change(asuntoInput, { target: { value: "Consulta de stock" } });
    fireEvent.change(mensajeInput, { target: { value: "Hola, ¿tienen disponibilidad de Catan?" } });

    const enviarBtn = screen.getByRole("button", { name: /enviar mensaje/i });
    fireEvent.click(enviarBtn);

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith("mensajes_contacto");
      expect(
        screen.getByText(/¡Gracias por escribirnos! Tu mensaje ha sido enviado exitosamente./i)
      ).toBeInTheDocument();
    });
  });
});