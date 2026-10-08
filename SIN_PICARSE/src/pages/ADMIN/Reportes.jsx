import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function Reportes() {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    const fetchReportes = async () => {
      const { data, error } = await supabase.from("reportes").select("*");
      if (!error) setReportes(data);
    };
    fetchReportes();
  }, []);

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      <h2>Reportes</h2>
      <table className="table table-dark table-striped">
        <thead>
          <tr><th>ID</th><th>Título</th><th>Descripción</th><th>Fecha</th></tr>
        </thead>
        <tbody>
          {reportes.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.titulo}</td>
              <td>{r.descripcion}</td>
              <td>{r.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
