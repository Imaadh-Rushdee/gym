import "dotenv/config";
import bcrypt from "bcryptjs";
import { db } from "./db.js";

const email = process.env.ADMIN_EMAIL || "admin@thecore2.lk";
const password = process.env.ADMIN_PASSWORD || "changeme123";

const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);

if (existing) {
  console.log(`Admin user already exists: ${email}`);
} else {
  const hash = bcrypt.hashSync(password, 10);
  db.prepare("INSERT INTO users (email, password_hash, role) VALUES (?, ?, 'admin')").run(email, hash);
  console.log(`Admin user created: ${email} / ${password}`);
  console.log("Change this password after first login.");
}
