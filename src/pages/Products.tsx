import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await api.get('/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Produtos</h2>
        <button onClick={() => navigate('/products/new')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Novo Produto
        </button>
      </div>
      <ul className="space-y-4">
        {products.map((p) => (
          <li key={p.id} className="bg-white p-4 rounded shadow-sm">
            <div className="flex justify-between">
              <strong>{p.name}</strong>
              <span>R$ {p.price.toFixed(2)}</span>
            </div>
            {p.description && <p className="text-sm text-gray-600">{p.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
