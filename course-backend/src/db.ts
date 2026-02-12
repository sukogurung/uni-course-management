import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import pkg from "pg";
const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing in .env");
}

export const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }, 
});