# Admin Panel Guide

## 🎨 Admin Panel for Art Gallery

Your painting e-commerce website now includes a full-featured admin panel to manage your paintings!

## Features

### ✅ Complete Admin System

- **Secure Login** - Password-protected admin access
- **Add New Paintings** - Complete form with all painting details
- **Delete Paintings** - Remove paintings with confirmation
- **Real-time Updates** - Changes instantly reflect on the website
- **Data Persistence** - Uses localStorage to save all changes
- **Statistics Dashboard** - View total paintings and collection value

## Access the Admin Panel

### 1. Login

Visit: **http://localhost:5173/admin/login**

**Demo Password:** `admin123`

### 2. Admin Dashboard

After login, you'll see:

- **Total Paintings Count**
- **Total Collection Value**
- **List of all paintings** with thumbnails
- **Add/Delete buttons**

## How to Add a Painting

1. Click **"+ Add New Painting"** button
2. Fill in all required fields:
   - **Title** - Name of the artwork
   - **Artist** - Artist's name
   - **Price** - Price in USD (numbers only)
   - **Category** - Choose from: Abstract, Landscape, Portrait, Modern, Classical
   - **Image URL** - Direct URL to the image (e.g., from Unsplash)
   - **Description** - Detailed description of the artwork
   - **Dimensions** - Size (e.g., 36" x 48")
   - **Medium** - Type of paint/material (e.g., Oil on Canvas)
   - **Year** - Year created
3. Click **"Add Painting"**
4. The painting will appear immediately on the site!

## How to Delete a Painting

1. Find the painting in the admin list
2. Click the **🗑️ Delete** button
3. Confirm the deletion
4. The painting is removed from the website instantly!

## Navigation

- **View Site** - Return to the main website
- **Logout** - Sign out of admin panel
- **Admin Link** - Visible in the navbar when logged in

## Security Notes

⚠️ **For Production:**

- Change the admin password in `src/context/AuthContext.tsx`
- The current password is: `admin123`
- Consider implementing proper backend authentication
- Use environment variables for sensitive data

## Technical Details

### Data Storage

- Paintings are stored in **localStorage**
- Changes persist across browser sessions
- Initial data loads from `src/data/paintings.ts`
- After any modification, localStorage takes precedence

### Context Providers

- **AuthContext** - Manages login state
- **PaintingsContext** - Manages paintings CRUD operations
- **CartContext** - Manages shopping cart

### Routes

- `/admin/login` - Login page
- `/admin` - Admin dashboard (protected route)
- Main site routes remain unchanged

## Tips

1. **Image URLs**: Use high-quality images from Unsplash for best results

   - Example: `https://images.unsplash.com/photo-xxxxx?w=800&h=1000&fit=crop`

2. **Pricing**: Enter prices as numbers without dollar signs or commas

   - Good: `2500`
   - Bad: `$2,500`

3. **Backup**: To reset to original paintings, clear localStorage:
   ```javascript
   localStorage.removeItem("paintings");
   ```
   Then refresh the page.

## Customization

### Change Admin Password

Edit `src/context/AuthContext.tsx`:

```typescript
const ADMIN_PASSWORD = "your-new-password";
```

### Add More Categories

Edit `src/types.ts` and update the category type:

```typescript
category: "abstract" |
  "landscape" |
  "portrait" |
  "modern" |
  "classical" |
  "your-new-category";
```

## Support

For issues or questions:

- Check browser console for errors
- Ensure localStorage is enabled
- Verify all form fields are filled correctly
- Check that image URLs are accessible

---

**Enjoy managing your art gallery!** 🎨✨
