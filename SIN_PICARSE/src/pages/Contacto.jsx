import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState(""); // Cambiado a correo
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      // Se inserta usando 'correo' para que coincida con la columna de Supabase
      const { error } = await supabase.from("mensajes_contacto").insert([
        {
          nombre,
          correo, // <--- Columna 'correo' de tu tabla
          asunto,
          mensaje,
          fecha: new Date().toISOString()
        }
      ]);

      if (error) {
        console.error("Error al enviar mensaje:", error);
        alert("Ocurrió un error al enviar el mensaje. Inténtalo nuevamente.");
      } else {
        setEnviado(true);
        setNombre("");
        setCorreo("");
        setAsunto("");
        setMensaje("");
      }
    } catch (err) {
      console.error("Error inesperado:", err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container my-5 text-white">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-dark">Contacto</h2>
        <p className="text-muted">
          ¿Tienes dudas o comentarios? Completa el formulario y te responderemos a la brevedad.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-dark text-white p-4 border-secondary shadow">
            {enviado && (
              <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
                ¡Gracias por escribirnos! Tu mensaje ha sido enviado exitosamente.
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEnviado(false)}
                ></button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label text-secondary small">Nombre *</label>
                  <input
                    type="text"
                    className="form-control bg-secondary text-white border-0"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label text-secondary small">Correo Electrónico *</label>
                  <input
                    type="email"
                    className="form-control bg-secondary text-white border-0"
                    placeholder="tu@email.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary small">Asunto *</label>
                <input
                  type="text"
                  className="form-control bg-secondary text-white border-0"
                  placeholder="Ej: Duda sobre un pedido o producto"
                  value={asunto}
                  onChange={(e) => setAsunto(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary small">Mensaje *</label>
                <textarea
                  className="form-control bg-secondary text-white border-0"
                  rows="5"
                  placeholder="Escribe tu mensaje aquí..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-danger w-100 fw-bold"
                disabled={cargando}
              >
                {cargando ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}