// ✅ Import libraries
import express from "express";
import cors from "cors";
import pg from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// ✅ Load environment variables
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ PostgreSQL connection
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.SSL === "true" ? { rejectUnauthorized: false } : false,
});

pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ Connection error:", err));

const SECRET = "solar_secret_key";

// ✅ Create tables if not exists
(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(200),
      gender VARCHAR(10),
      role VARCHAR(50) DEFAULT 'user'
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS login_logs (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      login_time TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log("✅ Tables ready");
})();

// ✅ Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend is alive!" });
});

// ✅ Register route
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
      "INSERT INTO users (name, email, password, gender) VALUES ($1, $2, $3, $4) RETURNING id, name, email, gender, role",
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

// ✅ Login route + Save login log
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

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET,
      { expiresIn: "1h" }
    );

    // ✅ Save login time in login_logs
    await pool.query(
      "INSERT INTO login_logs (user_id) VALUES ($1)",
      [user.id]
    );

    res.json({ token, user });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// ✅ Admin-only route for login history
app.get("/api/login-logs", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT login_logs.id, users.name, users.email, login_logs.login_time
      FROM login_logs
      JOIN users ON users.id = login_logs.user_id
      ORDER BY login_logs.id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Logs fetch error:", err);
    res.status(500).send("Error fetching login logs");
  }
});

// ✅ Start server
app.listen(port, () =>
  console.log(`🚀 Backend running at http://localhost:${port}`)
);
