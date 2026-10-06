import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

export default function AdminProductos() {
  const { productosAdmin } = useContext(AdminContext);

  return (
    <div className="container-fluid">
      <h3 className="mb-4 text-dark">Gestión de Productos</h3>
      <div className="border border-secondary rounded" style={{ maxHeight: "700px", overflowY: "auto" }}>
        <table className="table table-dark table-striped table-hover align-middle mb-0 text-start">
          <thead className="table-dark border-bottom border-secondary" style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr>
              <th>#</th><th>Nombre</th><th className="text-end">Precio</th>
            </tr>
          </thead>
          <tbody>
            {productosAdmin.length === 0 ? (
              <tr><td colSpan="3" className="text-center">No hay productos disponibles.</td></tr>
            ) : (
              productosAdmin.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nombre}</td>
                  <td className="text-end">${item.precio.toLocaleString("es-CL")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}