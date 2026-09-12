import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../auth.js";

const router = Router();

// Public: request a trial
router.post("/", (req, res) => {
  const { name, phone, email, preferred_date, preferred_time, goal } = req.body;
  if (!name || !phone || !preferred_date || !preferred_time) {
    return res.status(400).json({ error: "Name, phone, date and time are required" });
  }

  const stmt = db.prepare(`
    INSERT INTO trial_bookings (name, phone, email, preferred_date, preferred_time, goal)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(name, phone, email || null, preferred_date, preferred_time, goal || null);

  // Also drop it into the leads table so it shows up in one pipeline
  db.prepare(`
    INSERT INTO leads (name, phone, email, goal, membership_interest, source, status)
    VALUES (?, ?, ?, ?, 'Not Sure', 'trial_form', 'Trial Booked')
  `).run(name, phone, email || null, goal || null);

  res.status(201).json({ id: info.lastInsertRowid });
});

// Admin: list trial bookings
router.get("/", requireAuth, (req, res) => {
  const rows = db.prepare("SELECT * FROM trial_bookings ORDER BY created_at DESC").all();
  res.json(rows);
});

// Admin: update trial status
router.patch("/:id", requireAuth, (req, res) => {
  const { status } = req.body;
  const allowed = ["Requested", "Confirmed", "Completed", "Cancelled"];
  if (!allowed.includes(status)) return res.status(400).json({ error: "Invalid status" });

  db.prepare("UPDATE trial_bookings SET status = ? WHERE id = ?").run(status, req.params.id);
  res.json({ ok: true });
});

export default router;
