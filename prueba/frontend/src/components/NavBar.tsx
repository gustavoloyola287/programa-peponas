import { Link } from "react-router-dom";
import React from "react";
import './Navbar.css'; // Importa el archivo CSS

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h2>Peponas Cakes</h2>
      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;