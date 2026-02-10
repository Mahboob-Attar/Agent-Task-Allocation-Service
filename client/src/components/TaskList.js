import { useEffect, useState } from "react";
import API from "../api/axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await API.get("/upload/tasks");
        setTasks(data.data);
      } catch (error) {
        setErrorMsg("Failed to load distributed tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="card">
      <h3>Distributed Tasks</h3>

      {loading && <p>Loading tasks...</p>}
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      {!loading && tasks.length === 0 && (
        <p>No tasks uploaded yet.</p>
      )}

      {!loading && tasks.length > 0 && (
        <table width="100%" border="1" cellPadding="8">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Phone</th>
              <th>Notes</th>
              <th>Agent</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.firstName}</td>
                <td>{task.phone}</td>
                <td>{task.notes || "-"}</td>
                <td>{task.agent?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskList;
