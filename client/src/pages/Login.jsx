import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import { api } from "../api.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.login(email, password);
      localStorage.setItem("core2_token", res.token);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Nav />
      <div className="wrap" style={{ padding: "80px 24px", maxWidth: 420 }}>
        <h1 style={{ fontSize: 32, marginBottom: 24 }}>Staff Login</h1>
        <form className="form-card" style={{ maxWidth: "100%" }} onSubmit={submit}>
          <div className="field"><label>Email</label><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className="field"><label>Password</label><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          {error && <div className="msg-error">{error}</div>}
          <button className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
