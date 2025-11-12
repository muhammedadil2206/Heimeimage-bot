# 🗄️ Setup MongoDB Database: heimeimage

## Quick Setup Guide

This guide will help you set up the MongoDB database `heimeimage` to store all data from the Heimage Bot website.

---

## Step 1: Update MONGO_URI

### Update `server/.env` file:

```env
MONGO_URI=mongodb+srv://aithorappan_db_user:<YOUR_PASSWORD>@aynflix-admin.u9ngiga.mongodb.net/heimeimage?retryWrites=true&w=majority
```

**Important:**
- Replace `<YOUR_PASSWORD>` with your actual MongoDB password
- Database name must be `heimeimage` (not `heime` or `heimeimage`)
- No quotes around the value
- No spaces around the `=` sign

**Example:**
```env
MONGO_URI=mongodb+srv://aithorappan_db_user:MyPassword123@aynflix-admin.u9ngiga.mongodb.net/heimeimage?retryWrites=true&w=majority
```

---

## Step 2: Verify Database Connection

### Option 1: Check Backend Console

1. Start backend server:
   ```bash
   cd server
   npm run dev
   ```

2. Look for these messages:
   ```
   ✅ MongoDB connected: ...
   📊 Database: heimeimage
   ✅ Connected to correct database: heimeimage
   🔧 Initializing collections...
   ✅ Collection "users" already exists
   ✅ Email index already exists
   ✅ Collections initialized successfully
   ```

### Option 2: Test Database Endpoint

1. Open in browser: `http://localhost:5000/api/test/test-db`

2. Expected response:
   ```json
   {
     "success": true,
     "message": "MongoDB is connected and working!",
     "database": "heimeimage",
     "databaseCorrect": true,
     "expectedDatabase": "heimeimage",
     "userCount": 0,
     "collections": ["users"]
   }
   ```

### Option 3: Run Verification Script

1. Run verification script:
   ```bash
   cd server
   npm run verify-db
   ```

2. Expected output:
   ```
   ✅ Database name is correct: heimeimage
   ✅ Users collection exists
   Total users: 0
   Indexes: 2
   ✅ Database verification complete!
   ```

---

## Step 3: Test Signup

### 1. Sign up a new user:

1. Go to `http://localhost:5173`
2. Click **Sign up**
3. Enter:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
4. Click **Sign up**

### 2. Check Backend Console:

You should see:
```
=== Signup Request ===
User created successfully: { id: '...', email: 'test@example.com', name: 'Test User' }
User verified in database: { id: '...', email: 'test@example.com' }
Token generated for user: test@example.com
```

### 3. Check MongoDB Atlas:

1. Go to MongoDB Atlas Dashboard
2. Click **Data Explorer**
3. Select database `heimeimage`
4. Click collection `users`
5. You should see your user document

---

## Collections Created

### Automatic Collection Creation

When the server starts, it automatically:

