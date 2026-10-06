import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// Contextos globales
import { CartProvider } from "./context/CarritoContext";
import { AuthProvider } from "./context/Autenticacion";

// Componentes comunes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages (vistas principales públicas)
import Home from "./pages/Inicio";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./pages/Carrito";
import Blog from "./pages/Blog";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";

// Dashboard y páginas internas
import Dashboard from "./pages/DashboardAdmin";
import Usuarios from "./pages/ADMIN/Usuarios.jsx"; 
import Administradores from "./pages/ADMIN/Administradores.jsx";
import Categorias from "./pages/ADMIN/Categorias.jsx";
import Ordenes from "./pages/ADMIN/Ordenes.jsx";
import Reportes from "./pages/ADMIN/Reportes.jsx";
import Perfil from "./pages/ADMIN/Perfil.jsx";
import ProductosAdmin from "./pages/ADMIN/Productos.jsx"; // versión admin de productos

// Ruta privada
function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/producto/:id" element={<ProductoDetalle />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/login" element={<Login />} />

                {/* Rutas privadas: Dashboard */}
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                >
                  <Route path="usuarios" element={<Usuarios />} />
                  <Route path="administradores" element={<Administradores />} />
                  <Route path="productos" element={<ProductosAdmin />} />
                  <Route path="categorias" element={<Categorias />} />
                  <Route path="ordenes" element={<Ordenes />} />
                  <Route path="reportes" element={<Reportes />} />
                  <Route path="perfil" element={<Perfil />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
