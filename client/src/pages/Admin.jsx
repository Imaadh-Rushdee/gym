import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import { api } from "../api.js";

const LEAD_STATUSES = ["New", "Contacted", "Trial Booked", "Joined", "Not Interested"];
const TRIAL_STATUSES = ["Requested", "Confirmed", "Completed", "Cancelled"];

export default function Admin() {
  const [tab, setTab] = useState("overview");
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("core2_token");
    navigate("/login");
  }

  return (
    <div>
      <Nav />
      <div className="wrap" style={{ padding: "48px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <h1 style={{ fontSize: 34 }}>Admin Dashboard</h1>
          <div style={{ display: "flex", gap: 12 }}>
            <Link to="/check-in" className="btn btn-outline btn-sm">Check-In Station</Link>
            <button className="btn btn-outline btn-sm" onClick={logout}>Log Out</button>
          </div>
        </div>

        <div className="tabs">
          {["overview", "leads", "trials", "members"].map((t) => (
            <div key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
              {t[0].toUpperCase() + t.slice(1)}
            </div>
          ))}
        </div>

        {tab === "overview" && <Overview />}
        {tab === "leads" && <Leads />}
        {tab === "trials" && <Trials />}
        {tab === "members" && <Members />}
      </div>
    </div>
  );
}

function Overview() {
  const [stats, setStats] = useState(null);
  const [members, setMembers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [trials, setTrials] = useState([]);

  useEffect(() => {
    api.attendanceStats().then(setStats).catch(() => {});
    api.listMembers().then(setMembers).catch(() => {});
    api.listLeads().then(setLeads).catch(() => {});
    api.listTrials().then(setTrials).catch(() => {});
  }, []);

  const activeMembers = members.filter((m) => m.status === "Active").length;
  const expiredMembers = members.filter((m) => m.status === "Expired").length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const trialsRequested = trials.filter((t) => t.status === "Requested").length;

  return (
    <div className="stat-grid">
      <div className="stat-card"><div className="num">{members.length}</div><div className="label">Total Members</div></div>
      <div className="stat-card"><div className="num">{activeMembers}</div><div className="label">Active Members</div></div>
      <div className="stat-card"><div className="num">{expiredMembers}</div><div className="label">Expired Memberships</div></div>
      <div className="stat-card"><div className="num">{newLeads}</div><div className="label">New Leads</div></div>
      <div className="stat-card"><div className="num">{stats?.today ?? "-"}</div><div className="label">Today's Check-ins</div></div>
      <div className="stat-card"><div className="num">{trialsRequested}</div><div className="label">Trials Requested</div></div>
    </div>
  );
}

function Leads() {
  const [leads, setLeads] = useState([]);
  const [q, setQ] = useState("");

  const load = () => api.listLeads().then(setLeads).catch(() => {});
  useEffect(load, []);

  async function changeStatus(id, status) {
    await api.updateLead(id, status);
    load();
  }

  const filtered = leads.filter((l) => l.name.toLowerCase().includes(q.toLowerCase()) || l.phone.includes(q));

  return (
    <div className="card">
      <input placeholder="Search by name or phone..." value={q} onChange={(e) => setQ(e.target.value)} style={{ marginBottom: 16, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 14px", color: "#fff", width: "100%", maxWidth: 320 }} />
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead><tr><th>Name</th><th>Phone</th><th>Goal</th><th>Interest</th><th>Date</th><th>Status</th></tr></thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id}>
                <td>{l.name}</td><td>{l.phone}</td><td>{l.goal || "-"}</td><td>{l.membership_interest || "-"}</td>
                <td>{new Date(l.created_at).toLocaleDateString()}</td>
                <td>
                  <select className="status-select" value={l.status} onChange={(e) => changeStatus(l.id, e.target.value)}>
                    {LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={6} style={{ color: "var(--text-dim)" }}>No leads yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Trials() {
  const [trials, setTrials] = useState([]);
  const load = () => api.listTrials().then(setTrials).catch(() => {});
  useEffect(load, []);

  async function changeStatus(id, status) {
    await api.updateTrial(id, status);
    load();
  }

  return (
    <div className="card">
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead><tr><th>Name</th><th>Phone</th><th>Date</th><th>Time</th><th>Goal</th><th>Status</th></tr></thead>
          <tbody>
            {trials.map((t) => (
              <tr key={t.id}>
                <td>{t.name}</td><td>{t.phone}</td><td>{t.preferred_date}</td><td>{t.preferred_time}</td><td>{t.goal || "-"}</td>
                <td>
                  <select className="status-select" value={t.status} onChange={(e) => changeStatus(t.id, e.target.value)}>
                    {TRIAL_STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {trials.length === 0 && <tr><td colSpan={6} style={{ color: "var(--text-dim)" }}>No trial requests yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Members() {
  const [members, setMembers] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = () => api.listMembers().then(setMembers).catch(() => {});
  useEffect(load, []);

  async function activate(m) {
    const start = new Date();
    const months = m.membership_plan === "3 Month" ? 3 : m.membership_plan === "Long-term" ? 12 : 1;
    const expiry = new Date(start);
    expiry.setMonth(expiry.getMonth() + months);

    await api.updateMember(m.id, {
      status: "Active",
      start_date: start.toISOString().slice(0, 10),
      expiry_date: expiry.toISOString().slice(0, 10),
    });
    load();
  }

  return (
    <div className="card">
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead><tr><th>Member ID</th><th>Name</th><th>Phone</th><th>Plan</th><th>Status</th><th>Expiry</th><th>Actions</th></tr></thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id}>
                <td>{m.member_code}</td><td>{m.name}</td><td>{m.phone}</td><td>{m.membership_plan}</td>
                <td><span className={`badge ${m.status === "Active" ? "badge-active" : m.status === "Expired" ? "badge-expired" : "badge-pending"}`}>{m.status}</span></td>
                <td>{m.expiry_date || "-"}</td>
                <td>
                  {m.status !== "Active" && <button className="btn btn-outline btn-sm" onClick={() => activate(m)}>Activate</button>}
                </td>
              </tr>
            ))}
            {members.length === 0 && <tr><td colSpan={7} style={{ color: "var(--text-dim)" }}>No members yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
