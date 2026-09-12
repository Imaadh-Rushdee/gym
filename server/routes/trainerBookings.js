import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../auth.js";

const router = Router();

// Public: request a trainer session
router.post("/", (req, res) => {
  const { member_name, member_phone, trainer, preferred_date, preferred_time, goal, notes } = req.body;
  if (!member_name || !member_phone) return res.status(400).json({ error: "Name and phone are required" });

  const stmt = db.prepare(`
    INSERT INTO trainer_bookings (member_name, member_phone, trainer, preferred_date, preferred_time, goal, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(member_name, member_phone, trainer || null, preferred_date || null, preferred_time || null, goal || null, notes || null);
  res.status(201).json({ id: info.lastInsertRowid });
});

// Admin: list + update
router.get("/", requireAuth, (req, res) => {
  res.json(db.prepare("SELECT * FROM trainer_bookings ORDER BY created_at DESC").all());
});

router.patch("/:id", requireAuth, (req, res) => {
  const { status } = req.body;
  const allowed = ["Requested", "Confirmed", "Completed", "Cancelled"];
  if (!allowed.includes(status)) return res.status(400).json({ error: "Invalid status" });
  db.prepare("UPDATE trainer_bookings SET status = ? WHERE id = ?").run(status, req.params.id);
  res.json({ ok: true });
});

export default router;
