import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer 
      className="bg-dark text-light p-0 mt-auto d-flex align-items-center w-100" 
      style={{ height: "100px", minHeight: "100px", maxHeight: "100px" }}
    >
      <div className="container text-center">
        <p className="mb-2" style={{ fontSize: "0.9rem" }}>
          &copy; 2026 Sin Picarse - Todos los derechos reservados
        </p>
        <nav className="d-flex justify-content-center align-items-center gap-3">
          <Link to="/blog" className="text-light text-decoration-none small">
            Blog
          </Link>
          <Link to="/contacto" className="text-light text-decoration-none small">
            Contacto
          </Link>
        </nav>
      </div>
    </footer>
  );
}