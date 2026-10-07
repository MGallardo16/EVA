import { useContext } from "react";
import { CartContext } from "../context/CarritoContext";
import { Link } from "react-router-dom";

export default function ProductCard({ producto }) {
  const { agregarAlCarrito } = useContext(CartContext);

  return (
    <div className="col-md-4 mb-4">
      <div className="card bg-dark text-light h-100 shadow-sm">
        <img 
          src={producto.imagen} 
          className="card-img-top" 
          alt={producto.nombre}
          style={{ height: "320px", objectFit: "cover", width: "100%" }} 
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title">{producto.nombre}</h5>
            <p className="card-text fw-bold text-danger">${producto.precio}</p>
          </div>
          <div className="mt-3">
            <Link to={`/producto/${producto.id}`} className="btn btn-outline-light me-2">
              Ver producto
            </Link>
            <button 
              className="btn btn-danger"
              onClick={() => agregarAlCarrito(producto)}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}