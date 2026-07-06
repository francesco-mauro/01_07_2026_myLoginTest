import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <Routes>
      {/* Rotta di default: reindirizza automaticamente al login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Rotte delle nostre tre pagine */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;