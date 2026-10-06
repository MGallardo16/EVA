import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(p => p.id === producto.id);
      if (existe) {
        return prev.map(p =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
    alert("El producto ha sido agregado al carrito");
  };

  // Actualizar cantidad de un producto
  const actualizarCantidad = (id, nuevaCantidad) => {
    setCarrito(prev =>
      prev.map(p =>
        p.id === id ? { ...p, cantidad: nuevaCantidad } : p
      )
    );
  };

  // Eliminar producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(p => p.id !== id));
  };

  // Vaciar carrito
  const vaciarCarrito = () => setCarrito([]);

  // Cálculos
  const subtotal = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  // Simular compra
  const simularCompra = () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío. Agrega productos antes de simular la compra.");
      return;
    }
    alert("¡Listo! Tus pedidos estarán en camino muy pronto.");
    vaciarCarrito();
  };

  return (
    <CartContext.Provider value={{
      carrito,
      agregarAlCarrito,
      actualizarCantidad,
      eliminarDelCarrito,
      vaciarCarrito,
      subtotal,
      iva,
      total,
      simularCompra
    }}>
      {children}
    </CartContext.Provider>
  );
}