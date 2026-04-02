import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// 🔥 auto detect (localhost vs render)
const isProduction = process.env.DATABASE_URL.includes("dpg-");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl: isProduction
    ? { rejectUnauthorized: false }
    : false,
});

// Test connection
pool.connect()
  .then(() => console.log(" DB Connected"))
  .catch((err) => console.error(" DB Error:", err.message));

export default pool;