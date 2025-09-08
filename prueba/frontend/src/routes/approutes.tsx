import { Routes, Route } from "react-router-dom";

import InicioPage from "../pages/InicioPage.tsx";
import ProductosPage from "../pages/ProductosPage.tsx";
import ContactoPage from "../pages/ContactoPage.tsx";
import QuienessomosPage from "../pages/QuienessomosPage.tsx";

const AppRoutes = () => {
    return (    
            <Routes>
                <Route path="/" element={<InicioPage />} />
                <Route path="/productos" element={<ProductosPage />} />
                <Route path="/contacto" element={<ContactoPage />} />
                <Route path="/quienes-somos" element={<QuienessomosPage />} />
            </Routes>
        
    );
}
export default AppRoutes;
