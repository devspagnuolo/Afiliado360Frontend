import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    try {
      const token = localStorage.getItem('token');

      await api.post(
        '/products',
        { name, price: parseFloat(price), description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate('/products');
    } catch (err: any) {
      console.error('Erro ao cadastrar produto:', err);
      setErro('Erro ao cadastrar produto');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Novo Produto</h2>
        {erro && <p className="text-red-600 text-sm">{erro}</p>}

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
