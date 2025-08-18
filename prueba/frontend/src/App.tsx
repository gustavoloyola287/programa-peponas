import { Routes, Route } from 'react-router-dom';

// Importa los componentes de tu aplicación
import Navbar from './components/NavBar.tsx';
import InicioPage from './pages/InicioPage.tsx';
import ProductosPage from './pages/ProductosPage.tsx';
import ContactoPage from './pages/ContactoPage.tsx';

import './App.css'; // Asegúrate de que este archivo exista para tus estilos generales

function App() {
  return (
    <>
      {/* El Navbar se renderiza en todas las páginas */}
      <Navbar />
      
      {/* El contenedor de las rutas que cambian según la URL */}
      <div className="container">
        <Routes>
          {/* Ruta para la página de inicio */}
          <Route path="/" element={<InicioPage />} />

          {/* Ruta para la página de productos (ABM) */}
          <Route path="/productos" element={<ProductosPage />} />

          {/* Ruta para la página de contacto */}
          <Route path="/contacto" element={<ContactoPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;