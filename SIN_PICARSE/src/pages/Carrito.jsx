import { useContext } from "react";
import { CartContext } from "../context/CarritoContext";

export default function Carrito() {
  const {
    carrito,
    actualizarCantidad,
    eliminarDelCarrito,
    subtotal,
    iva,
    total,
    simularCompra
  } = useContext(CartContext);

  if (carrito.length === 0) {
    return <p className="text-center mt-5">El carrito está vacío</p>;
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Tu Carrito</h2>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map(p => (
            <tr key={p.id}>
              <td>
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  style={{ height: "50px", objectFit: "cover" }}
                />
              </td>
              <td>{p.nombre}</td>
              <td>${p.precio}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={p.cantidad}
                  onChange={(e) =>
                    actualizarCantidad(p.id, parseInt(e.target.value))
                  }
                />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => eliminarDelCarrito(p.id)}
                >
                  x
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="5">Subtotal: ${subtotal}</td>
          </tr>
          <tr>
            <td colSpan="5">IVA (19%): ${iva.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="5">
              <strong>Total: ${Math.round(total)}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        id="btn-simular-compra"
        className="btn btn-success"
        onClick={simularCompra}
      >
        ¡Comprar!
      </button>
    </div>
  );
}