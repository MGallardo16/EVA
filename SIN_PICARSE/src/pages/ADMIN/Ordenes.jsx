import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default function Ordenes() {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    fetchOrdenes();
  }, []);

  const fetchOrdenes = async () => {
    const { data, error } = await supabase.from("ordenes").select("*");
    if (error) {
      console.error("Error al obtener órdenes:", error);
    } else if (data) {
      setOrdenes(data);
    }
  };

  return (
    <div className="p-4 w-100 text-white">
      <h3 className="mb-4">Órdenes / Boletas</h3>

      <div className="border border-secondary rounded shadow-sm" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table className="table table-dark table-striped table-hover align-middle mb-0 text-start">
          <thead className="table-dark border-bottom border-secondary" style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr>
              <th style={{ width: "10%" }}>ID</th>
              <th style={{ width: "25%" }}>Usuario</th>
              <th style={{ width: "35%" }}>Detalle</th>
              <th style={{ width: "15%" }}>Total</th>
              <th style={{ width: "15%" }}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-white py-3">No hay órdenes registradas.</td>
              </tr>
            ) : (
              ordenes.map(o => (
                <tr key={o.id}>
                  <td className="fw-bold ps-3">{o.id}</td>
                  <td>{o.usuario}</td>
                  <td className="text-muted small">{o.detalle || "Sin detalles"}</td>
                  <td className="text-success fw-bold">${Number(o.total).toLocaleString("es-CL")}</td>
                  <td>{o.fecha ? new Date(o.fecha).toLocaleDateString("es-CL") : "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}