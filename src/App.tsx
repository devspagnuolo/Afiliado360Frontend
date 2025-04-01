import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import NewProduct from './pages/NewProduct';
import HotmartTracker from './pages/HotmartTracker';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
      <Route path="/products/new" element={<ProtectedRoute><NewProduct /></ProtectedRoute>} />
      <Route path="/rastreador" element={<ProtectedRoute><HotmartTracker /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
