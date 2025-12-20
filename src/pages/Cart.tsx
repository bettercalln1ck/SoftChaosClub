import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUserAuth } from '../context/UserAuthContext';
import './Cart.css';

// Extend Window interface for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { isLoggedIn, user } = useUserAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!isLoggedIn || !user) {
      alert('Please login to proceed with checkout');
      return;
    }

    setIsProcessing(true);

    try {
      const token = localStorage.getItem('token');
      const totalAmount = getTotalPrice();

      // Create order on backend
      const response = await fetch('http://localhost:5000/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: totalAmount,
          currency: 'INR',
          receipt: `order_${Date.now()}`,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to create order');
      }

      // Initialize Razorpay payment
      const options = {
        key: data.key_id,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'Soft Chaos Club',
        description: 'Art Purchase',
        order_id: data.order.id,
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone || '',
        },
        theme: {
          color: '#2c3e50',
        },
        handler: async function (response: any) {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch('http://localhost:5000/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderDetails: {
                  items: cart,
                  totalAmount,
                  userId: user._id || user.id,
                  userEmail: user.email,
                  userName: user.name,
                },
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              alert('Payment successful! Your order has been placed.');
              clearCart();
              // You can redirect to order confirmation page here
              // window.location.href = '/orders';
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            console.log('Payment cancelled by user');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment. Please try again.');
      setIsProcessing(false);
    }
  };

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
              <button 
                className="checkout-btn" 
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
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