1. **Creates `users` collection** (if it doesn't exist)
2. **Creates email index** (if it doesn't exist)
3. **Verifies database name** is `heimeimage`

### Manual Collection Creation (if needed)

If collections are not created automatically:

1. **Via MongoDB Atlas:**
   - Go to Data Explorer
   - Select database `heimeimage`
   - Click **CREATE COLLECTION**
   - Name: `users`
   - Click **Create**

2. **Via MongoDB Shell:**
   ```bash
   use heimeimage
   db.createCollection("users")
   db.users.createIndex({ email: 1 }, { unique: true })
   ```

---

## Data Stored in MongoDB

### Users Collection

**Each user document contains:**
- `_id`: Unique user ID
- `name`: User's name
- `email`: User's email (unique)
- `password`: Hashed password
- `prompts`: Array of image generation history
  - `prompt`: Text prompt
  - `style`: Style selected
  - `imageUrl`: Base64 image data
  - `createdAt`: Creation timestamp
  - `updatedAt`: Update timestamp
- `createdAt`: User creation timestamp
- `updatedAt`: User update timestamp

**Example user document:**
```json
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$...",
  "prompts": [
    {
      "prompt": "A cyberpunk city",
      "style": "Realistic",
      "imageUrl": "data:image/png;base64,...",
      "createdAt": "2025-11-12T09:00:00.000Z",
      "updatedAt": "2025-11-12T09:00:00.000Z"
    }
  ],
  "createdAt": "2025-11-12T08:00:00.000Z",
  "updatedAt": "2025-11-12T09:00:00.000Z"
}
```

---

## Verify Data is Saving

### Method 1: MongoDB Atlas Dashboard

1. Go to MongoDB Atlas Dashboard
2. Click **Data Explorer**
3. Select database `heimeimage`
4. Click collection `users`
5. You should see user documents

### Method 2: Test Endpoint

1. Open: `http://localhost:5000/api/test/test-db`
2. Check `userCount` - should increase after signup
3. Check `sampleUser` - should show user data
4. Check `promptsCount` - should show number of prompts

### Method 3: Backend Console

When you sign up, you should see:
```
User created successfully: { id: '...', email: '...', name: '...' }
User verified in database: { id: '...', email: '...' }
```

---

## Troubleshooting

### Issue: Wrong Database Name

**Symptoms:**
- Backend console shows: `⚠️ Warning: Connected to database "..." but expected "heimeimage"`
- Test endpoint shows: `"databaseCorrect": false`

**Solution:**
1. Update `server/.env` file
2. Change database name in MONGO_URI to `heimeimage`
3. Restart backend server
4. Verify: `📊 Database: heimeimage`

### Issue: Collections Not Created

**Symptoms:**
- Backend console shows: `📁 Existing collections: None`
- Test endpoint shows: `"collections": []`

**Solution:**
1. Check backend console for errors
2. Verify MongoDB connection is successful
3. Collections will be created automatically when first user signs up
4. Or manually create via MongoDB Atlas

### Issue: Users Not Saving

**Symptoms:**
- Signup succeeds but user not in database
- Backend console shows errors

**Solution:**
1. Check backend console for detailed errors
2. Verify MongoDB connection is active
3. Check if email index exists
4. Verify user permissions in MongoDB Atlas
5. Check if database name is correct

---

## Quick Checklist

- [ ] MONGO_URI uses `heimeimage` database
- [ ] Password is correct (no special characters or URL-encoded)
- [ ] Backend server is running
- [ ] MongoDB is connected (check console)
- [ ] `users` collection exists
- [ ] Email index exists
- [ ] Test signup works
- [ ] User appears in MongoDB Atlas

---

## Test Commands

### Test Database Connection:
```bash
curl http://localhost:5000/api/test/test-db
```

### Verify Database Setup:
```bash
cd server
npm run verify-db
```

### Test Signup:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## Expected Behavior

### After Setup:

1. **Backend Console:**
   ```
   ✅ MongoDB connected: ...
   📊 Database: heimeimage
   ✅ Connected to correct database: heimeimage
   🔧 Initializing collections...
   ✅ Collection "users" already exists
   ✅ Email index already exists
   ✅ Collections initialized successfully
   ```

2. **MongoDB Atlas:**
   - Database: `heimeimage`
   - Collection: `users`
   - Index: `email` (unique)

3. **After Signup:**
   - User document created in `users` collection
   - User can login
   - User can generate images
   - Prompts are saved to user's history

---

## Summary

✅ **Database:** `heimeimage`
✅ **Collection:** `users`
✅ **Data Stored:** User accounts, passwords (hashed), image generation history
✅ **Auto-created:** Collections and indexes are created automatically
✅ **Verified:** Database name is verified on connection

All website data is now stored in MongoDB database `heimeimage`! 🎉

---

## Next Steps

1. **Update MONGO_URI** in `server/.env` to use `heimeimage` database
2. **Restart backend server**
3. **Verify connection** using test endpoint or verification script
4. **Test signup** to verify data is saving
5. **Check MongoDB Atlas** to see user documents

---

That's it! Your Heimage Bot is now configured to store all data in the `heimeimage` database! 🚀

