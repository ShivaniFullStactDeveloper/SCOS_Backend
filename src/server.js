import app from "./app.js";
import pool from "./config/db.js";

const PORT = 3000;

// check on postman or browser: http://localhost:3000/api
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to SCOS API"
  });
});

// Test DB connection
const startServer = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    // 
  } catch (error) {
    console.error("Error starting server", error);
  }
};

startServer();