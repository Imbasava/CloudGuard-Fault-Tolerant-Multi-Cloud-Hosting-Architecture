// backend/db.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.resolve(__dirname, "urbanclean.db"), (err) => {
  if (err) return console.error("Database connection failed:", err.message);
  console.log("✅ Connected to SQLite database.");
});
// backend/db.js

// Create Users Table with role
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('admin', 'citizen'))
  )`
);

// Insert default admin only if not exists
db.get("SELECT * FROM users WHERE email = 'admin@urbanclean.com'", (err, row) => {
  if (!row) {
    db.run(
      `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
      ["Admin", "admin@urbanclean.com", "admin123", "admin"]
    );
    console.log("✅ Default admin added");
  }
});

// Create Reports Table
// Create Reports Table
db.run(
  `CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    city TEXT,
    road TEXT,
    waste_type TEXT,
    description TEXT,
    image_path TEXT,
    lat REAL,
    lng REAL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`
);






module.exports = db;
