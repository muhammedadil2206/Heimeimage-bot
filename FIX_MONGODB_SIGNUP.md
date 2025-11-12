# 🔧 Fix MongoDB Signup Issues

## Problem: Signup details not saving to MongoDB

This guide will help you troubleshoot and fix MongoDB signup issues.

---

## Step 1: Check MongoDB Connection

### Test Database Connection

1. **Start your backend server:**
   ```bash
   cd server
   npm run dev
   ```

2. **Check backend console:**
   You should see:
   ```
   ✅ MongoDB connected: ...
   📊 Database: heimage
   🔌 Connection state: Connected
   📁 Collections in database: users
   ```

3. **Test database endpoint:**
   Open in browser: `http://localhost:5000/api/test/test-db`
   
   **Expected response:**
   ```json
   {
     "success": true,
     "message": "MongoDB is connected and working!",
     "connectionState": "connected",
     "database": "heimage",
     "userCount": 0,
     "collections": ["users"]
   }
   ```

---

## Step 2: Check Environment Variables

### Verify `.env` file in `server/` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://aithorappan_db_user:<YOUR_PASSWORD>@aynflix-admin.u9ngiga.mongodb.net/heimage?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_key
CLIPDROP_API_KEY=your_clipdrop_api_key
CLIENT_URL=http://localhost:5173
```

### Important Notes:

1. **Replace `<YOUR_PASSWORD>`** with your actual MongoDB password
2. **No quotes** around the values
3. **No spaces** around the `=` sign
4. **Database name** should be `heimage` (or your preferred database name)

---

## Step 3: Common Issues and Fixes

### Issue 1: MongoDB Connection String is Wrong

**Symptoms:**
- Backend console shows: `❌ MongoDB connection error`
- Error: `MongoServerSelectionError`
- Error: `MongoParseError`

**Fix:**
1. Check your MongoDB connection string format
2. Verify password is correct (no special characters that need encoding)
3. Replace `<YOUR_PASSWORD>` with actual password
4. Make sure database name is correct

**Example of correct format:**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

---

### Issue 2: MongoDB Atlas IP Whitelist

**Symptoms:**
- Backend console shows: `MongoServerSelectionError`
- Error: `IP not whitelisted`

**Fix:**
1. Go to MongoDB Atlas Dashboard
2. Click **Network Access** → **IP Access List**
3. Click **Add IP Address**
4. Add `0.0.0.0/0` (allows all IPs) OR your current IP address
5. Click **Confirm**

**Note:** For development, `0.0.0.0/0` is fine. For production, use specific IPs.

---

### Issue 3: MongoDB User Permissions

**Symptoms:**
- Connection succeeds but can't create users
- Error: `not authorized`

**Fix:**
1. Go to MongoDB Atlas Dashboard
2. Click **Database Access** → **Database Users**
3. Find your user (e.g., `aithorappan_db_user`)
4. Make sure user has **Read and write** permissions
5. If not, click **Edit** → **Built-in Role** → **Read and write to any database**

---

### Issue 4: Database Doesn't Exist

**Symptoms:**
- Connection succeeds but no collections
- Users not saving

**Fix:**
1. MongoDB will create the database automatically when first document is saved
2. Make sure database name in connection string is correct
3. Check backend console for database name: `📊 Database: heimage`

---

### Issue 5: Password Contains Special Characters

**Symptoms:**
- Connection fails
- Error: `Authentication failed`

**Fix:**
1. If password contains special characters, URL-encode them:
   - `@` → `%40`
   - `#` → `%23`
   - `$` → `%24`
   - `%` → `%25`
   - `&` → `%26`
   - `+` → `%2B`
   - `=` → `%3D`
   - `?` → `%3F`

2. Or change password in MongoDB Atlas to one without special characters

---

## Step 4: Test Signup

### 1. Check Backend Console

When you sign up, you should see:
```
=== Signup Request ===
Request body: { name: '...', email: '...', password: '***' }
Checking for existing user with email: ...
Hashing password...
Password hashed successfully
Creating user in database...
User created successfully: { id: '...', email: '...', name: '...' }
User verified in database: { id: '...', email: '...' }
Token generated for user: ...
```

