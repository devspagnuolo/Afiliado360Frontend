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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Produtos</h2>
        <button
          onClick={() => navigate('/products/new')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Novo Produto
        </button>
      </div>

      <ul className="space-y-2">
        {products.map((p) => (
          <li
            key={p.id}
            className="bg-white p-4 rounded shadow-sm flex flex-col gap-2"
          >
            <div className="flex justify-between">
              <span className="font-medium">{p.name}</span>
              <span className="text-green-600">R$ {p.price.toFixed(2)}</span>
            </div>
            {p.description && <p className="text-gray-600">{p.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
