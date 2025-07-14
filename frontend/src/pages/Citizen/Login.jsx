import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        alert(`Welcome ${data.name}!`);
        if (data.role === "admin") {
        localStorage.setItem("user",data.role); // where data includes id, role, name
        navigate("/");
        } else {
          navigate("/");
        }
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error");
    }
  };

  const styles = {
    container: {
      maxWidth: "500px",
      margin: "60px auto",
      padding: "30px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      fontFamily: "Segoe UI, sans-serif",
    },
    label: {
      fontWeight: "bold",
      marginBottom: "8px",
      display: "block",
    },
    input: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      marginBottom: "20px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    button: {
      background: "#22c55e",
      color: "#fff",
      padding: "10px 20px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#065f46" }}>
        🔐 Login
      </h2>
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          required
          onChange={handleChange}
          style={styles.input}
          placeholder="you@example.com"
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          required
          onChange={handleChange}
          style={styles.input}
          placeholder="********"
        />

        <div style={{ textAlign: "center" }}>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
