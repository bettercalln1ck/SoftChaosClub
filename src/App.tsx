import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserAuthProvider } from './context/UserAuthContext';
import { PaintingsProvider } from './context/PaintingsContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Gallery } from './pages/Gallery';
import { PaintingDetail } from './pages/PaintingDetail';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Account } from './pages/Account';
import { AdminLogin } from './pages/AdminLogin';
import { Admin } from './pages/Admin';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <UserAuthProvider>
        <PaintingsProvider>
          <CartProvider>
            <Router>
              <div className="app">
                <Routes>
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={
                    <>
                      <Navbar />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/painting/:id" element={<PaintingDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/account" element={<Account />} />
                      </Routes>
                    </>
                  } />
                </Routes>
              </div>
            </Router>
          </CartProvider>
        </PaintingsProvider>
      </UserAuthProvider>
    </AuthProvider>
  );
};

export default App;
