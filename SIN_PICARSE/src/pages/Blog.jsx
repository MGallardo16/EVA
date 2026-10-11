import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; 

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [postSeleccionado, setPostSeleccionado] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("fecha", { ascending: false });

      if (error) {
        console.error("Error al cargar entradas del blog:", error);
      } else if (data) {
        setPosts(data);
      }
    } catch (err) {
      console.error("Error inesperado:", err);
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <div className="container my-5 text-center text-white py-5">
        <p>Cargando artículos...</p>
      </div>
    );
  }

  if (postSeleccionado) {
    return (
      <div className="container my-5 text-white">
        <button
          className="btn btn-outline-secondary text-dark mb-4"
          onClick={() => setPostSeleccionado(null)}
        >
          ← Volver a la lista de blogs
        </button>

        <article className="border border-secondary rounded p-4 bg-dark shadow">
          {postSeleccionado.imagen && (
            <img
              src={postSeleccionado.imagen}
              alt={postSeleccionado.titulo}
              className="img-fluid rounded mb-4 w-100"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          )}

          <h1 className="mb-2">{postSeleccionado.titulo}</h1>
          <p className="text-muted small mb-4">
            {postSeleccionado.fecha
              ? new Date(postSeleccionado.fecha).toLocaleDateString("es-CL")
              : ""}
          </p>

          <div
            className="lh-lg text-light fs-5"
            dangerouslySetInnerHTML={{ __html: postSeleccionado.contenido }}
          />
        </article>
      </div>
    );
  }

  return (
    <div className="container my-5 text-dark">
      <h2 className="mb-2 text-center">Blog de Sin Picarse</h2>
      <p className="text-center text-muted mb-5">
        Selecciona un artículo para leer la publicación completa.
      </p>

      {posts.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No hay publicaciones disponibles por el momento.</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
          {posts.map((post) => (
            <div key={post.id} className="col">
              <div className="card h-100 bg-dark text-white border-secondary shadow d-flex flex-column">
                {post.imagen && (
                  <img
                    src={post.imagen}
                    className="card-img-top"
                    alt={post.titulo}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h4 className="card-title">{post.titulo}</h4>
                  <p className="card-text text-white small">
                    {post.fecha ? new Date(post.fecha).toLocaleDateString("es-CL") : ""}
                  </p>
                  
                  <p className="card-text flex-grow-1 text-light">
                    {post.resumen || "Haz clic en el botón para leer el artículo completo."}
                  </p>

                  <button
                    className="btn btn-danger mt-3 w-100 fw-bold"
                    onClick={() => setPostSeleccionado(post)}
                  >
                    Leer artículo completo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}