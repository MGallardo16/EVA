import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Perfil() {
  const [perfil, setPerfil] = useState({ nombre_admin: "", correo: "", contraseña: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      const { data, error } = await supabase.from("administradores").select("*").limit(1).maybeSingle();
      if (!error && data) setPerfil(data);
    };
    fetchPerfil();
  }, []);

  const guardarPerfil = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("administradores")
      .update({
        nombre_admin: perfil.nombre_admin,
        correo: perfil.correo,
        contraseña: perfil.contraseña
      })
      .eq("id", perfil.id);
    if (!error) alert("Perfil actualizado correctamente");
  };

  return (
    <div className="position-relative">
      <button
        onClick={() => navigate("/dashboard")}
        className="btn btn-danger rounded-circle position-absolute"
        style={{ top: "20px", right: "20px", width: "40px", height: "40px" }}
        title="Volver al Dashboard"
      >
        ⮌
      </button>

      <div className="col-md-6 p-3 bg-secondary rounded">
        <h2>Perfil del Administrador</h2>
        <form onSubmit={guardarPerfil}>
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control mb-2"
            value={perfil.nombre_admin}
            onChange={(e) => setPerfil({ ...perfil, nombre_admin: e.target.value })}
          />

          <label className="form-label">Correo:</label>
          <input
            type="email"
            className="form-control mb-2"
            value={perfil.correo}
            onChange={(e) => setPerfil({ ...perfil, correo: e.target.value })}
          />

          <label className="form-label">Contraseña:</label>
          <input
            type="password"
            className="form-control mb-2"
            value={perfil.contraseña}
            onChange={(e) => setPerfil({ ...perfil, contraseña: e.target.value })}
          />

          <button type="submit" className="btn btn-primary w-100">Guardar cambios</button>
        </form>
      </div>
    </div>
  );
}
