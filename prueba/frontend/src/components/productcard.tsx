import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const ProductCard: React.FC<{ product: Product; onAddToCart: (id: number, quantity: number) => void }> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', width: '200px', textAlign: 'center' }}>
      <img src={`/Fotos/${product.image}`} alt={product.name} style={{ maxWidth: '100%' }} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Categoría: {product.category}</p>
      <p>${product.price.toFixed(2)}</p>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
        style={{ width: '60px', margin: '5px 0' }}
      />
      <button onClick={() => onAddToCart(product.id, quantity)}>Añadir al carrito</button>
    </div>
  );
};

export default ProductCard;