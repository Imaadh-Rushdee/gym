import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import leadsRoutes from "./routes/leads.js";
import trialsRoutes from "./routes/trials.js";
import membersRoutes from "./routes/members.js";
import checkinRoutes from "./routes/checkin.js";
import trainerBookingsRoutes from "./routes/trainerBookings.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true, service: "core2-server" }));

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/trials", trialsRoutes);
app.use("/api/members", membersRoutes);
app.use("/api/checkin", checkinRoutes);
app.use("/api/trainer-bookings", trainerBookingsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Core2 server running on http://localhost:${PORT}`));
