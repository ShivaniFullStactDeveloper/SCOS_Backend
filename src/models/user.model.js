import pool from "../config/db.js";


// Insert user into database
// All fields included as per table

export const createUserModel = async (userData) => {
  const {
    first_name,
    last_name,
    full_name,
    email,
    mobile,
    password_hash,
    status
  } = userData;

  const result = await pool.query(
    `INSERT INTO users 
    (first_name, last_name, full_name, email, mobile, password_hash, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [
      first_name,
      last_name,
      full_name,
      email,
      mobile,
      password_hash,
      status || "active"
    ]
  );

  return result.rows[0];
};


//  Find user by email
export const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};