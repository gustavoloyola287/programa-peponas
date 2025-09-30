import React, { useState } from 'react';
import ProductCard from '../components/productcard';

const ProductosPage: React.FC = () => {
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('');

  const products = [
    { id: 1, name: 'Cortante Plástico Abeja', price: 1900.00, image: 'cortante-plastico-abeja.webp', description: 'Cortante de plástico en forma de abeja, ideal para decorar tortas.', category: 'Cortantes' },
    { id: 2, name: 'Molde Rosca Papel', price: 3.49, image: 'molde-rosca-papel.webp', description: 'Molde de papel resistente para preparar roscas perfectas.', category: 'Moldes' },
    { id: 3, name: 'Set de 18 Picos', price: 9680.00, image: 'set-18-picos.webp', description: 'Set de 18 picos + 3 acoples para decoración profesional.', category: 'Accesorios para decoración' },
    { id: 4, name: 'Colorante Líquido Rojo', price: 4.99, image: 'colorante-liquido-rojo.webp', description: 'Colorante alimentario líquido de alta concentración.', category: 'Colorantes' },
    { id: 5, name: 'Base Giratoria Plástica', price: 15.99, image: 'base-giratoria-plastica.webp', description: 'Base giratoria para facilitar la decoración de pasteles.', category: 'Bases y soportes' },
    { id: 6, name: 'Manga Pastelera Reutilizable', price: 7.49, image: 'manga-pastelera-reutilizable.webp', description: 'Manga pastelera de silicona reutilizable y fácil de limpiar.', category: 'Herramientas' },
    { id: 7, name: 'Sprinkles de Colores', price: 2.99, image: 'sprinkles-colores.webp', description: 'Sprinkles variados para decorar postres y pasteles.', category: 'Accesorios para decoración' },
    { id: 8, name: 'Bolsa de Celofán Transparente', price: 1.99, image: 'bolsa-celofan-transparente.webp', description: 'Bolsas de celofán ideales para empaquetar productos de repostería.', category: 'Papelería, bolsas y envases' },
  ];

  const handleAddToCart = (productId: number, quantity: number) => {
    setCart([...cart, { id: productId, quantity }]);
    alert(`${quantity} unidad(es) del producto ${productId} añadida(s) al carrito!`);
  };

  const filteredProducts = filterCategory
    ? products.filter(product => product.category.toLowerCase() === filterCategory.toLowerCase())
    : products;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="categoryFilter">Filtrar por categoría: </label>
        <select id="categoryFilter" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">Todas</option>
          <option value="Accesorios para decoración">Accesorios para decoración</option>
          <option value="Bases y soportes">Bases y soportes</option>
          <option value="Colorantes">Colorantes</option>
          <option value="Cortantes">Cortantes</option>  
          <option value="Materias primas">Materias primas</option>
          <option value="Moldes y utensillos">Moldes y utensillos</option>
          <option value="Papelería, bolsas y envases">Pepelería, bolsas y envases</option>
          <option value="Cursos">Cursos</option>
          {/* Agrega más categorías según necesites */}
        </select>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductosPage;