import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Navbar.css";


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <h2 className="logo">Peponas Cakes</h2>

      {/* Botón hamburguesa (solo visible en móviles/tablet) */}
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        <span className={isOpen ? "bar open" : "bar"}></span>
        <span className={isOpen ? "bar open" : "bar"}></span>
        <span className={isOpen ? "bar open" : "bar"}></span>
      </div>

      {/* Links de navegación */}
      <ul className={isOpen ? "nav-links active" : "nav-links"}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link></li>
        <li><Link to="/productos" onClick={() => setIsOpen(false)}>Productos</Link></li>
        <li><Link to="/quienes-somos" onClick={() => setIsOpen(false)}>Quiénes Somos</Link></li>
        <li><Link to="/contacto" onClick={() => setIsOpen(false)}>Contacto</Link></li>
        <li><Link to="/IniciarSesion"onClick={() => setIsOpen (false)}>Iniciar Sesion</Link></li>
        <li><Link to="/RegistroUsuarios"onClick={() => setIsOpen (false)}>Registrarse</Link></li>
      
      </ul>
    </nav>

  );
};

export default Navbar;
