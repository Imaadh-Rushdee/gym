import { useState } from "react";
import { api } from "../api.js";

const GOALS = ["Build Muscle", "Lose Weight", "Improve Fitness", "Strength Training", "General Health", "Other"];

export default function TrialForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", preferred_date: "", preferred_time: "", goal: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await api.createTrial(form);
      setStatus("success");
      setForm({ name: "", phone: "", email: "", preferred_date: "", preferred_time: "", goal: "" });
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <div className="form-card">
      <form onSubmit={submit}>
        <div className="form-row">
          <div className="field">
            <label>Full Name</label>
            <input required value={form.name} onChange={(e) => update("name", e.target.value)} />
          </div>
          <div className="field">
            <label>Phone Number</label>
            <input required value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label>Email (optional)</label>
          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
        </div>
        <div className="form-row">
          <div className="field">
            <label>Preferred Date</label>
            <input type="date" required value={form.preferred_date} onChange={(e) => update("preferred_date", e.target.value)} />
          </div>
          <div className="field">
            <label>Preferred Time</label>
            <input type="time" required value={form.preferred_time} onChange={(e) => update("preferred_time", e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label>Primary Goal</label>
          <select required value={form.goal} onChange={(e) => update("goal", e.target.value)}>
            <option value="">Select a goal</option>
            {GOALS.map((g) => <option key={g}>{g}</option>)}
          </select>
        </div>
        <button className="btn btn-primary" style={{ width: "100%" }} disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "REQUEST TRIAL"}
        </button>
      </form>

      {status === "success" && (
        <div className="msg-success">
          <strong>You're one step closer.</strong>
          <p style={{ color: "var(--text-dim)", fontSize: 14, marginTop: 4 }}>
            Our team will contact you to confirm your trial session.
          </p>
        </div>
      )}
      {status === "error" && <div className="msg-error">{error}</div>}
    </div>
  );
}
