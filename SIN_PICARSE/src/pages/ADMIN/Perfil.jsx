import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export default function Perfil() {
  const [perfil, setPerfil] = useState({ id: null, nombre_admin: "", correo: "", contraseña: "" });
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPerfil();
  }, []);

  const fetchPerfil = async () => {
    const { data, error } = await supabase.from("administradores").select("*").limit(1).maybeSingle();
    if (error) {
      console.error("Error al obtener perfil:", error);
    } else if (data) {
      setPerfil(data);
    }
  };

  const guardarPerfil = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: "", texto: "" });

    if (!perfil.id) {
      setMensaje({ tipo: "danger", texto: "No se encontró un perfil para actualizar." });
      return;
    }

    const { error } = await supabase
      .from("administradores")
      .update({
        nombre_admin: perfil.nombre_admin,
        correo: perfil.correo,
        contraseña: perfil.contraseña
      })
      .eq("id", perfil.id);

    if (error) {
      setMensaje({ tipo: "danger", texto: "Error al actualizar el perfil." });
    } else {
      setMensaje({ tipo: "success", texto: "Perfil actualizado correctamente." });
    }
  };

  return (
    <div className="p-4 w-100 text-white position-relative">
      <button
        onClick={() => navigate("/dashboard")}
        className="btn btn-outline-danger position-absolute"
        style={{ top: "20px", right: "20px" }}
        title="Volver al Dashboard"
      >
        ✕ Volver
      </button>

      <div className="row justify-content-center mt-3">
        <div className="col-md-6">
          <div className="card bg-dark text-white border-secondary shadow-sm p-4">
            <h3 className="mb-4 text-center">Perfil del Administrador</h3>

            {mensaje.texto && (
              <div className={`alert alert-${mensaje.tipo} py-2`} role="alert">
                {mensaje.texto}
              </div>
            )}

            <form onSubmit={guardarPerfil}>
              <div className="mb-3">
                <label className="form-label text-start d-block">Nombre:</label>
                <input
                  type="text"
                  className="form-control bg-secondary text-white border-0"
                  value={perfil.nombre_admin || ""}
                  onChange={(e) => setPerfil({ ...perfil, nombre_admin: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-start d-block">Correo:</label>
                <input
                  type="email"
                  className="form-control bg-secondary text-white border-0"
                  value={perfil.correo || ""}
                  onChange={(e) => setPerfil({ ...perfil, correo: e.target.value })}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-start d-block">Contraseña:</label>
                <input
                  type="password"
                  className="form-control bg-secondary text-white border-0"
                  value={perfil.contraseña || ""}
                  onChange={(e) => setPerfil({ ...perfil, contraseña: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn btn-danger w-100 fw-bold">
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}