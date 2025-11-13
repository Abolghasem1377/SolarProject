// ✅ Import libraries
import express from "express";
import cors from "cors";
import pg from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.SSL === "true" ? { rejectUnauthorized: false } : false,
});

pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ Connection error:", err));

const SECRET = "solar_secret_key";

// Create table if not exists
(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(200),
      gender VARCHAR(10)
    );
  `);
})();

// Test backend
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend is alive!" });
});

// Register
app.post("/api/register", async (req, res) => {
  const { name, email, password, gender } = req.body;
  if (!name || !email || !password || !gender)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const check = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (check.rows.length > 0)
      return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, email, password, gender) VALUES ($1, $2, $3, $4) RETURNING id, name, email, gender",
      [name, email, hashed, gender]
    );

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ error: "Registration error" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0)
      return res.status(401).json({ error: "User not found" });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Incorrect password" });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// 🚀 GET ALL USERS (این روت گم شده بود!)
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, gender FROM users ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Users fetch error:", err);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Stats
app.get("/api/stats", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, gender FROM users ORDER BY id DESC"
    );
    const totalUsers = result.rows.length;
    const latestUsers = result.rows.slice(0, 5);
    res.json({ totalUsers, latestUsers });
  } catch (err) {
    console.error("❌ Stats error:", err);
    res.status(500).send("Error fetching stats");
  }
});

// Start server
app.listen(port, () =>
  console.log(`🚀 Backend running at http://localhost:${port}`)
);

// ✅ Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0)
      return res.status(401).json({ error: "User not found" });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Incorrect password" });

    // 🟢 Update last login timestamp
    const updateLogin = await pool.query(
      "UPDATE users SET last_login = NOW() WHERE id = $1 RETURNING last_login",
      [user.id]
    );

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        last_login: updateLogin.rows[0].last_login,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});
