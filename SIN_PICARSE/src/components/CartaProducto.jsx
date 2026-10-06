import { useContext } from "react";
import { CartContext } from "../context/CarritoContext";

export default function ProductCard({ producto }) {
  const { agregarAlCarrito } = useContext(CartContext);

  return (
    <div className="col-md-4 mb-4">
      <div className="card bg-dark text-light h-100">
        <img src={producto.imagen} className="card-img-top" alt={producto.nombre}
             style={{ height: "320px", objectFit: "cover", width: "100%" }} />
        <div className="card-body">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text">${producto.precio}</p>
          <a href={`/producto/${producto.id}`} className="btn btn-danger">
            Ver producto
          </a>
          <button className="btn btn-danger ms-2"
                  onClick={() => agregarAlCarrito(producto)}>
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}