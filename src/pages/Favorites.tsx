import { useEffect, useState } from 'react';
import api from '../services/api';

interface Favorite {
  id: number;
  name: string;
  temperature: number;
  commission: number;
  price: number;
  score: number;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await api.get('/favorites', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorites(data);
      } catch (err) {
        console.error('Erro ao carregar favoritos:', err);
      }
    };
    fetch();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">⭐ Meus Favoritos</h2>
      <ul className="space-y-4">
        {favorites.map((f) => (
          <li key={f.id} className="bg-white p-4 rounded shadow">
            <strong>{f.name}</strong>
            <p className="text-sm">💰 Preço: R$ {f.price}</p>
            <p className="text-sm">📈 Comissão: {f.commission}%</p>
            <p className="text-sm">🔥 Temperatura: {f.temperature}</p>
            <p className="text-sm text-gray-600">Score: {f.score}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
