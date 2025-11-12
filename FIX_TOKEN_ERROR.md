# 🔧 Fix "Invalid or expired token" Error

## Quick Fix (3 Steps)

### Step 1: Clear Browser Storage

**Option A: Using Browser Console (Fastest)**
1. Open your browser (where the app is running)
2. Press `F12` to open DevTools
3. Go to **Console** tab
4. Type this command and press Enter:
   ```javascript
   localStorage.removeItem('heimage_auth'); location.reload();
   ```

**Option B: Using Browser DevTools**
1. Open DevTools (`F12`)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click **Local Storage** → `http://localhost:5173`
4. Find `heimage_auth` and delete it
5. Refresh the page (`F5`)

### Step 2: Verify JWT_SECRET is Set

1. Open `server/.env` file
2. Make sure it has this line:
   ```
   JWT_SECRET=your_random_secret_key_here
   ```
   **Important:**
   - Use any random string (e.g., `my_secret_key_12345`)
   - NO quotes around the value
   - NO spaces around the `=` sign

3. If JWT_SECRET was missing or changed, you MUST restart the backend server

### Step 3: Restart Backend Server

1. Go to Terminal 1 (where backend is running)
2. Press `Ctrl + C` to stop it
3. Restart it:
   ```bash
   cd server
   npm run dev
   ```
4. Wait for: `Server listening on port 5000`

### Step 4: Log In Again

1. Go to `http://localhost:5173`
2. Click **Login** or **Sign up**
3. Log in with your credentials
4. You should now have a fresh, valid token!

---

## Why This Happens

The "Invalid or expired token" error occurs when:

1. **Token was created before JWT_SECRET was set** - The token was signed with no secret or wrong secret
2. **JWT_SECRET changed** - If you changed JWT_SECRET, all old tokens become invalid
3. **Token expired** - Tokens expire after 7 days (unlikely if you just logged in)
4. **Token corrupted** - The token in localStorage got corrupted

---

## Prevention

To avoid this in the future:

1. **Always set JWT_SECRET before first login** - Make sure `server/.env` has JWT_SECRET before starting the server
2. **Don't change JWT_SECRET after users log in** - If you change it, all users need to log in again
3. **Restart server after changing .env** - Changes to `.env` only take effect after restart

---

## Verify It's Fixed

After logging in again:

1. Check browser console - Should show "Token Debug Info" with valid token
2. Check backend console - Should show "Token verified successfully"
3. Try generating an image - Should work without errors

---

## Still Not Working?

If you still get the error after following these steps:

1. **Check backend console** - Look for "JWT Error: Token is malformed or signature is invalid"
2. **Check JWT_SECRET** - Make sure it's exactly the same in `server/.env` (no extra spaces, no quotes)
3. **Check token format** - In browser console, type:
   ```javascript
   JSON.parse(localStorage.getItem('heimage_auth'))
   ```
   - Should show `{token: "...", user: {...}}`
   - Token should be a long string with dots (e.g., `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

4. **Share the error** - Copy the exact error from:
   - Browser console
   - Backend console

---

## Quick Command Summary

```bash
# 1. Clear localStorage (in browser console)
localStorage.removeItem('heimage_auth'); location.reload();

# 2. Restart backend (in Terminal 1)
cd server
npm run dev

# 3. Log in again (in browser)
# Go to http://localhost:5173 and log in
```

---

That's it! Your token error should be fixed. 🎉

