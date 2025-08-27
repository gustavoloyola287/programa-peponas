import { useState, useEffect } from "react";
import ProductoForm from "../components/ProductoForm";
import ProductoList from "../components/ProductoList";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  imagen_url: string;
}

const ProductosPage = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  const fetchProductos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/productos");
      if (res.ok) {
        const data = await res.json();
        setProductos(data);
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleProductoDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/api/productos/${id}`, {
        method: "DELETE",
      });
      fetchProductos();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>ABM de Productos con Imágenes</h1>
      <ProductoForm onSave={fetchProductos} />
      <hr style={{ margin: "40px auto", width: "80%" }} />
      <ProductoList productos={productos} onDelete={handleProductoDelete} />
    </div>
  );
};

export default ProductosPage;
