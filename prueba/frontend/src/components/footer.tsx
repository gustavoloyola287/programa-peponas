import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import './footer.css';

const Footer = () => {
  return (
 
    <>
      <footer>
        <ul>
          <li>
            <a href="https://www.facebook.com/peponascakes" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={28} />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/peponascakes" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={28} />
            </a>
          </li>
        </ul>
        <ul>
          <li>
          <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/productos">Productos</Link>
          </li>
          <li>
           <Link to="/quienes-somos">Quiénes Somos</Link>
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
        </ul>
        <p>@2025 | Todos los derechos reservados</p>
      </footer>
    </>
  );
};
  
    
     

export default Footer;
