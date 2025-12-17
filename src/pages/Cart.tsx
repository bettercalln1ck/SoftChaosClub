import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUserAuth } from '../context/UserAuthContext';
import './Cart.css';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { isLoggedIn, user } = useUserAuth();

  if (cart.length === 0) {
    return (
      <div className="cart">
        <div className="container">
          <h1 className="cart-title">Shopping Cart</h1>
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Discover amazing artworks in our gallery</p>
            <Link to="/gallery" className="browse-btn">
              Browse Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <h1 className="cart-title">Shopping Cart</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item._id} className="cart-item">
                <Link to={`/painting/${item._id}`} className="item-image">
                  <img src={item.image} alt={item.title} />
                </Link>

                <div className="item-details">
                  <Link to={`/painting/${item._id}`} className="item-title">
                    {item.title}
                  </Link>
                  <p className="item-artist">{item.artist}</p>
                  <p className="item-specs">
                    {item.dimensions} • {item.medium}
                  </p>
                </div>

                <div className="item-actions">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="quantity-btn"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="quantity-btn"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className="item-price">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>

                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="remove-btn"
                    aria-label="Remove item"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
              <span>₹{getTotalPrice().toLocaleString('en-IN')}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className="free">Free</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Total</span>
              <span>₹{getTotalPrice().toLocaleString('en-IN')}</span>
            </div>

            {isLoggedIn ? (
              <button className="checkout-btn">
                Proceed to Checkout
              </button>
            ) : (
              <Link to="/login" state={{ from: { pathname: '/cart' } }} className="checkout-btn login-checkout">
                Login to Checkout
              </Link>
            )}

            {isLoggedIn && (
              <div className="user-info-cart">
                <p>✓ Logged in as <strong>{user?.name}</strong></p>
              </div>
            )}

            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>

            <div className="cart-features">
              <div className="feature">
                <span>✓</span> Secure Payment
              </div>
              <div className="feature">
                <span>✓</span> Free Shipping
              </div>
              <div className="feature">
                <span>✓</span> 30-Day Returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