### 2. Check for Errors

If you see errors:
```
=== Signup Error ===
Error name: MongoServerError
Error message: ...
Error stack: ...
```

**Look for:**
- `MongoServerError` - Database connection or permission issue
- `ValidationError` - Data validation failed
- `MongoParseError` - Connection string format issue

---

## Step 5: Verify User was Saved

### Method 1: Test Database Endpoint

1. Open: `http://localhost:5000/api/test/test-db`
2. Check `userCount` - should be > 0 after signup
3. Check `sampleUser` - should show your user data

### Method 2: MongoDB Atlas Dashboard

1. Go to MongoDB Atlas Dashboard
2. Click **Collections** → **heimage** → **users**
3. You should see your user document

### Method 3: Try Login

1. Try logging in with the credentials you used to sign up
2. If login works, user was saved successfully

---

## Step 6: Debug Steps

### 1. Check Backend Logs

Look for these in backend console:
- `✅ MongoDB connected` - Connection successful
- `User created successfully` - User saved
- `User verified in database` - User confirmed saved
- Any error messages

### 2. Check Frontend Console

Look for these in browser console (F12):
- Network request to `/api/auth/signup`
- Response status (should be 201)
- Response data (should have `token` and `user`)

### 3. Check MongoDB Connection

Run test endpoint:
```
http://localhost:5000/api/test/test-db
```

---

## Step 7: Common Fixes

### Fix 1: Restart Backend Server

1. Stop backend server (Ctrl + C)
2. Start again: `npm run dev`
3. Check for MongoDB connection message

### Fix 2: Check .env File

1. Make sure `.env` file is in `server/` folder
2. Make sure there are no quotes around values
3. Make sure there are no spaces around `=`
4. Make sure password is correct

### Fix 3: Verify MongoDB Atlas Settings

1. Check IP whitelist
2. Check user permissions
3. Check database name
4. Check connection string format

### Fix 4: Test Connection Manually

Use MongoDB Compass or MongoDB Shell to test connection:
```
mongodb+srv://username:password@cluster.mongodb.net/heimage
```

---

## Step 8: Still Not Working?

### Check These:

1. **Backend console** - Look for error messages
2. **Browser console** - Check network requests
3. **MongoDB Atlas** - Check database and collections
4. **.env file** - Verify all values are correct
5. **Network** - Check if MongoDB Atlas is accessible

### Share These Details:

1. Backend console error messages
2. Browser console error messages
3. MongoDB connection test endpoint response
4. .env file (hide password)
5. MongoDB Atlas settings (screenshot)

---

## Quick Checklist

- [ ] MongoDB connection string is correct
- [ ] Password is correct (no special characters or URL-encoded)
- [ ] IP address is whitelisted in MongoDB Atlas
- [ ] User has read/write permissions
- [ ] Database name is correct
- [ ] Backend server is running
- [ ] MongoDB is connected (check console)
- [ ] .env file is in `server/` folder
- [ ] No quotes around .env values
- [ ] No spaces around `=` in .env

---

## Test Endpoints

### Test Database Connection
```
GET http://localhost:5000/api/test/test-db
```

### Test Signup
```
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

---

## Expected Behavior

### Successful Signup:

1. **Backend Console:**
   ```
   === Signup Request ===
   User created successfully: { id: '...', email: '...', name: '...' }
   User verified in database: { id: '...', email: '...' }
   Token generated for user: ...
   ```

2. **Frontend Response:**
   ```json
   {
     "message": "Account created successfully",
     "token": "...",
     "user": {
       "id": "...",
       "name": "Test User",
       "email": "test@example.com"
     }
   }
   ```

3. **MongoDB:**
   - User document saved in `users` collection
   - User count increases
   - User can login successfully

---

## Need More Help?

If you're still having issues:

1. Check backend console for detailed error messages
2. Check browser console for network errors
3. Test database connection endpoint
4. Verify MongoDB Atlas settings
5. Check .env file format

---

That's it! Your signup should now save to MongoDB. 🎉

