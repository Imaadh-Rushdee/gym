import { useState } from "react";
import Nav from "../components/Nav.jsx";
import { api } from "../api.js";

export default function CheckIn() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await api.checkin(code.trim());
      setResult(res);
      setCode("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const success = result?.checkin_result === "SUCCESS";

  return (
    <div>
      <Nav />
      <div className="wrap" style={{ padding: "60px 24px", maxWidth: 480 }}>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>Member Check-In</h1>
        <p style={{ color: "var(--text-dim)", marginBottom: 28 }}>
          Enter the member ID from their digital card or QR code. (A camera QR scanner can be added later with a library like <code>html5-qrcode</code> — this manual version keeps the stack simple for now.)
        </p>

        <form className="form-card" style={{ maxWidth: "100%" }} onSubmit={submit}>
          <div className="field">
            <label>Member ID</label>
            <input required placeholder="e.g. TC2-AB12C" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} />
          </div>
          {error && <div className="msg-error">{error}</div>}
          <button className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
            {loading ? "Checking..." : "Check In"}
          </button>
        </form>

        {result && (
          <div className={`checkin-result ${success ? "success" : "expired"}`}>
            <h2 style={{ fontSize: 24, marginBottom: 8 }}>{success ? "CHECK-IN SUCCESSFUL" : "MEMBERSHIP EXPIRED"}</h2>
            <p style={{ fontWeight: 700 }}>{result.member.name}</p>
            <p style={{ color: "var(--text-dim)", fontSize: 14 }}>{result.member.member_code} · {result.member.membership_plan}</p>
            <p style={{ color: "var(--text-dim)", fontSize: 14 }}>Expiry: {result.member.expiry_date || "Not set"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
