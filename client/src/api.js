const BASE = "/api";

function authHeaders() {
  const token = localStorage.getItem("core2_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(auth ? authHeaders() : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const api = {
  login: (email, password) => request("/auth/login", { method: "POST", body: { email, password } }),

  createTrial: (payload) => request("/trials", { method: "POST", body: payload }),
  listTrials: () => request("/trials", { auth: true }),
  updateTrial: (id, status) => request(`/trials/${id}`, { method: "PATCH", body: { status }, auth: true }),

  createLead: (payload) => request("/leads", { method: "POST", body: payload }),
  listLeads: () => request("/leads", { auth: true }),
  updateLead: (id, status) => request(`/leads/${id}`, { method: "PATCH", body: { status }, auth: true }),

  registerMember: (payload) => request("/members/register", { method: "POST", body: payload }),
  listMembers: () => request("/members", { auth: true }),
  updateMember: (id, payload) => request(`/members/${id}`, { method: "PATCH", body: payload, auth: true }),

  checkin: (member_code) => request("/checkin", { method: "POST", body: { member_code }, auth: true }),
  attendanceStats: () => request("/checkin/stats", { auth: true }),
};
