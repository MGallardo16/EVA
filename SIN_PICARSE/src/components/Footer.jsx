export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <div className="container text-center">
        <p>&copy; 2026 Sin Picarse - Todos los derechos reservados</p>
        <nav>
          <a href="/blog" className="text-light mx-2">Blog</a>
          <a href="/contacto" className="text-light mx-2">Contacto</a>
          <a href="/registro" className="text-light mx-2">Registro</a>
        </nav>
      </div>
    </footer>
  );
}