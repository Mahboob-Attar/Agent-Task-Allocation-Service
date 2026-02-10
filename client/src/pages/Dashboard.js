import AgentForm from "../components/AgentForm";
import UploadForm from "../components/UploadForm";
import AgentList from "../components/AgentList";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <AgentForm />
      <UploadForm />
      <AgentList />
      <TaskList />
    </div>
  );
}

export default Dashboard;
