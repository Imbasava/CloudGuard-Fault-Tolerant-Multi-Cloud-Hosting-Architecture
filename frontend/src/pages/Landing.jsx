import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import clean1 from "../assets/gallery/image1.jpg";
import clean2 from "../assets/gallery/image2.jpg";
import clean3 from "../assets/gallery/image3.jpg";
// ⬇️ 1. ADD YOUR NEW IMAGE IMPORT HERE
import thoughtImage from "../assets/gallery/thought.jpg"; // <-- Replace with the path to your image

function Landing() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [clean1, clean2, clean3];
  const imageDescriptions = [
    "Beach Cleanup Drive - Community volunteers making a difference",
    "Park Restoration - Local community effort for greener spaces",
    "Street Cleaning - Neighborhood initiative for cleaner roads",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f8fafc" }}>
      {/* Header */}
      <header style={{ background: "linear-gradient(to right, #2563eb, #7c3aed)", color: "white", padding: "1rem" }}>
        <div style={{ maxWidth: "1200px", margin: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "2rem" }}>🧹</span>
            <div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>UrbanClean</h1>
              <p style={{ fontSize: "0.75rem", color: "#dbeafe" }}>Making cities cleaner</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={() => navigate("/login")} style={{ background: "none", color: "white", border: "none", cursor: "pointer" }}>Login</button>
            <button
              onClick={() => navigate("/register")}
              style={{ background: "white", color: "#2563eb", padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "none", cursor: "pointer" }}
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ textAlign: "center", padding: "4rem 1rem" }}>
        <h2 style={{
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          background: "linear-gradient(to right, #2563eb, #7c3aed, #06b6d4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Welcome to UrbanClean
        </h2>
        <p style={{ fontSize: "1.2rem", color: "#374151", maxWidth: "600px", margin: "auto", marginBottom: "3rem" }}>
          A civic-tech platform to bridge the gap between citizens and city officials for a cleaner environment.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem", maxWidth: "1000px", margin: "auto" }}>
          {/* Citizen Card */}
          <div
            style={{
              background: "linear-gradient(to bottom right, #3b82f6, #2563eb)",
              color: "white",
              padding: "2rem",
              borderRadius: "1rem",
              width: "280px",
              cursor: "pointer",
              transition: "transform 0.3s",
            }}
            onClick={() => navigate("/citizen/report")}
            onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{
                background: "white",
                color: "#2563eb",
                width: "80px",
                height: "80px",
                margin: "auto",
                borderRadius: "50%",
                fontSize: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem"
              }}>👤</div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>I'm a Citizen</h3>
              <p style={{ margin: "1rem 0" }}>Report issues and contribute to a cleaner city.</p>
              <div style={{
                background: "white",
                color: "#2563eb",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                fontWeight: "600",
              }}>
                Report an Issue
              </div>
            </div>
          </div>

          {/* Official Card */}
          <div
  style={{
    background: "linear-gradient(to bottom right, #374151, #1f2937)",
    color: "white",
    padding: "2rem",
    borderRadius: "1rem",
    width: "280px",
    cursor: "pointer",
    transition: "transform 0.3s",
  }}
  onClick={() => {
    const role = localStorage.getItem("user");
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      alert("Access denied. You are not an admin.");
    }
  }}
  onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
  onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
>
  <div style={{ textAlign: "center" }}>
    <div
      style={{
        background: "white",
        color: "#1f2937",
        width: "80px",
        height: "80px",
        margin: "auto",
        borderRadius: "50%",
        fontSize: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1rem",
      }}
    >
      👮
    </div>
    <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>I'm an Official</h3>
    <p style={{ margin: "1rem 0" }}>View and manage complaints efficiently.</p>
    <div
      style={{
        background: "white",
        color: "#1f2937",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        fontWeight: "600",
      }}
    >
      Admin Dashboard
    </div>
  </div>
</div>

        </div>
      </section>

      {/* ✨ NEW SECTION: A Thought on Cleanliness ✨ */}
      <section style={{ padding: "4rem 2rem", backgroundColor: "#f8fafc" }}>
        <div style={{
          maxWidth: "1000px",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "3rem",
          flexWrap: "wrap", // Ensures responsiveness on smaller screens
        }}>
          {/* Left Side: Image */}
          <div style={{ flex: "1", minWidth: "280px" }}>
            <img
              src={thoughtImage} // The new image you import
              alt="A clean and vibrant community space"
              style={{ width: "100%", height: "auto", borderRadius: "1rem", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            />
          </div>

          {/* Right Side: Thought/Explanation */}
          <div style={{ flex: "1.5", minWidth: "280px", textAlign: "left" }}>
            <h3 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1e293b", marginBottom: "1rem" }}>
              Our Environment, Our Pride
            </h3>
            <p style={{ fontSize: "1.1rem", color: "#475569", lineHeight: "1.6" }}>
              The beauty of our city is a reflection of its people.
              A single act of care—like picking up a piece of litter—can inspire a ripple effect of positive change.
              Together, let's nurture the spaces we share and build a legacy of cleanliness and pride for future generations.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ backgroundColor: "white", padding: "4rem 1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold" }}>Cleanliness Drives Gallery 📸</h3>
          <p style={{ color: "#6b7280" }}>See the impact of our community in action</p>
        </div>

        <div style={{ position: "relative", maxWidth: "800px", height: "400px", margin: "auto", overflow: "hidden", borderRadius: "1rem" }}>
          <div style={{
            display: "flex",
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: "transform 0.7s ease-in-out",
            width: `${images.length * 100}%`
          }}>
            {images.map((image, index) => (
              <div key={index} style={{ flex: "0 0 100%", position: "relative" }}>
                <img src={image} alt={`Gallery ${index + 1}`} style={{ width: "100%", height: "400px", objectFit: "cover" }} />
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                  color: "white",
                  padding: "1rem"
                }}>
                  <h4 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{imageDescriptions[index].split(" - ")[0]}</h4>
                  <p style={{ fontSize: "0.9rem" }}>{imageDescriptions[index].split(" - ")[1]}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button onClick={prevSlide} style={{
            position: "absolute", top: "50%", left: "1rem",
            transform: "translateY(-50%)", backgroundColor: "white",
            border: "none", padding: "0.5rem", borderRadius: "999px", cursor: "pointer"
          }}>‹</button>
          <button onClick={nextSlide} style={{
            position: "absolute", top: "50%", right: "1rem",
            transform: "translateY(-50%)", backgroundColor: "white",
            border: "none", padding: "0.5rem", borderRadius: "999px", cursor: "pointer"
          }}>›</button>

          {/* Dots */}
          <div style={{ position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.5rem" }}>
            {images.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  width: "10px", height: "10px", borderRadius: "50%",
                  backgroundColor: currentSlide === index ? "#2563eb" : "#d1d5db",
                  cursor: "pointer"
                }}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#111827", color: "white", textAlign: "center", padding: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", alignItems: "center" }}>
          <span style={{ fontSize: "1.5rem" }}>🧹</span>
          <h4 style={{ fontWeight: "bold" }}>UrbanClean</h4>
        </div>
        <p style={{ color: "#9ca3af", fontSize: "0.875rem", marginTop: "0.5rem" }}>© 2025 UrbanClean | Contact: info@urbanclean.app</p>
      </footer>
    </div>
  );
}

export default Landing;