import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Plus, BarChart3, Home } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="bg-gray-900 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-14">
        <h1 className="font-semibold text-lg">🧼 BRHome</h1>

        <nav className="hidden md:flex gap-6">
          <Link to="/" className={`hover:text-teal-400 ${location.pathname === "/" ? "text-teal-400" : ""}`}>Inicio</Link>
          <Link to="/add" className={`hover:text-teal-400 ${location.pathname === "/add" ? "text-teal-400" : ""}`}>Agregar</Link>
          <Link to="/stats" className={`hover:text-teal-400 ${location.pathname === "/stats" ? "text-teal-400" : ""}`}>Estadísticas</Link>
        </nav>

        {/* Botón menú móvil */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Menú desplegable móvil */}
      {open && (
        <div className="md:hidden bg-gray-800">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-700" onClick={() => setOpen(false)}>Inicio</Link>
          <Link to="/add" className="block px-4 py-2 hover:bg-gray-700" onClick={() => setOpen(false)}>Agregar</Link>
          <Link to="/stats" className="block px-4 py-2 hover:bg-gray-700" onClick={() => setOpen(false)}>Estadísticas</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
