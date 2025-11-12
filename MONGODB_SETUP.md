# 🗄️ MongoDB Setup for Heimage Bot

## Database: `heimeimage`

All data from the Heimage Bot website is stored in the MongoDB database named **`heimeimage`**.

---

## Collections

### 1. `users` Collection

**Purpose:** Stores all user accounts and their image generation history.

**Schema:**
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  prompts: [
    {
      prompt: String (required),
      style: String (required),
      imageUrl: String (required),
      createdAt: Date,
      updatedAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `email` (unique index)

**Data Stored:**
- User registration information (name, email, password)
- User's image generation history (last 20 prompts)
- Each prompt includes: prompt text, style, image URL (base64), timestamps

---

## Setup Instructions

### Step 1: Update MONGO_URI

Make sure your `server/.env` file has the correct MongoDB connection string:

```env
MONGO_URI=mongodb+srv://aithorappan_db_user:<YOUR_PASSWORD>@aynflix-admin.u9ngiga.mongodb.net/heimeimage?retryWrites=true&w=majority
```

**Important:**
- Replace `<YOUR_PASSWORD>` with your actual MongoDB password
- Database name must be `heimeimage`
- No quotes around the value
- No spaces around the `=` sign

---

### Step 2: Start Backend Server

```bash
cd server
npm run dev
```

**Expected Output:**
```
Connecting to MongoDB...
✅ MongoDB connected: ...
📊 Database: heimeimage
🔌 Connection state: Connected
📁 Existing collections: bot, users
✅ Connected to correct database: heimeimage
🔧 Initializing collections...
   ✅ Collection "users" already exists
   ✅ Email index already exists
✅ Collections initialized successfully
```

---

### Step 3: Verify Collections

1. **Check Backend Console:**
   - Should show: `📁 Existing collections: users`
   - Should show: `✅ Collection "users" already exists`

2. **Check MongoDB Atlas:**
   - Go to MongoDB Atlas Dashboard
   - Click **Data Explorer**
   - Select database `heimeimage`
   - You should see `users` collection

3. **Test Database Endpoint:**
   - Open: `http://localhost:5000/api/test/test-db`
   - Should show: `"collections": ["users"]`

---

## Data Flow

### 1. User Signup
- User fills out signup form (name, email, password)
- Password is hashed with bcrypt
- User document is created in `users` collection
- User data is saved to MongoDB

### 2. User Login
- User enters email and password
- System finds user in `users` collection
- Password is verified
- JWT token is generated
- User data is returned

### 3. Image Generation
- User enters prompt and selects style
- Image is generated via Clipdrop API
- Image is converted to base64
- Prompt history is saved to user's `prompts` array
- Only last 20 prompts are kept

### 4. History Retrieval
- User's prompt history is fetched from `users` collection
- History is sorted by most recent first
- Up to 20 prompts are returned

---

## Collections Created

### Automatic Collection Creation

When the server starts, it automatically:
1. Checks if `users` collection exists
2. Creates `users` collection if it doesn't exist
3. Creates email index on `users` collection
4. Verifies database name is `heimeimage`

### Manual Collection Creation

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

### Method 3: Backend Console

When you sign up, you should see:
```
=== Signup Request ===
User created successfully: { id: '...', email: '...', name: '...' }
User verified in database: { id: '...', email: '...' }
```

---

## Database Structure

```
heimeimage (database)
├── users (collection)
    ├── Document 1 (user)
    │   ├── _id: ObjectId
    │   ├── name: String
    │   ├── email: String (unique)
    │   ├── password: String (hashed)
    │   ├── prompts: Array
    │   │   ├── prompt: String
    │   │   ├── style: String
    │   │   ├── imageUrl: String (base64)
    │   │   ├── createdAt: Date
    │   │   └── updatedAt: Date
    │   ├── createdAt: Date
    │   └── updatedAt: Date
    └── Document 2 (user)
        └── ...
```

---

## Troubleshooting

### Issue: Collections Not Created

**Solution:**
1. Check backend console for errors
2. Verify MongoDB connection is successful
3. Check if database name is correct in MONGO_URI
4. Manually create collections via MongoDB Atlas

### Issue: Users Not Saving

**Solution:**
1. Check backend console for signup errors
2. Verify MongoDB connection is active
3. Check if email index exists
4. Verify user permissions in MongoDB Atlas

### Issue: Wrong Database

**Solution:**
1. Update MONGO_URI to use `heimeimage` database
2. Restart backend server
3. Verify connection: `📊 Database: heimeimage`

---

## Environment Variables

### Required in `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/heimeimage?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_key
CLIPDROP_API_KEY=your_clipdrop_api_key
CLIENT_URL=http://localhost:5173
```

---

## Quick Test

### Test Database Connection:
```
GET http://localhost:5000/api/test/test-db
```

### Test Signup:
```
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### Expected Response:
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

---

## Summary

- **Database:** `heimeimage`
- **Collection:** `users`
- **Data Stored:** User accounts, passwords (hashed), image generation history
- **Auto-created:** Collections and indexes are created automatically on server start
- **Verified:** Database name is verified on connection

All website data is now stored in MongoDB database `heimeimage`! 🎉

