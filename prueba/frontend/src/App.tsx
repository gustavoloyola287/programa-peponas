import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar.tsx';
import InicioPage from './pages/InicioPage.tsx';
import ProductosPage from './pages/ProductosPage.tsx';
import ContactoPage from './pages/ContactoPage.tsx';
import QuienessomosPage from './pages/QuienessomosPage.tsx';
import './App'; 


function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<InicioPage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/quienes-somos" element={<QuienessomosPage />} />
        </Routes>
     
    </>
  );
}

export default App;