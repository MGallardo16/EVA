import { useState, useEffect } from "react";

export default function Perfil() {
  const [perfil, setPerfil] = useState({ nombre: "", correo: "", contraseña: "" });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("perfilAdmin")) || {
      nombre: "SuperAdmin",
      correo: "admin@correo.com",
      contraseña: "admin123"
    };
    setPerfil(data);
    localStorage.setItem("perfilAdmin", JSON.stringify(data));
  }, []);

  const guardarPerfil = (e) => {
    e.preventDefault();
    localStorage.setItem("perfilAdmin", JSON.stringify(perfil));
    alert("Perfil actualizado correctamente");
  };

  return (
    <div className="col-md-6 p-3 bg-secondary rounded">
      <h2>Perfil del Administrador</h2>
      <form onSubmit={guardarPerfil}>
        <label className="form-label">Nombre:</label>
        <input type="text" className="form-control mb-2"
          value={perfil.nombre}
          onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })} />

        <label className="form-label">Correo:</label>
        <input type="email" className="form-control mb-2"
          value={perfil.correo}
          onChange={(e) => setPerfil({ ...perfil, correo: e.target.value })} />

        <label className="form-label">Contraseña:</label>
        <input type="password" className="form-control mb-2"
          value={perfil.contraseña}
          onChange={(e) => setPerfil({ ...perfil, contraseña: e.target.value })} />

        <button type="submit" className="btn btn-primary w-100">Guardar cambios</button>
      </form>
    </div>
  );
}
