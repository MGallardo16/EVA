import { useEffect, useState } from "react";
import ProductCard from "../components/CartaProducto";
import { api } from "../services/api";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const data = await api.getProductos();
        setProductos(data || []);
      } catch (err) {
        console.error("Error al obtener productos:", err);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  if (cargando) {
    return (
      <div className="container my-5 text-center">
        <p className="text-muted">Cargando catálogo...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Nuestros Productos</h2>
      {productos.length === 0 ? (
        <p className="text-center text-muted">No hay productos registrados aún.</p>
      ) : (
        <div className="row">
          {productos.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      )}
    </div>
  );
}