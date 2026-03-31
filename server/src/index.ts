import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

const app = express();

app.use(cors());
app.use(express.json());

/* ===========================
   DATABASE CONNECTION
=========================== */

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

/* ===========================
   TEST ROUTE
=========================== */

app.get("/", (req, res) => {
  res.send("KLPS API Running");
});

/* ===========================
   INSERT WAIST MEASUREMENT
=========================== */

app.post("/api/waist", async (req, res) => {
  try {
    const { user_id, waist_value } = req.body;

    if (!user_id || !waist_value) {
      return res.status(400).json({
        error: "Missing user_id or waist_value",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO waist_measurements
      (user_id, waist_value)
      VALUES ($1, $2)
      RETURNING *;
      `,
      [user_id, waist_value]
    );

    res.json(result.rows[0]);

  } catch (error) {

    console.error("DB ERROR:", error);

    res.status(500).json({
      error: "Database insert failed",
    });

  }
});

/* ===========================
   GET ALL WAIST DATA
=========================== */

app.get("/api/waist", async (req, res) => {
  try {

    const result = await pool.query(
      `
      SELECT *
      FROM waist_measurements
      ORDER BY created_at DESC
      LIMIT 20;
      `
    );

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Database fetch failed",
    });

  }
});

/* ===========================
   GET LATEST WAIST DATA
=========================== */
app.get("/api/waist/latest", async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT *
      FROM waist_measurements
      ORDER BY created_at DESC
      LIMIT 1;
    `);

    res.json(result.rows[0] || null);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Latest fetch failed"
    });

  }
});

/* ===========================
   START SERVER
=========================== */

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`KLPS API running on port ${PORT}`);
});