import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default function Reportes() {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    fetchReportes();
  }, []);

  const fetchReportes = async () => {
    const { data, error } = await supabase
      .from("reportes")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error al obtener reportes:", error);
    } else if (data) {
      setReportes(data);
    }
  };

  return (
    <div className="p-4 w-100 text-white">
      <h3 className="mb-4">Reportes del Sistema</h3>

      <div className="border border-secondary rounded shadow-sm" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table className="table table-dark table-striped table-hover align-middle mb-0 text-start">
          <thead className="table-dark border-bottom border-secondary" style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr>
              <th style={{ width: "10%" }}>ID</th>
              <th style={{ width: "25%" }}>Título</th>
              <th style={{ width: "45%" }}>Descripción</th>
              <th style={{ width: "20%" }}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {reportes.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-white py-3">No hay reportes registrados.</td>
              </tr>
            ) : (
              reportes.map((r) => (
                <tr key={r.id}>
                  <td className="fw-bold ps-3">{r.id}</td>
                  <td className="fw-semibold">{r.titulo}</td>
                  <td className="text-muted">{r.descripcion}</td>
                  <td>{r.fecha ? new Date(r.fecha).toLocaleDateString("es-CL") : "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}