# Razorpay Payment Integration Setup

## Environment Variables

Create a `.env` file in the `/server` directory with the following credentials:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here

# Razorpay Credentials (Add your own)
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
```

## Important Notes

⚠️ **Security Warning**: 
- Never commit the `.env` file to version control
- Make sure `.env` is in your `.gitignore` file
- These are LIVE credentials - handle with care

## Features Implemented

### Backend
- ✅ Razorpay order creation endpoint: `POST /api/payment/create-order`
- ✅ Payment verification endpoint: `POST /api/payment/verify`
- ✅ Payment status check endpoint: `GET /api/payment/status/:paymentId`
- ✅ Secure signature verification using HMAC SHA256

### Frontend
- ✅ Razorpay checkout integration in Cart component
- ✅ User authentication check before payment
- ✅ Order creation and payment verification flow
- ✅ Auto cart clearing after successful payment
- ✅ Loading states and error handling

## Payment Flow

1. User clicks "Proceed to Checkout" button
2. Frontend creates an order via backend API
3. Razorpay checkout modal opens with order details
4. User completes payment through Razorpay
5. Backend verifies the payment signature
6. On success, cart is cleared and user is notified
7. Order details are logged (can be saved to database)

## Testing

### Test Cards (Use only in test mode)
- Card Number: `4111 1111 1111 1111`
- Expiry: Any future date
- CVV: Any 3 digits

### Live Mode
You are currently using LIVE credentials. All transactions will be real.

## API Endpoints

### 1. Create Order
```
POST /api/payment/create-order
Headers: Authorization: Bearer <token>
Body: {
  "amount": 50000,  // Amount in INR (500.00)
  "currency": "INR",
  "receipt": "receipt_123"
}
```

### 2. Verify Payment
```
POST /api/payment/verify
Headers: Authorization: Bearer <token>
Body: {
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx",
  "orderDetails": { ... }
}
```

### 3. Get Payment Status
```
GET /api/payment/status/:paymentId
Headers: Authorization: Bearer <token>
```

## Next Steps

1. **Create the `.env` file** in `/server` directory with the credentials above
2. **Restart your backend server** to load the environment variables
3. **Test the payment flow** with a small amount
4. **Implement order management** (optional):
   - Create Order model in MongoDB
   - Save order details after successful payment
   - Add order history page for users
   - Send email confirmations

## Troubleshooting

### Issue: "Razorpay is not defined"
- Make sure the Razorpay script is loaded in `index.html`
- Check browser console for script loading errors

### Issue: "Payment verification failed"
- Verify that `RAZORPAY_KEY_SECRET` is correct in `.env`
- Check that the backend server has been restarted after adding env variables

### Issue: "Failed to create order"
- Ensure user is logged in
- Check that Authorization header is being sent
- Verify backend API is running on port 5000

## Support

For Razorpay-specific issues, refer to:
- Documentation: https://razorpay.com/docs/
- Dashboard: https://dashboard.razorpay.com/

