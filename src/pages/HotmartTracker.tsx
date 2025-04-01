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

  useEffect(() => {
    const fetch = async () => {
      const { data } = await api.get('/hotmart/products');
      setProducts(data);
    };
    fetch();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">🔥 Produtos com Maior Potencial</h2>
      <ul className="space-y-4">
        {products.map((p, i) => (
          <li key={i} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <strong>{p.name}</strong>
              <span className="text-sm text-gray-500">Score: {p.score}</span>
            </div>
            <p className="text-sm">💰 Preço: R$ {p.price}</p>
            <p className="text-sm">📈 Comissão: {p.commission}%</p>
            <p className="text-sm">🔥 Temperatura: {p.temperature}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotmartTracker;
