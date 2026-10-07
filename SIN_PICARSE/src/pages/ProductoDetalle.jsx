import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CarritoContext";
import { supabase } from "../supabaseClient";

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const { agregarAlCarrito } = useContext(CartContext);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const { data, error } = await supabase
          .from("productos")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error al buscar producto:", error);
        } else {
          setProducto(data);
        }
      } catch (err) {
        console.error("Error de conexión:", err);
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
          <p className="fs-4 text-danger fw-bold">${producto.precio}</p>
          <p className="text-muted">{producto.descripcion}</p>
          <button
            className="btn btn-danger btn-lg mt-3"
            onClick={() => agregarAlCarrito(producto)}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}