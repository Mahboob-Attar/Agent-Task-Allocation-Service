import { useEffect, useState } from "react";
import API from "../api/axios";

function AgentList() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const { data } = await API.get("/agents");

        // Support both array and object format
        if (Array.isArray(data)) {
          setAgents(data);
        } else if (Array.isArray(data.agents)) {
          setAgents(data.agents);
        } else {
          setAgents([]);
        }
      } catch (error) {
        setAgents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="card" style={{ marginBottom: "20px" }}>
      <h3>Agents</h3>

      {loading && <p>Loading agents...</p>}

      {!loading && agents.length === 0 && (
        <p style={{ color: "#555" }}>No agents created yet.</p>
      )}

      {!loading && agents.length > 0 && (
        <ul>
          {agents.map((agent) => (
            <li key={agent._id}>
              <strong>{agent.name}</strong> — {agent.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AgentList;
