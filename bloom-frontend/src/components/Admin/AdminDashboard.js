import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Import auth context

const AdminDashboard = () => {
  const { auth } = useAuth(); // Get authenticated user
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!auth?.user || auth.user.role !== "admin") {
      navigate("/"); // Redirect non-admins to home
      return;
    }

    axios
      .get("/api/admin/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load users.");
        setLoading(false);
      });
  }, [auth, navigate]);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`/api/admin/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      alert("Error deleting user!");
    }
  };

  const makeAdmin = async (id) => {
    try {
      await axios.put(`/api/admin/users/${id}`, { role: "admin" });
      setUsers(users.map((user) => (user._id === id ? { ...user, role: "admin" } : user)));
    } catch (err) {
      alert("Error making user admin!");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#ddd" }}>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.role !== "admin" && (
                  <button onClick={() => makeAdmin(user._id)} style={{ marginRight: "10px" }}>
                    Make Admin
                  </button>
                )}
                <button onClick={() => deleteUser(user._id)} style={{ background: "red", color: "white" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
