// src/components/Admin/AdminLayout.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear auth data here if you have (e.g., localStorage.clear())
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: "220px",
          backgroundColor: "#2c3e50",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2>Admin Panel</h2>
        <Link to="/admin/dashboard" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </Link>
        <Link to="/admin/users" style={{ color: "white", textDecoration: "none" }}>
          Manage Users
        </Link>
        <Link to="/admin/articles" style={{ color: "white", textDecoration: "none" }}>
          Manage Articles
        </Link>
        <Link to="/admin/videos" style={{ color: "white", textDecoration: "none" }}>
          Manage Videos
        </Link>
        <Link to="/admin/exercises" style={{ color: "white", textDecoration: "none" }}>
          Manage Exercises
        </Link>
        <Link to="/admin/community-stories" style={{ color: "white", textDecoration: "none" }}>
          Community Stories
        </Link>
        <button
          onClick={logout}
          style={{
            marginTop: "auto",
            backgroundColor: "#e74c3c",
            border: "none",
            color: "white",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </aside>

      <main style={{ flexGrow: 1, padding: "20px", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
