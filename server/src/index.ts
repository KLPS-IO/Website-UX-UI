import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import morgan from "morgan";

dotenv.config();

const { Pool } = pkg;



const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

/* =========================================
  RATE LIMITING (First Shield)
  PREVENTS: Bot spam, API flooding, Basic abuse
========================================= */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);


/* =========================================
   API KEY SECURITY
========================================= */

app.use((req, res, next) => {

  // Allow health endpoint without API key
  if (req.path === "/health") {
    return next();
  }

  const key = req.headers["x-api-key"];

  if (key !== process.env.API_KEY) {
    return res.status(401).json({
      error: "Unauthorized"
    });
  }

  next();

});

/* ===========================
   HEALTH ENDPOINT
=========================== */

app.use((req, res, next) => {

  // Allow health checks without API key
  if (req.path === "/health") {
    return next();
  }

  const key = req.headers["x-api-key"];

  if (key !== process.env.API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();

});


/* ===========================
   DATABASE CONNECTION
=========================== */

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? { rejectUnauthorized: false }
    : false
});


app.get("/health", async (req, res) => {
  try {

    // Test database connection
    await pool.query("SELECT 1");

    res.json({
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString()
    });

  } catch (error) {

    res.status(500).json({
      status: "error",
      database: "disconnected"
    });

  }
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

const waistSchema = z.object({
  user_id: z.string(),
  waist_value: z.number().min(20).max(80)
});

app.post("/api/waist", async (req, res) => {

  const result = waistSchema.safeParse(req.body);

  if (!result.success) {

    return res.status(400).json({
      error: "Invalid input"
    });

  }

  const { user_id, waist_value } =
    result.data;

  // continue DB insert

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