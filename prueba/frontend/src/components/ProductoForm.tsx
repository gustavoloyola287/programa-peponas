// frontend/src/components/ProductoForm.tsx
import React, { useState } from 'react';

interface ProductoFormProps {
  onSave: () => void;
}

const ProductoForm: React.FC<ProductoFormProps> = ({ onSave }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('stock', stock);
    if (imagen) {
      formData.append('imagen', imagen);
    }

    try {
      await fetch("http://localhost:3000/api/productos", {
        method: "POST",
        body: formData,
      });
      setNombre('');
      setPrecio('');
      setStock('');
      setImagen(null);
      onSave(); // Llama a la función para recargar la lista
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '20px auto' }}>
      <h2>Agregar Producto</h2>
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />
      <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Precio" required />
      <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" required />
      <input type="file" onChange={(e) => e.target.files && setImagen(e.target.files[0])} />
      <button type="submit">Guardar Producto</button>
    </form>
  );
};

export default ProductoForm;