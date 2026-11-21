import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Autenticacion";
import { CartContext } from "../context/CarritoContext";
import { api } from "../services/api";

export default function Home() {
  const { usuario } = useContext(AuthContext);
  const { agregarAlCarrito } = useContext(CartContext);
  const [destacados, setDestacados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const data = await api.getProductos();
        if (data) {
          setDestacados(data.slice(0, 4));
        }
      } catch (err) {
        console.error("Error de conexión:", err);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Productos Destacados</h2>

      {cargando ? (
        <div className="text-center my-5">
          <p className="text-muted">Cargando productos...</p>
        </div>
      ) : destacados.length === 0 ? (
        <p className="text-center text-muted">No hay productos destacados por ahora.</p>
      ) : (
        <div className="row">
          {destacados.map((p) => (
            <div key={p.id} className="col-md-3 mb-4">
              <div className="card bg-dark text-light h-100 shadow-sm border-secondary">
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="card-img-top"
                  style={{ height: "260px", objectFit: "cover", width: "100%" }}
                />

                <div className="card-body p-3 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title fs-6 fw-bold mb-2">{p.nombre}</h5>
                    <p className="card-text fw-bold text-danger fs-5 mb-3">${Number(p.precio).toLocaleString("es-CL")}</p>
                  </div>

                  <div className="d-grid gap-2">
                    <Link to={`/producto/${p.id}`} className="btn btn-outline-light btn-sm">
                      Ver producto
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      disabled={!usuario}
                      onClick={() => agregarAlCarrito && agregarAlCarrito(p)}
                      title={!usuario ? "Inicia sesión para añadir al carrito" : "Añadir al carrito"}
                    >
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}