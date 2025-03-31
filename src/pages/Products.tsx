import { useEffect, useState } from 'react';
import api from '../services/api';

interface Product {
  id: number;
  name: string;
  price: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Produtos</h2>
      <ul className="space-y-2">
        {products.map((p) => (
          <li key={p.id} className="bg-white p-4 rounded shadow-sm flex justify-between">
            <span>{p.name}</span>
            <span>R$ {p.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
