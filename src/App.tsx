import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserAuthProvider } from './context/UserAuthContext';
import { PaintingsProvider } from './context/PaintingsContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Gallery } from './pages/Gallery';
import { PaintingDetail } from './pages/PaintingDetail';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Account } from './pages/Account';
import { AdminLogin } from './pages/AdminLogin';
import { Admin } from './pages/Admin';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { RefundPolicy } from './pages/RefundPolicy';
import { ShippingPolicy } from './pages/ShippingPolicy';
import { Contact } from './pages/Contact';
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
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/refund-policy" element={<RefundPolicy />} />
                        <Route path="/shipping-policy" element={<ShippingPolicy />} />
                        <Route path="/contact" element={<Contact />} />
                      </Routes>
                      <Footer />
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
