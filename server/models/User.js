const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema(
  {
    prompt: { type: String, required: true },
    style: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Name is required'], 
      trim: true,
      minlength: [1, 'Name must be at least 1 character long'],
      maxlength: [100, 'Name must be less than 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: { 
      type: String, 
      required: [true, 'Password is required'], 
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false, // Don't return password by default
    },
    prompts: {
      type: [promptSchema],
      default: [],
    },
  },
  { 
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        delete ret.password;
        return ret;
      }
    }
  }
);

// Index for faster email lookups
userSchema.index({ email: 1 });

// Method to add prompt to user history
userSchema.methods.addPrompt = function (promptEntry) {
  this.prompts.unshift(promptEntry);
  if (this.prompts.length > 20) {
    this.prompts = this.prompts.slice(0, 20);
  }
  return this.save();
};

// Static method to find user by email (including password)
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() }).select('+password');
};

// Ensure collection name is 'users' (not 'bots' or other names)
const User = mongoose.model('User', userSchema);

// Create collection if it doesn't exist
User.createCollection().then(() => {
  console.log('✅ Users collection ready');
}).catch((err) => {
  if (err.code !== 48) { // 48 = namespace exists
    console.error('Error creating users collection:', err.message);
  }
});

module.exports = User;

