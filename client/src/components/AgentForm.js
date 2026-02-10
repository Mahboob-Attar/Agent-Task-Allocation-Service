import { useState } from "react";
import API from "../api/axios";

function AgentForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/agents", form);
      alert("Agent created successfully");
      setForm({ name: "", email: "", mobile: "", password: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error creating agent");
    }
  };

  return (
    <div className="card">
      <h3>Create Agent</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile (+91...)" value={form.mobile} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Add Agent</button>
      </form>
    </div>
  );
}

export default AgentForm;
