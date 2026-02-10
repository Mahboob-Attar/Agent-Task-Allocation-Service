import { useState } from "react";
import API from "../api/axios";

function AgentForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Frontend country code validation
    const phoneRegex = /^\+\d{8,15}$/;
    if (!phoneRegex.test(form.mobile)) {
      setErrorMsg("Mobile number must include country code (e.g. +91XXXXXXXXXX)");
      return;
    }

    try {
      setLoading(true);
      await API.post("/agents", form);
      setSuccessMsg("Agent created successfully");
      setForm({ name: "", email: "", mobile: "", password: "" });
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Error creating agent");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ marginBottom: "20px" }}>
      <h3>Create Agent</h3>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="mobile"
          placeholder="Mobile (e.g. +91XXXXXXXXXX)"
          value={form.mobile}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Add Agent"}
        </button>
      </form>
    </div>
  );
}

export default AgentForm;
