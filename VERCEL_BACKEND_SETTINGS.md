# ⚙️ Vercel Backend Project Settings

## ✅ Correct Settings for Backend Deployment

### Project Settings → General

**Framework Preset:** `Other`  
**Root Directory:** `.` (root) or leave empty  
**Build Command:** `cd server && npm install`  
**Output Directory:** EMPTY (not set, delete if there's a value)  
**Install Command:** `npm install` (optional)

### Project Settings → Environment Variables

```
NODE_ENV=production
MONGO_URI=mongodb+srv://...@...mongodb.net/heimeimage?...
JWT_SECRET=your_random_secret_key_32_chars_min
CLIPDROP_API_KEY=your_clipdrop_api_key
CLIENT_URL=https://your-frontend-url.vercel.app
```

---

## 🔧 How to Fix Output Directory Error

### Step 1: Go to Project Settings

1. **Go to:** Vercel Dashboard → Your Backend Project
2. **Click:** Settings → General
3. **Find:** "Output Directory" field

### Step 2: Remove Output Directory

1. **Delete** any value in "Output Directory" field
2. **Leave it EMPTY**
3. **Save** changes

### Step 3: Update Root Directory (if needed)

1. **Root Directory:** Set to `.` (root) or leave empty
2. **Build Command:** Update to `cd server && npm install`
3. **Save** changes

### Step 4: Redeploy

1. **Go to:** Deployments tab
2. **Click:** "Redeploy" or push to GitHub
3. **Wait:** 2-3 minutes
4. **Check:** Deployment should succeed

---

## 📝 Important Notes

### Output Directory:

- **For Backend (Serverless):** EMPTY (not set)
- **For Frontend (Static):** `dist` (set to dist)

### Root Directory:

- **For Backend:** `.` (root) - so vercel.json is found
- **For Frontend:** `client` - so it builds from client directory

### Build Command:

- **For Backend (Root = root):** `cd server && npm install`
- **For Backend (Root = server):** `npm install`
- **For Frontend:** `npm run build`

---

## ✅ Verification

After fixing settings:

1. **Deployment should succeed**
2. **No "Output Directory" error**
3. **Backend accessible:** `https://your-backend.vercel.app/api/health`
4. **Returns:** `{"status":"ok","timestamp":"..."}`

---

That's it! Remove Output Directory and redeploy! 🚀

