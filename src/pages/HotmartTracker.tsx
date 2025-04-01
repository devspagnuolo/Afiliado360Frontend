import { useEffect, useState } from 'react';
import api from '../services/api';

interface Product {
  name: string;
  temperature: number;
  commission: number;
  price: number;
  score: number;
}

const HotmartTracker = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorited, setFavorited] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await api.get('/hotmart/products');
      setProducts(data);
    };
    fetch();
  }, []);

  const favoritar = async (product: Product) => {
    try {
      const token = localStorage.getItem('token');
      await api.post('/favorites', product, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorited([...favorited, product.name]);
    } catch (err) {
      console.error('Erro ao favoritar:', err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">🔥 Produtos com Maior Potencial</h2>
      <ul className="space-y-4">
        {products.map((p, i) => (
          <li key={i} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <strong>{p.name}</strong>
                <p className="text-sm">💰 Preço: R$ {p.price}</p>
                <p className="text-sm">📈 Comissão: {p.commission}%</p>
                <p className="text-sm">🔥 Temperatura: {p.temperature}</p>
                <p className="text-sm text-gray-600">Score: {p.score}</p>
              </div>
              <button
                className={`ml-4 text-xl ${favorited.includes(p.name) ? 'text-yellow-500' : 'text-gray-400'}`}
                onClick={() => favoritar(p)}
                disabled={favorited.includes(p.name)}
              >
                ⭐
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotmartTracker;
