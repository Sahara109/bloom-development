import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [growthData, setGrowthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!auth?.user || auth.user.role !== "admin") {
      navigate("/");
      return;
    }
  
    const fetchDashboardData = async () => {
      try {
        const token = auth.token;  // get the JWT token from auth context
  
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  // send token in Authorization header
        };
  
        const [statsRes, activitiesRes, growthRes] = await Promise.all([
          fetch("/api/admin/stats", { headers }),
          fetch("/api/admin/activities", { headers }),
          fetch("/api/admin/growth", { headers }),
        ]);
  
        if (!statsRes.ok || !activitiesRes.ok || !growthRes.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const statsData = await statsRes.json();
        const activitiesData = await activitiesRes.json();
        const growthData = await growthRes.json();
  
        setStats(statsData);
        setActivities(activitiesData);
        setGrowthData(growthData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDashboardData();
  }, [auth, navigate]);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  // Prepare chart data
  const chartData = {
    labels: growthData?.dates || [],
    datasets: [
      {
        label: "User Registrations",
        data: growthData?.counts || [],
        fill: false,
        backgroundColor: "#4caf50",
        borderColor: "#388e3c",
      },
    ],
  };

  return (
    <AdminLayout>
      <div style={{ padding: "20px" }}>
      <h2 style={{ color: 'black' }}>Admin Dashboard 👩🏻‍🔬</h2>


        {/* Stats */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
          <div style={statBoxStyle}>
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
          <div style={statBoxStyle}>
            <h3>{stats.admins}</h3>
            <p>Admins</p>
          </div>
          <div style={statBoxStyle}>
            <h3>{stats.activeUsers}</h3>
            <p>Active Users (7d)</p>
          </div>
          <div style={statBoxStyle}>
            <h3>{stats.newUsers}</h3>
            <p>New Users (7d)</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: "30px" }}>
        <button
        onClick={() => navigate("/admin/users")}
        style={buttonStyle}
      >
  Go to Manage Users
</button>

        </div>

        {/* Recent Activities */}
        <div style={{ marginBottom: "30px" }}>
          <h3>Recent Activity</h3>
          {activities.length === 0 ? (
            <p>No recent activity</p>
          ) : (
            <ul>
              {activities.map((act) => (
                <li key={act._id}>
                  {act.description} — {new Date(act.date).toLocaleString()}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* User Growth Chart */}
        <div>
          <h3>User Growth (Last 7 Days)</h3>
          <Line data={chartData} />
        </div>
      </div>
    </AdminLayout>
  );
};

const statBoxStyle = {
  flex: 1,
  background: "#f0f0f0",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  boxShadow: "0 0 8px rgba(0,0,0,0.1)",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#4caf50",
  border: "none",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
};

export default AdminDashboard;