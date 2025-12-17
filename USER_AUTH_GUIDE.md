# User Login & Logout Guide

## 🔐 User Authentication System

Your art gallery website now has a complete user authentication system that allows customers to create accounts, login, and manage their profiles!

## Features

### ✅ User Account System
- **Sign Up** - Create new accounts with email and password
- **Login** - Secure login for returning customers
- **Profile Management** - Edit name and view account details
- **Logout** - Sign out securely
- **Session Persistence** - Stay logged in across browser sessions
- **Protected Checkout** - Require login to complete purchases

## How to Use

### 1. Sign Up (Create Account)

**Steps:**
1. Click **"Login"** button in the navigation bar
2. Click **"Sign Up"** to switch to signup form
3. Fill in:
   - **Full Name** (your name)
   - **Email** (your email address)
   - **Password** (minimum 6 characters)
4. Click **"Sign Up"**
5. You'll be automatically logged in and redirected

**First Test Account Created:**
- Email: `john@example.com`
- Password: `password123`
- Name: John Smith

### 2. Login

**Steps:**
1. Click **"Login"** button in navigation
2. Enter your email and password
3. Click **"Login"**
4. You'll be redirected to your previous page

### 3. View Your Account

When logged in:
- Your name and avatar appear in the navigation (e.g., "J John")
- Click on your name to view your account page

**Account Page Shows:**
- Profile information (name, email, member since)
- Avatar with your initial
- Quick actions (Browse Gallery, View Cart)
- Logout button

### 4. Edit Profile

**Steps:**
1. Go to **Account** page (click your name in nav)
2. Click **"Edit"** button
3. Update your name
4. Click **"Save Changes"** or **"Cancel"**

### 5. Logout

**Steps:**
1. Click your name/avatar in navigation
2. Click **"Logout"** button
3. You'll be logged out and redirected

## Visual Features

### Logged Out
- Navigation shows **"Login"** button (purple/gradient)

### Logged In
- Navigation shows:
  - **Avatar circle** with your initial (purple gradient)
  - **Your first name** next to avatar
  - Clickable to access account page

## Shopping Integration

### Cart Functionality
- **Before Login:** Cart works normally, but checkout button says "Login to Checkout"
- **After Login:** 
  - Cart shows "✓ Logged in as [Your Name]"
  - Can proceed to checkout

### Benefits of Having an Account
1. ✓ Save your information
2. ✓ Track orders (future feature)
3. ✓ Faster checkout
4. ✓ Order history (future feature)
5. ✓ Saved addresses (future feature)

## Access URLs

- **Login Page:** http://192.168.1.7:5173/login
- **Account Page:** http://192.168.1.7:5173/account (requires login)
- **Homepage:** http://192.168.1.7:5173/

## Data Storage

### LocalStorage
All user data is stored in browser localStorage:
- **User accounts:** `users` key
- **Current session:** `currentUser` key
- **Data persists** across browser sessions
- **Private per browser** - not shared across devices

### Security Notes

⚠️ **Important for Production:**

1. **Passwords are NOT hashed** - This is a demo
   - In production, use proper password hashing (bcrypt, etc.)
   
2. **No backend** - Everything stored in browser
   - For production, implement a real backend API

3. **Email validation** - Currently basic
   - Add proper email verification in production

4. **Session management** - Uses localStorage
   - Consider using JWT tokens or sessions in production

## Testing

### Test the Full Flow:

1. **Sign Up**
   ```
   Name: Test User
   Email: test@example.com
   Password: test123456
   ```

2. **Add Items to Cart**
   - Browse gallery
   - Add paintings to cart

3. **View Account**
   - Check profile page
   - Edit your name

4. **Logout and Login**
   - Logout
   - Login with same credentials
   - Cart should still have items

5. **Try Checkout**
   - Go to cart
   - See "Logged in as Test User"
   - Click "Proceed to Checkout"

## Troubleshooting

### Can't Login?
- Check email and password are correct
- Password is case-sensitive
- Make sure you signed up first

### Lost Your Account?
- Data is stored in browser localStorage
- Clearing browser data will delete accounts
- To reset: Open browser console and run:
  ```javascript
  localStorage.removeItem('users');
  localStorage.removeItem('currentUser');
  ```

### Avatar Not Showing?
- Refresh the page
- Make sure you're logged in
- Check that your name has at least one character

## Feature Comparison

### User Authentication vs Admin Panel

| Feature | User Auth | Admin Panel |
|---------|-----------|-------------|
| Purpose | Customer accounts | Manage paintings |
| Login URL | `/login` | `/admin/login` |
| Password | User-set | `admin123` (fixed) |
| Features | Profile, Cart, Checkout | Add/Delete paintings |
| Visibility | Everyone | Admin only |

## Future Enhancements

Potential features to add:

1. **Order History**
   - View past purchases
   - Track shipping status

2. **Wishlist**
   - Save favorite paintings
   - Get notifications

3. **Address Book**
   - Save shipping addresses
   - Multiple addresses

4. **Email Verification**
   - Verify email on signup
   - Password reset via email

5. **Social Login**
   - Login with Google, Facebook, etc.

6. **Two-Factor Authentication**
   - Extra security layer

---

**Enjoy your new user authentication system!** 🔐✨

For questions or issues, check the browser console for error messages.


