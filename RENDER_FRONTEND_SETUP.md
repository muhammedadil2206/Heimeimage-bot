# 🌐 Render Frontend Deployment - Detailed Setup

## Publish Directory Configuration

### What is Publish Directory?

The **Publish Directory** is the folder where your built static files are located after running the build command. Render will serve these files as your website.

### For Vite React Apps

When you run `npm run build`, Vite creates a `dist` folder containing:
- `index.html` - Main HTML file
- `assets/` - JavaScript, CSS, and other assets
- Other static files

### Render Configuration

**Root Directory:** `client`  
**Build Command:** `npm install && npm run build`  
**Publish Directory:** `dist`

### Why `dist`?

- Vite defaults to outputting to `dist`
- Since Root Directory is `client`, Render looks for `dist` inside `client`
- The path is relative to the Root Directory
- No leading slash needed
- No full path needed

### Example Structure

```
Heimage bot/
└── client/          (Root Directory)
    ├── src/
    ├── package.json
    ├── vite.config.js
    └── dist/        (Publish Directory - created after build)
        ├── index.html
        └── assets/
```

### Steps to Configure

1. **Root Directory:** `client`
   - This tells Render where your frontend code is located

2. **Build Command:** `npm install && npm run build`
   - This installs dependencies and builds your app
   - Creates the `dist` folder with built files

3. **Publish Directory:** `dist`
   - This tells Render where to find the built files
   - Render will serve files from `client/dist/`

### Common Mistakes

❌ **Wrong:** `client/` or `client/dist`  
✅ **Correct:** `dist`

❌ **Wrong:** `/dist`  
✅ **Correct:** `dist`

❌ **Wrong:** `./dist`  
✅ **Correct:** `dist`

**Important:** Since Root Directory is already set to `client`, do NOT include `client/` in Publish Directory!

### Verification

After deployment, check:
1. Build logs show `dist` folder created
2. Files are served from `dist` directory
3. Website loads correctly
4. No 404 errors for assets

### Troubleshooting

**Issue: "Publish directory not found"**
- Make sure build command runs successfully
- Check if `dist` folder is created in build logs
- Verify Root Directory is set to `client`

**Issue: "Files not found"**
- Check if Publish Directory is set to `dist`
- Verify build command creates `dist` folder
- Check build logs for errors

**Issue: "Blank page"**
- Check if `index.html` exists in `dist`
- Verify assets are being loaded
- Check browser console for errors

---

## Summary

**Publish Directory:** `dist`

This is the standard output directory for Vite builds. Since your Root Directory is `client`, Render will look for the `dist` folder inside `client` and serve files from there.

---

That's it! Just enter `dist` in the Publish Directory field! 🚀

