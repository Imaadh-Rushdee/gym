import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../auth.js";

const router = Router();

// Staff: look up a member by code (from QR scan or manual entry) and record a check-in
router.post("/", requireAuth, (req, res) => {
  const { member_code } = req.body;
  if (!member_code) return res.status(400).json({ error: "member_code is required" });

  const member = db.prepare("SELECT * FROM members WHERE member_code = ?").get(member_code);
  if (!member) return res.status(404).json({ error: "Member not found" });

  const isActive =
    member.status === "Active" &&
    member.expiry_date &&
    new Date(member.expiry_date) >= new Date(new Date().toDateString());

  if (isActive) {
    db.prepare("INSERT INTO attendance (member_id) VALUES (?)").run(member.id);
  }

  res.json({
    member: {
      name: member.name,
      member_code: member.member_code,
      membership_plan: member.membership_plan,
      status: member.status,
      expiry_date: member.expiry_date,
    },
    checkin_result: isActive ? "SUCCESS" : "EXPIRED_OR_INACTIVE",
  });
});

// Admin: attendance stats
router.get("/stats", requireAuth, (req, res) => {
  const today = db.prepare(`
    SELECT COUNT(*) AS count FROM attendance WHERE date(checked_in_at) = date('now')
  `).get().count;

  const week = db.prepare(`
    SELECT COUNT(*) AS count FROM attendance WHERE date(checked_in_at) >= date('now', '-7 days')
  `).get().count;

  const month = db.prepare(`
    SELECT COUNT(*) AS count FROM attendance WHERE date(checked_in_at) >= date('now', '-30 days')
  `).get().count;

  res.json({ today, week, month });
});

export default router;
