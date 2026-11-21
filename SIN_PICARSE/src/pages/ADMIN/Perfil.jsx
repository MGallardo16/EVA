import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Autenticacion";
import { api } from "../../services/api";

export default function Perfil() {
  const { usuario } = useContext(AuthContext);
  const [nombre, setNombre] = useState(usuario?.nombre || "");
  const [correo, setCorreo] = useState(usuario?.correo || "");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });
  const navigate = useNavigate();

  const guardarPerfil = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: "", texto: "" });

    if (!usuario?.id) {
      setMensaje({ tipo: "danger", texto: "No se encontró un perfil activo para actualizar." });
      return;
    }

    try {
      await api.actualizarUsuario(usuario.id, { nombre, correo, password });
      setPassword("");
      setMensaje({ tipo: "success", texto: "Perfil actualizado correctamente." });
    } catch (error) {
      setMensaje({ tipo: "danger", texto: error.message || "Error al actualizar el perfil." });
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
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-start d-block">Correo:</label>
                <input
                  type="email"
                  className="form-control bg-secondary text-white border-0"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-start d-block">Nueva Contraseña (opcional):</label>
                <input
                  type="password"
                  className="form-control bg-secondary text-white border-0"
                  placeholder="Dejar en blanco para mantener la actual"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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