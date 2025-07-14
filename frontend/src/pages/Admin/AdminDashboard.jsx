import { useEffect, useState } from "react";

function AdminDashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/report/all")
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);

  return (
    <div style={{ maxWidth: "1000px", margin: "2rem auto", padding: "1rem" }}>
      <h2 style={{ fontSize: "2rem", color: "#2c5282", marginBottom: "1rem" }}>
        🧹 Admin Dashboard — All Reports
      </h2>

      {reports.length === 0 ? (
        <p>No reports submitted yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#e2e8f0" }}>
              <th style={th}>Name</th>
              <th style={th}>Waste</th>
              <th style={th}>City</th>
              <th style={th}>Road</th>
              <th style={th}>Status</th>
              <th style={th}>Map</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id}>
                <td style={td}>{r.reporter_name}</td>
                <td style={td}>{r.waste_type}</td>
                <td style={td}>{r.city}</td>
                <td style={td}>{r.road}</td>
                <td style={td}>{r.status}</td>
                <td style={td}>
                  <a
                    href={`https://www.google.com/maps?q=${r.lat},${r.lng}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    📍 View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th = {
  padding: "10px",
  border: "1px solid #cbd5e0",
  textAlign: "left",
  fontWeight: "600",
};

const td = {
  padding: "10px",
  border: "1px solid #e2e8f0",
};

export default AdminDashboard;
