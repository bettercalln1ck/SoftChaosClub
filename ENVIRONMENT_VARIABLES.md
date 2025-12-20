# 🔐 Environment Variables Guide

## Required Environment Variables

Create or update your `/server/.env` file with these variables:

```env
# Server Configuration
PORT=5000

# Database Configuration
MONGODB_URI=your_mongodb_connection_string_here

# Authentication
JWT_SECRET=your_secure_jwt_secret_here

# Razorpay Payment Gateway (LIVE CREDENTIALS)
RAZORPAY_KEY_ID=rzp_live_RtuzxdUXcmQt01
RAZORPAY_KEY_SECRET=fuT9qZzl6gZ6S21GuLU9vA4Q
```

---

## 📖 Variable Details

### 1. PORT
- **Description**: Port number for the backend server
- **Default**: 5000
- **Example**: `PORT=5000`
- **Required**: No (has fallback)

### 2. MONGODB_URI ⚠️ **REQUIRED**
- **Description**: MongoDB connection string
- **Required**: Yes
- **Where to get it**: MongoDB Atlas Dashboard

#### How to Get MongoDB URI:

**Option A: MongoDB Atlas (Cloud)**
1. Go to https://cloud.mongodb.com/
2. Login to your account
3. Click "Connect" on your cluster
4. Choose "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password

**Example:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/softchaosclub?retryWrites=true&w=majority
```

**Option B: Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/artgallery
```

### 3. JWT_SECRET ⚠️ **REQUIRED**
- **Description**: Secret key for signing JWT tokens (user authentication)
- **Required**: Yes
- **Security**: Must be a strong, random string

#### How to Generate:

**Option 1: Use Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Option 2: Online Generator**
- Visit: https://randomkeygen.com/
- Use a "Fort Knox Password" or "CodeIgniter Encryption Key"

**Option 3: Manual (Not Recommended)**
```env
JWT_SECRET=myApp2024SecureKeyChangeThisToSomethingRandom!@#$
```

**Example:**
```env
JWT_SECRET=a7f8d9e6c5b4a3f8d9e6c5b4a3f8d9e6c5b4a3f8d9e6c5b4a3f8d9e6c5b4a3f8
```

### 4. RAZORPAY_KEY_ID ✅ **ALREADY SET**
- **Description**: Razorpay public key (Live)
- **Current Value**: `rzp_live_RtuzxdUXcmQt01`
- **Required**: Yes (for payments)
- **Status**: ✅ Already configured

### 5. RAZORPAY_KEY_SECRET ✅ **ALREADY SET**
- **Description**: Razorpay secret key (Live)
- **Current Value**: `fuT9qZzl6gZ6S21GuLU9vA4Q`
- **Required**: Yes (for payments)
- **Status**: ✅ Already configured
- **Security**: Keep this secret!

---

## 🚀 Complete .env File Template

Copy this and fill in your values:

```env
# ==============================================
# SERVER CONFIGURATION
# ==============================================
PORT=5000

# ==============================================
# DATABASE CONFIGURATION
# ==============================================
# MongoDB Atlas Connection String
# Format: mongodb+srv://username:password@cluster.xxxxx.mongodb.net/database
MONGODB_URI=your_mongodb_uri_here

# ==============================================
# AUTHENTICATION
# ==============================================
# Generate a secure random string (64+ characters recommended)
JWT_SECRET=your_secure_jwt_secret_here

# ==============================================
# RAZORPAY PAYMENT GATEWAY (LIVE)
# ==============================================
RAZORPAY_KEY_ID=rzp_live_RtuzxdUXcmQt01
RAZORPAY_KEY_SECRET=fuT9qZzl6gZ6S21GuLU9vA4Q

# ==============================================
# OPTIONAL: RAZORPAY TEST MODE
# ==============================================
# Uncomment these and use for testing
# RAZORPAY_KEY_ID_TEST=rzp_test_your_test_key
# RAZORPAY_KEY_SECRET_TEST=your_test_secret
```

---

## 🎯 Quick Setup Steps

### Step 1: Get MongoDB URI
```bash
# If you don't have MongoDB Atlas setup:
# 1. Go to https://cloud.mongodb.com/
# 2. Create free account
# 3. Create cluster (M0 Free tier)
# 4. Get connection string
```

### Step 2: Generate JWT Secret
```bash
# Run this in terminal:
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
# Copy the output
```

### Step 3: Update .env File
```bash
cd /Users/nikhilkumar/Documents/SoftChaosClub/server
nano .env  # or use any text editor
```

### Step 4: Verify Setup
```bash
# Start the server
npm run server:dev

# You should see:
# 🚀 Server running on port 5000
# ✅ MongoDB Connected: cluster0...
```

---

## 🌐 For Production Deployment

When deploying to hosting platforms, add these same variables:

### Vercel
```bash
# Dashboard → Settings → Environment Variables
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=rzp_live_RtuzxdUXcmQt01
RAZORPAY_KEY_SECRET=fuT9qZzl6gZ6S21GuLU9vA4Q
```

### Heroku
```bash
heroku config:set PORT=5000
heroku config:set MONGODB_URI="mongodb+srv://..."
heroku config:set JWT_SECRET="your_jwt_secret"
heroku config:set RAZORPAY_KEY_ID=rzp_live_RtuzxdUXcmQt01
heroku config:set RAZORPAY_KEY_SECRET=fuT9qZzl6gZ6S21GuLU9vA4Q
```

### Railway / Render
- Go to your project dashboard
- Navigate to "Environment" or "Environment Variables"
- Add each variable with its value

---

## ⚠️ Security Best Practices

1. **Never commit .env to Git**
   - ✅ Already in `.gitignore`
   
2. **Use different secrets for different environments**
   - Production: Strong, unique secrets
   - Development: Can be simpler, but still secure
   
3. **Rotate secrets periodically**
   - Change JWT_SECRET every few months
   - Keep Razorpay keys secure
   
4. **Limit access**
   - Only share with team members who need it
   - Use password managers to share securely

---

## 🔍 Troubleshooting

### Error: "MongoDB connection failed"
- Check MONGODB_URI is correct
- Verify database password doesn't have special characters
- Whitelist your IP in MongoDB Atlas

### Error: "jwt malformed"
- JWT_SECRET is missing or incorrect
- Check .env file has no spaces around =
- Restart server after changing .env

### Error: "Razorpay key_id is mandatory"
- RAZORPAY_KEY_ID is missing
- Check spelling in .env file
- Restart server

---

## ✅ Validation Checklist

Before starting your server, verify:

- [ ] `.env` file exists in `/server` directory
- [ ] `MONGODB_URI` is set (most important!)
- [ ] `JWT_SECRET` is set and strong
- [ ] `RAZORPAY_KEY_ID` is set
- [ ] `RAZORPAY_KEY_SECRET` is set
- [ ] No syntax errors (no spaces around `=`)
- [ ] File is saved

---

## 📞 Need Help?

**MongoDB Setup Issues:**
- See: `MONGODB_ATLAS_SETUP.md` in your project
- MongoDB Docs: https://docs.atlas.mongodb.com/

**Razorpay Issues:**
- See: `RAZORPAY_SETUP.md` in your project
- Razorpay Dashboard: https://dashboard.razorpay.com/

---

**Last Updated**: December 20, 2025

