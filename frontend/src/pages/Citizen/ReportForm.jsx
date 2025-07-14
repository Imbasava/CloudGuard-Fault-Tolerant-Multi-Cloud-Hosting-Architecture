import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";


// Leaflet marker icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// --- Style Definitions ---

const styles = {
  formContainer: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "2.5rem",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: "#333",
  },
  formTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#2c5282",
    marginBottom: "2rem",
    textAlign: "center",
    borderBottom: "2px solid #e2e8f0",
    paddingBottom: "1rem",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  formLabel: {
    display: "block",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#4a5568",
    fontSize: "1rem",
  },
  // Base style for all input, select, and textarea elements
  inputBase: {
    width: "100%",
    padding: "0.875rem",
    border: "1px solid #cbd5e0",
    borderRadius: "8px",
    fontSize: "1rem",
    color: "#2d3748",
    backgroundColor: "#f7fafc",
    boxSizing: "border-box", // Ensures padding doesn't affect final width
  },
  textarea: {
    resize: "vertical",
    minHeight: "120px",
  },
  fileInputContainer: {
    position: "relative",
    overflow: "hidden",
    display: "inline-block",
    cursor: "pointer",
  },
  hiddenFileInput: {
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0,
    cursor: "pointer",
    width: "100%",
    height: "100%",
  },
  customFileUploadButton: {
    display: "inline-block",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#4299e1",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
  },
  mapContainer: {
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
    marginTop: "1rem",
    height: "300px",
    width: "100%",
  },
  submitButton: {
    display: "block",
    width: "100%",
    padding: "1rem",
    backgroundColor: "#2c5282",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.125rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "2rem",
  },
  selectedLocationText: {
    fontSize: "0.875rem",
    color: "#4a5568",
    marginTop: "0.5rem",
  },
};

function LocationPicker({ setLocation }) {
  useMapEvents({
    click(e) {
      setLocation(e.latlng);
    },
  });
  return null;
}

function ReportForm() {
  const navigate = useNavigate(); // ✅ must be here

  const [formData, setFormData] = useState({
    reporterName: "",
    city: "",
    road: "",
    wasteType: "",
    description: "",
    image: null,
  });
  const [location, setLocation] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFileName(files[0].name);
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

 // import { useNavigate } from "react-router-dom"; // ✅ at the top

const handleSubmit = async (e) => {
  e.preventDefault();

  const reportData = {
    name: formData.reporterName, // You must pass the logged-in user's ID
    city: formData.city,
    road: formData.road,
    waste_type: formData.wasteType,
    description: formData.description,
    image_path: fileName || null,
    lat: location?.lat,
    lng: location?.lng,
  };

  try {
    const res = await fetch("http://localhost:5000/api/report/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reportData),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Report Submitted Successfully!");
      navigate("/"); // or navigate("/citizen/report/success") etc.
    } else {
      alert(data.error || "Something went wrong.");
    }
  } catch (err) {
    console.error("Submission Error:", err);
    alert("Server Error.");
  }
};

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.formTitle}>🧹 Report an Unclean Area</h2>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Your Name</label>
            <input
              type="text"
              name="reporterName"
              style={styles.inputBase}
              placeholder="Enter your name"
              required
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>City</label>
            <input
              type="text"
              name="city"
              style={styles.inputBase}
              placeholder="Enter city name"
              required
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Road / Area</label>
            <input
              type="text"
              name="road"
              style={styles.inputBase}
              placeholder="e.g., MG Road"
              required
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Type of Waste</label>
            <select
              name="wasteType"
              style={styles.inputBase}
              required
              onChange={handleChange}
            >
              <option value="">Select waste type</option>
              <option value="Garbage">Garbage</option>
              <option value="Plastic Waste">Plastic Waste</option>
              <option value="Industrial Waste">Industrial Waste</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Description</label>
          <textarea
            name="description"
            style={{ ...styles.inputBase, ...styles.textarea }}
            rows={4}
            placeholder="Describe the issue..."
            required
            onChange={handleChange}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Upload Image</label>
          <div style={styles.fileInputContainer}>
            <span style={styles.customFileUploadButton}>Choose File</span>
            <input
              type="file"
              accept="image/*"
              name="image"
              style={styles.hiddenFileInput}
              required
              onChange={handleChange}
            />
          </div>
          {fileName && <span style={{ marginLeft: '1rem', color: '#4a5568' }}>{fileName}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Select Location on Map</label>
          <div style={styles.mapContainer}>
            <MapContainer
              center={[12.9716, 77.5946]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationPicker setLocation={setLocation} />
              {location && <Marker position={location} />}
            </MapContainer>
          </div>
          {location && (
            <p style={styles.selectedLocationText}>
              Selected: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </p>
          )}
        </div>

        <div>
          <button type="submit" style={styles.submitButton}>
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportForm;

