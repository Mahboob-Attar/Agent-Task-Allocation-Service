const distributeTasks = (rows, agents) => {
  if (!agents || agents.length === 0) {
    throw new Error("No agents available for distribution");
  }

  let agentIndex = 0;
  const tasks = [];

  for (let row of rows) {
    tasks.push({
      firstName: row.FirstName,
      phone: row.Phone,
      notes: row.Notes || "",
      agent: agents[agentIndex]._id,
    });

    agentIndex = (agentIndex + 1) % agents.length;
  }

  return tasks;
};

module.exports = distributeTasks;
