import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import UserDashboard from "./pages/UserDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminPanel from "./pages/AdminPanel";
import AdminWorkplaces from "./pages/AdminWorkplaces";
import AdminSessions from "./pages/AdminSessions";

const Guard = ({ children, role }) => {
  const u = JSON.parse(localStorage.getItem("user") || "null");
  if (!u) return <Navigate to="/" />;
  if (role && u.role !== role) return <Navigate to="/" />;
  return children;
};

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" toastOptions={{ style: { background:"#0f1629", color:"#e2e8f0", border:"1px solid #1e2d4a" } }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user" element={<Guard role="USER"><UserDashboard /></Guard>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin" element={<Guard role="ADMIN"><AdminPanel /></Guard>} />
        <Route path="/admin/workplaces" element={<Guard role="ADMIN"><AdminWorkplaces /></Guard>} />
        <Route path="/admin/sessions" element={<Guard role="ADMIN"><AdminSessions /></Guard>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
