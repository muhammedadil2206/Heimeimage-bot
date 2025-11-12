const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/token');

const SALT_ROUNDS = 10;

exports.signup = async (req, res) => {
  try {
    console.log('=== Signup Request ===');
    console.log('Request body:', { name: req.body.name, email: req.body.email, password: req.body.password ? '***' : 'missing' });
    
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      console.error('Validation failed: Missing required fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('Validation failed: Invalid email format');
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate password length
    if (password.length < 6) {
      console.error('Validation failed: Password too short');
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    console.log('Checking for existing user with email:', email);
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.error('User already exists:', email);
      return res.status(409).json({ message: 'Email is already registered' });
    }

    // Hash password
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    console.log('Password hashed successfully');

    // Create user
    console.log('Creating user in database...');
    const userData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    };
    console.log('User data to create:', { name: userData.name, email: userData.email, password: '***' });
    
    const user = await User.create(userData);
    console.log('User created successfully:', { id: user._id, email: user.email, name: user.name });
    
    // Verify user was saved
    const savedUser = await User.findById(user._id);
    if (!savedUser) {
      console.error('ERROR: User was not saved to database!');
      return res.status(500).json({ message: 'Failed to save user to database' });
    }
    console.log('User verified in database:', { id: savedUser._id, email: savedUser.email });

    // Generate token
    console.log('Generating token...');
    const token = generateToken(user);
    console.log('Token generated for user:', user.email);

    return res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('=== Signup Error ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // Handle specific MongoDB errors
    if (error.name === 'MongoServerError' && error.code === 11000) {
      console.error('Duplicate key error: Email already exists');
      return res.status(409).json({ message: 'Email is already registered' });
    }
    
    if (error.name === 'ValidationError') {
      console.error('Validation error:', error.errors);
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: errors.join(', ') });
    }
    
    if (error.message.includes('JWT_SECRET')) {
      console.error('JWT_SECRET not set');
      return res.status(500).json({ message: 'Server configuration error: JWT_SECRET not set' });
    }
    
    // Generic error response
    return res.status(500).json({ 
      message: 'Server error during signup',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      console.error('Login failed: User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Login failed: Password mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    console.log('Token generated for user:', user.email);

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    if (error.message.includes('JWT_SECRET')) {
      return res.status(500).json({ message: 'Server configuration error: JWT_SECRET not set' });
    }
    return res.status(500).json({ message: 'Server error during login' });
  }
};

