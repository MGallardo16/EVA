import { productos } from "../data/productos";
import { useContext } from "react";
import { AuthContext } from "../context/Autenticacion";

export default function Home() {
  const { usuario } = useContext(AuthContext);
  const destacados = productos.slice(0, 4);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Productos Destacados</h2>
      <div className="row">
        {destacados.map(p => (
          <div key={p.id} className="col-md-3 mb-4">
            <div className="card bg-dark text-light h-100">
              <img
                src={p.imagen}
                alt={p.nombre}
                className="card-img-top"
                style={{ height: "290px", objectFit: "cover", width: "100%" }}
              />
              <div className="card-body">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text">${p.precio}</p>
                <a href={`/producto/${p.id}`} className="btn btn-danger">
                  Ver producto
                </a>
                <br />
                <button
                  className="btn btn-danger mt-2"
                  disabled={!usuario} 
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}