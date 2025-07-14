import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReportForm from "./pages/Citizen/ReportForm";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Landing from "./pages/Landing"; // 👈 Add this
import Register from "./pages/Citizen/Register";
import Login from "./pages/Citizen/Login";



function AppRoutes() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/citizen/report" element={<ReportForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
