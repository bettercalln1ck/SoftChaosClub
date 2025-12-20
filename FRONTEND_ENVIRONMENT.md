# 🎨 Frontend Environment Configuration

## Overview

The frontend uses **Vite** as the build tool. All environment variables in Vite must be prefixed with `VITE_` to be accessible in your application.

---

## 📋 Environment Variables

### Required Variables

Create a `.env` file in the **root directory** (same level as `package.json`):

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api
```

---

## 📁 File Location

```
/Users/nikhilkumar/Documents/SoftChaosClub/
├── .env                    ← CREATE THIS (frontend env)
├── .env.example           ← Template provided
├── package.json
├── src/
└── server/
    └── .env               ← Different file (backend env)
```

**Important**: There are TWO different `.env` files:
- `/SoftChaosClub/.env` - Frontend variables (VITE_*)
- `/SoftChaosClub/server/.env` - Backend variables

---

## 🔧 Configuration Details

### 1. VITE_API_URL

**Description**: Your backend API base URL

**Development:**
```env
VITE_API_URL=http://localhost:5000/api
```

**Production:**
```env
# Example for Vercel deployment
VITE_API_URL=https://your-backend.vercel.app/api

# Example for Railway deployment  
VITE_API_URL=https://your-app.railway.app/api

# Example for Heroku deployment
VITE_API_URL=https://your-app.herokuapp.com/api

# Example for custom domain
VITE_API_URL=https://api.softchaosclub.com/api
```

---

## 🚀 Setup Instructions

### Step 1: Create .env File

```bash
cd /Users/nikhilkumar/Documents/SoftChaosClub
touch .env
```

### Step 2: Add Configuration

Open `.env` and add:

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Restart Development Server

**Important**: Vite only reads `.env` at startup!

```bash
# Stop current dev server (Ctrl+C)
# Then restart:
npm run dev
```

---

## 🌐 Production Deployment

### Vercel

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.com/api`
   - **Environment**: Production

### Netlify

```bash
# netlify.toml
[build.environment]
  VITE_API_URL = "https://your-backend-url.com/api"
```

Or in Netlify Dashboard:
- Site settings → Build & deploy → Environment
- Add `VITE_API_URL`

### Railway / Render

1. Go to Environment Variables section
2. Add `VITE_API_URL` with your production backend URL

---

## 🔍 How It Works

### In Your Code

The variable is accessed using `import.meta.env`:

```typescript
// ✅ Correct way (Vite)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ❌ Wrong way (this is Node.js syntax, not Vite)
const API_URL = process.env.VITE_API_URL;
```

### Usage Examples

**In api.ts:**
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      // ...
    });
  }
};
```

**In Cart.tsx:**
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const response = await fetch(`${API_URL}/payment/create-order`, {
  // ...
});
```

---

## 🎯 Environment-Specific Configurations

### Development (.env.development)

```env
VITE_API_URL=http://localhost:5000/api
```

### Production (.env.production)

```env
VITE_API_URL=https://api.softchaosclub.com/api
```

Vite automatically loads the correct file based on mode:
- `npm run dev` → `.env.development`
- `npm run build` → `.env.production`

---

## ✅ Checklist

Before running your app:

- [ ] Created `.env` file in root directory
- [ ] Added `VITE_API_URL` variable
- [ ] Value starts with `http://` or `https://`
- [ ] Restarted dev server after creating/editing `.env`
- [ ] Backend server is running on the specified URL
- [ ] `.env` is in `.gitignore` (✅ already done)

---

## 🐛 Troubleshooting

### Issue: "import.meta.env.VITE_API_URL is undefined"

**Solutions:**
1. Make sure variable starts with `VITE_` prefix
2. Restart dev server after creating `.env`
3. Check file is named `.env` (not `.env.txt`)
4. File should be in root directory, not `/src`

### Issue: "Network error / Can't connect to API"

**Solutions:**
1. Verify backend server is running
2. Check `VITE_API_URL` matches backend URL
3. Ensure URL includes `/api` at the end
4. Check CORS is enabled on backend (✅ already done)

### Issue: "Changes to .env not reflecting"

**Solution:**
- Vite caches environment variables at startup
- Always restart dev server: Stop (Ctrl+C) → Start (`npm run dev`)

---

## 🔐 Security Notes

### What's Safe to Include:

✅ API URLs (e.g., `https://api.example.com`)  
✅ Public API keys (if truly public)  
✅ Feature flags  
✅ Non-sensitive configuration

### What NOT to Include:

❌ Secret API keys  
❌ Database credentials  
❌ Private tokens  
❌ Passwords

**Remember**: Frontend `.env` variables are **embedded in the built JavaScript** and are visible to users. Only store public/non-sensitive data!

---

## 📊 Complete Setup Example

### Root .env (Frontend)
```env
# Frontend - Public variables only
VITE_API_URL=http://localhost:5000/api
```

### server/.env (Backend)
```env
# Backend - Can contain secrets
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=supersecret123
RAZORPAY_KEY_ID=rzp_live_RtuzxdUXcmQt01
RAZORPAY_KEY_SECRET=fuT9qZzl6gZ6S21GuLU9vA4Q
```

---

## 🎉 Quick Start

```bash
# 1. Create frontend .env
cd /Users/nikhilkumar/Documents/SoftChaosClub
echo 'VITE_API_URL=http://localhost:5000/api' > .env

# 2. Restart dev server
npm run dev

# 3. Verify it's working
# Open browser console and check API calls go to correct URL
```

---

## 📞 Need Help?

**Vite Environment Variables Docs:**  
https://vitejs.dev/guide/env-and-mode.html

**Your Backend Setup:**  
See `ENVIRONMENT_VARIABLES.md` for backend configuration

---

**Last Updated**: December 20, 2025

