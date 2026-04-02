import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl: false, 
});

// Test connection
pool.connect()
  .then(() => console.log(" DB Connected"))
  .catch((err) => console.error(" DB Error:", err.message));

export default pool;