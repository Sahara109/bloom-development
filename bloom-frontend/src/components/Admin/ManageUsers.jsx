import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const USERS_PER_PAGE = 5;

const ManageUsers = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/admin/users", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users.");
        setLoading(false);
      });
  }, [auth]);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5001/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const updated = users.filter((user) => user._id !== id);
      setUsers(updated);
      handleSearch(searchTerm, updated);
    } catch {
      alert("Error deleting user!");
    }
  };

  const makeAdmin = async (id) => {
    try {
      await axios.put(
        `http://localhost:5001/api/admin/users/${id}`,
        { role: "admin" },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const updated = users.map((user) =>
        user._id === id ? { ...user, role: "admin" } : user
      );
      setUsers(updated);
      handleSearch(searchTerm, updated);
    } catch {
      alert("Error making user admin!");
    }
  };

  const handleSearch = (term, list = users) => {
    const lower = term.toLowerCase();
    const filtered = list.filter(
      (user) =>
        user.name.toLowerCase().includes(lower) ||
        user.email.toLowerCase().includes(lower)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  if (loading) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🌸 Manage Users</h2>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
        style={styles.searchInput}
      />

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr
                key={user._id}
                style={{
                  ...styles.tableRow,
                  animation: `fadeIn 0.4s ease ${index * 0.05}s both`,
                }}
              >
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.role}</td>
                <td style={styles.td}>
                  {user.role !== "admin" && (
                    <button
                      style={{ ...styles.button, ...styles.makeAdminButton }}
                      onClick={() => makeAdmin(user._id)}
                    >
                      Make Admin
                    </button>
                  )}
                  <button
                    style={{ ...styles.button, ...styles.deleteButton }}
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        {Array.from({
          length: Math.ceil(filteredUsers.length / USERS_PER_PAGE),
        }).map((_, i) => (
          <button
            key={i}
            onClick={() => handleChangePage(i + 1)}
            style={{
              ...styles.pageButton,
              ...(currentPage === i + 1 ? styles.activePageButton : {}),
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Inline animation keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};
