import { useEffect, useState } from "react";
import API from "../api/axios";

function AgentList() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    API.get("/agents").then((res) => setAgents(res.data));
  }, []);

  return (
    <div className="card">
      <h3>Agents</h3>
      <ul>
        {agents.map((agent) => (
          <li key={agent._id}>
            {agent.name} — {agent.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AgentList;
