import { useEffect, useState } from "react";
import API from "../api/axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/upload/tasks").then((res) => setTasks(res.data.data));
  }, []);

  return (
    <div className="card">
      <h3>Distributed Tasks</h3>
      <table width="100%">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Phone</th>
            <th>Agent</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.firstName}</td>
              <td>{task.phone}</td>
              <td>{task.agent?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
