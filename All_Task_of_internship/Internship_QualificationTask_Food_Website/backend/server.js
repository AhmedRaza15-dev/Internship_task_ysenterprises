const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://ar9192051_db_user:KD1K6FKpPBDAA3o3@cluster0.9trjthz.mongodb.net/?appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// ----- Mongoose Schemas -----
const cartItemSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  recipeId: { type: Number, required: true },
  name: String,
  price: String,
  image: String,
  category: String,
  description: String,
  quantity: { type: Number, default: 1 },
  selectedSize: String,
  selectedSpiceLevel: String,
  selectedAddons: [String],
  specialInstructions: String,
}, { timestamps: true });

const CartItem = mongoose.model('CartItem', cartItemSchema);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  userId: { type: Number, unique: true } // Keeping numeric ID for compatibility with existing frontend/seed data if needed, or we can use _id
  // Actually, let's use a counter or just use _id? 
  // The current app uses numeric IDs for users (nextUserId). 
  // Let's keep numeric userId for now to avoid breaking other parts, but typically _id is better.
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// ----- In-memory data stores (replace with a real DB in production) -----
let recipes = [
  {
    id: 1,
    name: 'Family Feast Combo',
    category: 'All deals',
    description: '2 Pizzas + 1 Burger + 4 Drinks + Fries',
    price: '$24.99',
    image:
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=600&q=80',
  },
];

// let users = []; // { id, name, email, passwordHash } - REPLACED BY MONGO
let nextRecipeId = recipes.length + 1;
// let nextUserId = 1; // We will auto-increment or just use timestamp/random for numeric ID if strictly needed, or just rely on _id.
// For compatibility with the existing simple logic, let's just generate a numeric ID from timestamp or random for now.

// ----- Middleware -----
app.use(
  cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JWT authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user; // { id, email }
    next();
  });
}

// ----- Basic route -----
app.get('/', (req, res) => {
  res.send('Recipe Sharing API is running!');
});

// ----- Auth routes -----
// Register
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Register request for:', email);

  if (mongoose.connection.readyState !== 1) {
    console.error('MongoDB not connected');
    return res.status(500).json({ message: 'Database disconnected' });
  }

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    
    // Generate a numeric userId for compatibility with existing cart schema
    const userId = Date.now(); 

    const newUser = new User({
      userId,
      name,
      email,
      passwordHash,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser.userId, email: newUser.email, _id: newUser._id }, // Include both IDs
      JWT_SECRET,
      { expiresIn: '7d' } // Extended expiration
    );

    res.status(201).json({
      token,
      user: { id: newUser.userId, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.userId, email: user.email, _id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' } // Extended expiration
    );

    res.json({
      token,
      user: { id: user.userId, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Failed to login' });
  }
});

// Get current authenticated user
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.id }); // Using userId we stored in token
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ id: user.userId, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ----- Recipes routes (for AddtoCard) -----
// Get all recipes
app.get('/api/recipes', (req, res) => {
  res.json(recipes);
});

// Get single recipe by id
app.get('/api/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  res.json(recipe);
});

// Create a new recipe (protected)
app.post('/api/recipes', authenticateToken, (req, res) => {
  const { name, category, description, price, image } = req.body;

  if (!name || !price) {
    return res
      .status(400)
      .json({ message: 'Name and price are required for a recipe' });
  }

  const newRecipe = {
    id: nextRecipeId++,
    name,
    category: category || 'Uncategorized',
    description: description || '',
    price,
    image:
      image ||
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80',
  };

  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

// Delete a recipe by id (protected)
app.delete('/api/recipes/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = recipes.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  const deleted = recipes.splice(index, 1)[0];
  res.json({ message: 'Recipe deleted', recipe: deleted });
});

// ----- Cart Routes (Mongoose) -----

// Get User's Cart
app.get('/api/cart', authenticateToken, async (req, res) => {
  try {
    const cartItems = await CartItem.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(cartItems);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
});

// Add to Cart
app.post('/api/cart', authenticateToken, async (req, res) => {
  console.log('Received Add to Cart request:', req.body);
  console.log('User from token:', req.user);
  
  try {
    const { 
      recipeId, 
      name, 
      price, 
      image, 
      category, 
      description,
      quantity,
      selectedSize,
      selectedSpiceLevel,
      selectedAddons,
      specialInstructions
    } = req.body;

    // Check if item already exists with exact same options for this user
    // If it does, maybe update quantity? 
    // For simplicity, we'll just push a new item as per the schema logic which allows duplicates with different options
    // But typically we merge if options are identical. 
    // Let's implement a merge if identical options.
    
    // Attempt to find an existing item
    // Note: Array comparison in mongo is strict order by default, but for addons check exact match is tricky.
    // We will just add new item for now to match strict frontend "add" behavior unless logic requires merge.
    
    const newItem = new CartItem({
      userId: req.user.id,
      recipeId,
      name,
      price,
      image,
      category,
      description,
      quantity,
      selectedSize,
      selectedSpiceLevel,
      selectedAddons,
      specialInstructions
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Failed to add item to cart' });
  }
});

// Update Cart Item (Quantity, etc)
app.put('/api/cart/:id', authenticateToken, async (req, res) => {
  try {
    const { quantity, selectedSize, selectedSpiceLevel, selectedAddons, specialInstructions } = req.body;
    
    const updatedItem = await CartItem.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { 
        $set: { 
          quantity, 
          selectedSize, 
          selectedSpiceLevel, 
          selectedAddons, 
          specialInstructions 
        } 
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: 'Failed to update cart item' });
  }
});

// Remove Cart Item
app.delete('/api/cart/:id', authenticateToken, async (req, res) => {
  try {
    const deletedItem = await CartItem.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item removed', id: deletedItem._id });
  } catch (error) {
    console.error('Delete cart error:', error);
    res.status(500).json({ message: 'Failed to remove item' });
  }
});

// ----- Start server -----
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});