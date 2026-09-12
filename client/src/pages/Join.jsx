import { useState } from "react";
import Nav from "../components/Nav.jsx";
import { api } from "../api.js";

const GOALS = ["Lose weight", "Build muscle", "Improve fitness", "Increase strength", "General health", "Other"];
const PLANS = ["Monthly", "3 Month", "Long-term", "Not Sure"];

const empty = {
  name: "", birthday: "", gender: "", phone: "", email: "", address: "",
  goal: "", membership_plan: "", emergency_contact_name: "", emergency_contact_phone: "",
  agree: false,
};

export default function Join() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const next = () => setStep((s) => Math.min(s + 1, 5));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  async function submit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await api.registerMember(form);
      setResult(res);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  if (status === "success" && result) {
    return (
      <div>
        <Nav />
        <div className="wrap" style={{ padding: "80px 24px", maxWidth: 560 }}>
          <h1 style={{ fontSize: 36, marginBottom: 16 }}>Request Sent</h1>
          <div className="card">
            <p style={{ color: "var(--text-dim)", marginBottom: 12 }}>
              Thanks, {form.name}. Your membership request has been received. Your membership will be activated
              once our staff confirm it in person or by phone.
            </p>
            <p><strong>Your Member ID:</strong> {result.member_code}</p>
            <p style={{ color: "var(--text-dim)", fontSize: 13, marginTop: 12 }}>Keep this ID — it will be used for your digital member card and gym check-in.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="wrap" style={{ padding: "60px 24px", maxWidth: 640 }}>
        <h1 style={{ fontSize: 36, marginBottom: 8 }}>Membership Registration</h1>
        <p style={{ color: "var(--text-dim)", marginBottom: 32 }}>Step {step} of 5</p>

        <form className="form-card" style={{ maxWidth: "100%" }} onSubmit={step === 5 ? submit : (e) => { e.preventDefault(); next(); }}>
          {step === 1 && (
            <>
              <h3 style={{ fontFamily: "Inter", textTransform: "none", marginBottom: 18 }}>Personal Details</h3>
              <div className="field"><label>Full Name</label><input required value={form.name} onChange={(e) => update("name", e.target.value)} /></div>
              <div className="form-row">
                <div className="field"><label>Birthday</label><input type="date" value={form.birthday} onChange={(e) => update("birthday", e.target.value)} /></div>
                <div className="field"><label>Gender (optional)</label>
                  <select value={form.gender} onChange={(e) => update("gender", e.target.value)}>
                    <option value="">Prefer not to say</option>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="field"><label>Phone</label><input required value={form.phone} onChange={(e) => update("phone", e.target.value)} /></div>
                <div className="field"><label>Email</label><input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} /></div>
              </div>
              <div className="field"><label>Address (optional)</label><input value={form.address} onChange={(e) => update("address", e.target.value)} /></div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 style={{ fontFamily: "Inter", textTransform: "none", marginBottom: 18 }}>Fitness Goals</h3>
              <div className="field">
                <label>Primary goal</label>
                <select required value={form.goal} onChange={(e) => update("goal", e.target.value)}>
                  <option value="">Select a goal</option>
                  {GOALS.map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3 style={{ fontFamily: "Inter", textTransform: "none", marginBottom: 18 }}>Membership Interest</h3>
              <div className="field">
                <label>Which plan interests you?</label>
                <select required value={form.membership_plan} onChange={(e) => update("membership_plan", e.target.value)}>
                  <option value="">Select a plan</option>
                  {PLANS.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h3 style={{ fontFamily: "Inter", textTransform: "none", marginBottom: 18 }}>Emergency Contact</h3>
              <div className="field"><label>Name</label><input required value={form.emergency_contact_name} onChange={(e) => update("emergency_contact_name", e.target.value)} /></div>
              <div className="field"><label>Phone</label><input required value={form.emergency_contact_phone} onChange={(e) => update("emergency_contact_phone", e.target.value)} /></div>
            </>
          )}

          {step === 5 && (
            <>
              <h3 style={{ fontFamily: "Inter", textTransform: "none", marginBottom: 18 }}>Confirm & Submit</h3>
              <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "var(--text-dim)" }}>
                <input type="checkbox" required checked={form.agree} onChange={(e) => update("agree", e.target.checked)} style={{ width: "auto", marginTop: 3 }} />
                I confirm the details above are accurate and agree to be contacted by The Core 2.0 regarding my membership.
              </label>
            </>
          )}

          {status === "error" && <div className="msg-error">{error}</div>}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
            {step > 1 ? <button type="button" className="btn btn-outline" onClick={back}>Back</button> : <span />}
            <button className="btn btn-primary" disabled={status === "loading"}>
              {step < 5 ? "Continue" : status === "loading" ? "Sending..." : "SEND MEMBERSHIP REQUEST"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
