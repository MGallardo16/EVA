import { useParams } from "react-router-dom";
import { productos } from "../data/productos";
import { useContext } from "react";
import { CartContext } from "../context/CarritoContext";

export default function ProductoDetalle() {
  const { id } = useParams(); // obtiene el id desde la URL
  const producto = productos.find(p => p.id === parseInt(id));
  const { agregarAlCarrito } = useContext(CartContext);

  if (!producto) {
    return <p className="text-center">Producto no encontrado</p>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h3 className="fw-bold">{producto.nombre}</h3>
          <p className="fs-4 text-danger">${producto.precio}</p>
          <p className="text-muted">{producto.descripcion}</p>
          <button
            className="btn btn-danger btn-lg"
            onClick={() => agregarAlCarrito(producto)}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}