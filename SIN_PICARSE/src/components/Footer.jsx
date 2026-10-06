export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <div className="container-fluid text-center">
        <p>&copy; 2026 Sin Picarse - Todos los derechos reservados</p>
        <nav>
          <a href="/blog" className="text-light mx-2">Blog</a>
          <a href="/contacto" className="text-light mx-2">Contacto</a>
        </nav>
      </div>
    </footer>
  );
}