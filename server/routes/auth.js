const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import User model
const bcrypt = require("bcrypt");

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create New User
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    res.status(200).json({ message: "Login successful!", user });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
