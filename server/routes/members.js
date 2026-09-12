import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../auth.js";

const router = Router();

function generateMemberCode() {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `TC2-${rand}`;
}

// Public: member self-registration (creates a Pending member application)
router.post("/register", (req, res) => {
  const {
    name, birthday, gender, phone, email, address,
    goal, membership_plan,
    emergency_contact_name, emergency_contact_phone,
  } = req.body;

  if (!name || !phone) return res.status(400).json({ error: "Name and phone are required" });

  const code = generateMemberCode();
  const stmt = db.prepare(`
    INSERT INTO members (
      member_code, name, phone, email, birthday, gender, address, goal,
      membership_plan, emergency_contact_name, emergency_contact_phone, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
  `);
  const info = stmt.run(
    code, name, phone, email || null, birthday || null, gender || null, address || null,
    goal || null, membership_plan || "Not Sure", emergency_contact_name || null, emergency_contact_phone || null
  );

  res.status(201).json({ id: info.lastInsertRowid, member_code: code, status: "Pending" });
});

// Admin: list members
router.get("/", requireAuth, (req, res) => {
  const rows = db.prepare("SELECT * FROM members ORDER BY created_at DESC").all();
  res.json(rows);
});

// Admin: get single member (also used by check-in lookup, requires auth)
router.get("/:code", requireAuth, (req, res) => {
  const member = db.prepare("SELECT * FROM members WHERE member_code = ?").get(req.params.code);
  if (!member) return res.status(404).json({ error: "Member not found" });
  res.json(member);
});

// Admin: activate/edit a member (set plan, dates, status)
router.patch("/:id", requireAuth, (req, res) => {
  const { status, membership_plan, start_date, expiry_date } = req.body;
  const fields = [];
  const values = [];

  if (status) { fields.push("status = ?"); values.push(status); }
  if (membership_plan) { fields.push("membership_plan = ?"); values.push(membership_plan); }
  if (start_date) { fields.push("start_date = ?"); values.push(start_date); }
  if (expiry_date) { fields.push("expiry_date = ?"); values.push(expiry_date); }

  if (fields.length === 0) return res.status(400).json({ error: "Nothing to update" });

  values.push(req.params.id);
  db.prepare(`UPDATE members SET ${fields.join(", ")} WHERE id = ?`).run(...values);
  res.json({ ok: true });
});

// Admin: members expiring soon (7/14/30 days)
router.get("/reports/expiring", requireAuth, (req, res) => {
  const days = parseInt(req.query.days || "30", 10);
  const rows = db.prepare(`
    SELECT * FROM members
    WHERE status = 'Active'
      AND expiry_date IS NOT NULL
      AND date(expiry_date) <= date('now', '+' || ? || ' days')
    ORDER BY expiry_date ASC
  `).all(days);
  res.json(rows);
});

export default router;
