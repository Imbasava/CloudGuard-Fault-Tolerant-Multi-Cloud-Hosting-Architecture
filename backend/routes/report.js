// backend/routes/report.js
const express = require("express");
const router = express.Router();
const db = require("../db");


router.get("/all", (req, res) => {
  db.all("SELECT * FROM reports ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      console.error("Fetch reports error:", err.message);
      return res.status(500).json({ error: "Failed to fetch reports" });
    }
    res.status(200).json(rows);
  });
});

// Submit Report
router.post("/submit", (req, res) => {
  const { // citizen's user ID\
    name,
    city,
    road,
    waste_type,
    description,
    image_path,
    lat,
    lng,
  } = req.body;

  if (!name || !city || !road || !waste_type || !description || !lat || !lng) {
    return res.status(400).json({ error: "Please fill all required fields" });
  }

  const query = `
    INSERT INTO reports 
    (name, city, road, waste_type, description, image_path, lat, lng)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [name, city, road, waste_type, description, image_path || null, lat, lng],
    function (err) {
      if (err) {
        console.error("Error inserting report:", err.message);
        return res.status(500).json({ error: "Internal server error" });
      }

      return res.status(200).json({ message: "Report submitted successfully", report_id: this.lastID });
    }
  );
});

module.exports = router;
