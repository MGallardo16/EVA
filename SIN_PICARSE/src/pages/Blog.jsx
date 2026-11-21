import { useState } from "react";

const ARTICULOS_BLOG = [
  {
    id: 1,
    titulo: "Los 5 mejores juegos de mesa para iniciar en el hobby",
    fecha: "2026-10-15",
    imagen: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800",
    resumen: "Descubre títulos fáciles de aprender, dinámicos y perfectos para reunir a familiares y amigos en la mesa.",
    contenido: `
      <p>Entrar al mundo de los juegos de mesa modernos puede parecer abrumador con tantas opciones disponibles, pero existen títulos diseñados especialmente para explicar sus reglas en menos de 10 minutos.</p>
      <p><strong>1. Catan:</strong> El clásico moderno de negociación y gestión de recursos que nunca falla en las tardes de juego.</p>
      <p><strong>2. Dixit:</strong> Ideal para despertar la creatividad e imaginación con ilustraciones sorprendentes.</p>
      <p><strong>3. Ticket to Ride:</strong> Conecta ciudades en el mapa recolectando cartas de trenes en partidas llenas de tensión amistosa.</p>
    `,
  },
  {
    id: 2,
    titulo: "¿Cómo cuidar y proteger tus cartas y componentes?",
    fecha: "2026-11-02",
    imagen: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=800",
    resumen: "Guía práctica sobre fundas protectoras, organizadores y almacenamiento para mantener tus juegos como nuevos.",
    contenido: `
      <p>Si disfrutas de juegos con mucho barajeo como <em>Exploding Kittens</em> o juegos de construcción de mazos, proteger tus cartas alarga su vida útil por años.</p>
      <p>Recomendamos utilizar <strong>fundas (sleeves)</strong> del tamaño exacto de cada carta, evitar bebidas directamente sobre el tablero y guardar las cajas en posición horizontal en lugares secos.</p>
    `,
  },
];

export default function Blog() {
  const [posts] = useState(ARTICULOS_BLOG);
  const [postSeleccionado, setPostSeleccionado] = useState(null);

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