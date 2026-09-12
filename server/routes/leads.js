import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../auth.js";

const router = Router();

// Public: create a lead (e.g. from a contact/enquiry form)
router.post("/", (req, res) => {
  const { name, phone, email, goal, membership_interest, source } = req.body;
  if (!name || !phone) return res.status(400).json({ error: "Name and phone are required" });

  const stmt = db.prepare(`
    INSERT INTO leads (name, phone, email, goal, membership_interest, source)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(name, phone, email || null, goal || null, membership_interest || null, source || "website");
  res.status(201).json({ id: info.lastInsertRowid });
});

// Admin: list leads
router.get("/", requireAuth, (req, res) => {
  const rows = db.prepare("SELECT * FROM leads ORDER BY created_at DESC").all();
  res.json(rows);
});

// Admin: update lead status
router.patch("/:id", requireAuth, (req, res) => {
  const { status } = req.body;
  const allowed = ["New", "Contacted", "Trial Booked", "Joined", "Not Interested"];
  if (!allowed.includes(status)) return res.status(400).json({ error: "Invalid status" });

  db.prepare("UPDATE leads SET status = ? WHERE id = ?").run(status, req.params.id);
  res.json({ ok: true });
});

export default router;
