// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /api/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Please fill in all fields" });

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) return res.status(500).json({ error: "Server error" });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    return res.json({
      message: "Login successful",
      role: user.role,
      name: user.name,
    });
  });
});

// REGISTER Route
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  const query = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'citizen')`;

  db.run(query, [name, email, password], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE constraint")) {
        return res.status(400).json({ error: "Email already exists" });
      }
      console.error("Registration error:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json({ message: "User registered successfully" });
  });
});

module.exports = router;
