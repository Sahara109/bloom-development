import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear auth data here if you have (e.g., localStorage.clear())
    navigate("/login");
  };

  return (
    <>
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "220px",
          height: "100vh",
          backgroundColor: "#2c3e50",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          boxSizing: "border-box",
          overflowY: "auto",
          zIndex: 1000,
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

      <main
        style={{
          marginLeft: "220px", // push main content right to avoid overlap
          padding: "20px",
          minHeight: "100vh",
          overflowY: "auto",
          boxSizing: "border-box",
          backgroundColor: "#f4f6f9",
        }}
      >
        {children}
      </main>
    </>
  );
};

export default AdminLayout;
