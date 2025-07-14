// src/pages/Citizen/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔄 Add this


 // 🔄 Add this

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registration successful!");
        navigate("/");

      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Server error.");
    }
  };

  const containerStyle = {
    maxWidth: "500px",
    margin: "60px auto",
    padding: "30px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Segoe UI, sans-serif",
  };

  const labelStyle = {
    fontWeight: "bold",
    marginBottom: "8px",
    display: "block",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    background: "#2563eb",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#1e3a8a" }}>
        📝 Citizen Registration
      </h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Name</label>
        <input
          type="text"
          name="name"
          required
          placeholder="Full Name"
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Email</label>
        <input
          type="email"
          name="email"
          required
          placeholder="example@email.com"
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Password</label>
        <input
          type="password"
          name="password"
          required
          placeholder="********"
          onChange={handleChange}
          style={inputStyle}
        />

        <div style={{ textAlign: "center" }}>
          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
