import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CarritoContext";
import { api } from "../services/api";

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const { agregarAlCarrito } = useContext(CartContext);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const data = await api.getProductoById(id);
        setProducto(data);
      } catch (err) {
        console.error("Error al buscar producto:", err);
      } finally {
        setCargando(false);
      }
    };

    obtenerProducto();
  }, [id]);

  if (cargando) {
    return (
      <div className="container my-5 text-center">
        <p className="text-muted">Cargando detalle del producto...</p>
      </div>
    );
  }

  if (!producto) {
    return <p className="text-center my-5">Producto no encontrado</p>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
          />
        </div>
        <div className="col-md-6">
          <h3 className="fw-bold">{producto.nombre}</h3>
          {producto.categoria && (
            <span className="badge bg-secondary mb-2">{producto.categoria.nombre}</span>
          )}
          <p className="fs-4 text-danger fw-bold">${Number(producto.precio).toLocaleString("es-CL")}</p>
          <p className="text-muted">{producto.descripcion}</p>
          <p className="small text-secondary">Stock disponible: {producto.stock} unidades</p>
          <button
            className="btn btn-danger btn-lg mt-3"
            onClick={() => agregarAlCarrito(producto)}
            disabled={producto.stock <= 0}
          >
            {producto.stock > 0 ? "Añadir al carrito" : "Sin stock"}
          </button>
        </div>
      </div>
    </div>
  );
}