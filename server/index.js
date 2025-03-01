const express = require('express');
const mongoose = require('mongoose');
const http = require("http");
const cors = require('cors');
const SocketService = require("./SocketService");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

app.use(cors()); // Enable CORS for frontend
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// User schema and model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model('User', UserSchema);

// Routes
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post('/admin/create-user', async (req, res) => {
  try {
    const { token, email, password, isAdmin } = req.body;

    // Verify the token
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const adminUser = await User.findById(decoded.userId);

    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).send('Access denied');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, isAdmin: isAdmin || false });

    await newUser.save();
    res.send('User created successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, 'your_jwt_secret');
    res.json({ token, isAdmin: user.isAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error during login');
  }
});

app.post('/create-admin', async (req, res) => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ isAdmin: true });
    if (existingAdmin) {
      return res.status(400).send('Admin already exists');
    }

    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({ email, password: hashedPassword, isAdmin: true });
    await admin.save();

    res.send('Admin created successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating admin');
  }
});

// ✅ Fix: Use `PORT` instead of `port`
server.listen(PORT, function () {
    console.log("Server listening on port:", PORT);
    const socketService = new SocketService();
    socketService.attachServer(server);
});
