import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import type { Request, Response } from "express";
import type { QueryResult } from "pg";
import { pool } from "./db.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ now: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

pool.query("SELECT NOW()")
  .then((result) => console.log("Database connected at:", result.rows[0]))
  .catch((err: unknown)=> console.error("DB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});