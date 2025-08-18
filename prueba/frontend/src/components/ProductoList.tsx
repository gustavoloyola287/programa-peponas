// frontend/src/components/ProductoList.tsx
import React from 'react';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  imagen_url: string;
}

interface ProductoListProps {
  productos: Producto[];
  onDelete: (id: number) => void;
}

const ProductoList: React.FC<ProductoListProps> = ({ productos, onDelete }) => {
  return (
    <div style={{ maxWidth: '800px', margin: '20px auto' }}>
      <h2>Lista de Productos</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {productos.map(producto => (
          <div key={producto.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <img 
              src={`http://localhost:3000${producto.imagen_url}`} 
              alt={producto.nombre} 
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} 
            />
            <h3>{producto.nombre}</h3>
            {/* 🔹 Corrección: Verifica que precio sea un número antes de usar toFixed */}
            <p><strong>Precio:</strong> ${typeof producto.precio === 'number' ? producto.precio.toFixed(2) : producto.precio}</p>
            <p><strong>Stock:</strong> {producto.stock}</p>
            <button onClick={() => onDelete(producto.id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductoList;