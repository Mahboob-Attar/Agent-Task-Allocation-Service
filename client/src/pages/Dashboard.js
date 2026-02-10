import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AgentForm from "../components/AgentForm";
import UploadForm from "../components/UploadForm";
import AgentList from "../components/AgentList";
import TaskList from "../components/TaskList";

function Dashboard() {
  const navigate = useNavigate();

  // Protect dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>Admin Dashboard</h2>

        <button
          onClick={logout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#e53935",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Logout
        </button>
      </div>

      <hr />

      {/* Add Agent */}
      <div style={{ marginTop: "20px" }}>
        <h3>Add Agent</h3>
        <AgentForm />
      </div>

      <hr />

      {/* Upload CSV */}
      <div style={{ marginTop: "20px" }}>
        <h3>Upload CSV</h3>
        <UploadForm />
      </div>

      <hr />

      {/* Agents List */}
      <div style={{ marginTop: "20px" }}>
        <h3>Agents List</h3>
        <AgentList />
      </div>

      <hr />

      {/* Distributed Tasks */}
      <div style={{ marginTop: "20px" }}>
        <h3>Distributed Tasks</h3>
        <TaskList />
      </div>
    </div>
  );
}

export default Dashboard;
