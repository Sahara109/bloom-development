import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear auth data here e.g., localStorage.clear())
    navigate("/login");
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    transition: "background-color 0.3s ease",
    fontSize: "16px",
  };

  const linkHoverStyle = {
    backgroundColor: "#9a79ad",
  };

  const [hoveredLink, setHoveredLink] = React.useState(null);

  const navLinks = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/users", label: "Manage Users" },
    { to: "/admin/articles", label: "Manage Articles" },
    { to: "/admin/videos", label: "Manage Videos" },
    { to: "/admin/exercises", label: "Manage Exercises" },
    { to: "/admin/community-stories", label: "Community Stories" },
  ];

  return (
    <>
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "240px",
          height: "100vh",
          backgroundColor: "#604063",
          color: "white",
          padding: "30px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
          zIndex: 1000,
        }}
      >
        <div>
          <h2 style={{ marginBottom: "30px", fontSize: "22px" }}>Admin Panel</h2>
          <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                style={{
                  ...linkStyle,
                  ...(hoveredLink === index ? linkHoverStyle : {}),
                }}
                onMouseEnter={() => setHoveredLink(index)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <button
          onClick={logout}
          style={{
            backgroundColor: "#e74c3c",
            border: "none",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#c0392b")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#e74c3c")}
        >
          Logout
        </button>
      </aside>

      <main
        style={{
          marginLeft: "240px", // Adjusted to new sidebar width
          padding: "30px",
          minHeight: "100vh",
          backgroundColor: "#f4f6f9",
          boxSizing: "border-box",
        }}
      >
        {children}
      </main>
    </>
  );
};

export default AdminLayout;
