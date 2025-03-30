import { Route, Routes, Navigate } from 'react-router-dom';
import Products from './pages/Products';
import Login from './pages/Login';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/products"
        element={isAuthenticated ? <Products /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
