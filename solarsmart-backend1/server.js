// =======================
//  SOLARSMART BACKEND - FINAL VERSION
// =======================

import express from "express";
import cors from "cors";
import pg from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// -----------------------
// Middleware
// -----------------------
app.use(cors());
app.use(express.json());

// -----------------------
// PostgreSQL
// -----------------------
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.SSL === "true" ? { rejectUnauthorized: false } : false,
});

pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ Database connection error:", err));

const SECRET = "solar_secret_key";

// -----------------------
// Create Tables
// -----------------------
(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(200),
      gender VARCHAR(10),
      role VARCHAR(20) DEFAULT 'user'
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS login_logs (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      ip_address VARCHAR(50),
      user_agent TEXT
    );
  `);

  console.log("✅ Tables ready");
})();

// -----------------------
// Test Route
// -----------------------
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend OK ✔" });
});

// -----------------------
// Register
// -----------------------
app.post("/api/register", async (req, res) => {
  const { name, email, password, gender } = req.body;

  if (!name || !email || !password || !gender)
    return res.status(400).json({ error: "All fields required" });

  try {
    const exists = await pool.query(
      "SELECT 1 FROM users WHERE email=$1",
      [email]
    );

    if (exists.rows.length > 0)
      return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name,email,password,gender)
       VALUES ($1,$2,$3,$4)
       RETURNING id,name,email,gender,role`,
      [name, email, hashed, gender]
    );

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// -----------------------
// Login + Save login_logs
// -----------------------
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0)
      return res.status(401).json({ error: "User not found" });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(401).json({ error: "Incorrect password" });

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      null;

    const ua = req.headers["user-agent"] || null;

    await pool.query(
      "INSERT INTO login_logs (user_id, ip_address, user_agent) VALUES ($1,$2,$3)",
      [user.id, ip, ua]
    );

    const lastLoginRes = await pool.query(
      `SELECT login_time 
       FROM login_logs
       WHERE user_id=$1
       ORDER BY id DESC
       LIMIT 1 OFFSET 1`,
      [user.id]
    );

    const last_login = lastLoginRes.rows[0]?.login_time || null;

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET,
      { expiresIn: "3h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        role: user.role,
        last_login,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// -----------------------
// Get Users
// -----------------------
app.get("/api/users", async (req, res) => {
  try {
    const users = await pool.query(`
      SELECT 
        u.id, u.name, u.email, u.gender, u.role,
        (
          SELECT login_time FROM login_logs 
          WHERE user_id=u.id 
          ORDER BY id DESC LIMIT 1
        ) AS last_login,
        (
          SELECT COUNT(*) FROM login_logs 
          WHERE user_id=u.id
        ) AS total_logins
      FROM users u
      ORDER BY u.id ASC;
    `);

    res.json(users.rows);
  } catch (err) {
    console.error("❌ Users error:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// -----------------------
// Login history
// -----------------------
app.get("/api/users/:id/logs", async (req, res) => {
  const { id } = req.params;

  try {
    const logs = await pool.query(
      `SELECT login_time FROM login_logs 
       WHERE user_id=$1 
       ORDER BY login_time DESC`,
      [id]
    );

    res.json(logs.rows);
  } catch (err) {
    console.error("❌ Logs error:", err);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

// -----------------------
// Weekly Stats (LAST 7 DAYS)
// -----------------------
app.get("/api/stats/weekly-logins", async (req, res) => {
  try {
    const rows = await pool.query(
      `SELECT 
        to_char(login_time::date,'YYYY-MM-DD') AS day,
        COUNT(*)::int AS count
       FROM login_logs
       WHERE login_time >= NOW() - INTERVAL '6 days'
       GROUP BY day
       ORDER BY day`
    );

    res.json(rows.rows);
  } catch (err) {
    console.error("❌ Weekly stats error:", err);
    res.status(500).json({ error: "Failed to load weekly stats" });
  }
});

// -----------------------
// Monthly Stats (LAST 6 MONTHS)
// -----------------------
app.get("/api/stats/monthly-logins", async (req, res) => {
  try {
    const rows = await pool.query(
      `SELECT 
         to_char(date_trunc('month',login_time),'YYYY-MM') AS month,
         COUNT(*)::int AS count
       FROM login_logs
       WHERE login_time >= NOW() - INTERVAL '5 months'
       GROUP BY month
       ORDER BY month`
    );

    res.json(rows.rows);
  } catch (err) {
    console.error("❌ Monthly stats error:", err);
    res.status(500).json({ error: "Failed to load monthly stats" });
  }
});

// -----------------------
// Start Server
// -----------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
