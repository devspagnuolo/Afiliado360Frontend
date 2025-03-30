import { Route, Routes, Navigate } from 'react-router-dom';
import Products from './pages/Products';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
}

export default App;
