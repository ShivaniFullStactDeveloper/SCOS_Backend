import pool from "../config/db.js";

//  Insert role into database (ALL fields used)
export const createRoleModel = async (roleData) => {
  const {
    name,
    code,
    description,
    icon,
    status
  } = roleData;

  const result = await pool.query(
    `INSERT INTO roles 
    (name, code, description, icon, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [
      name,
      code,
      description || null,
      icon || null,
      status || "active"
    ]
  );

  return result.rows[0];
};

//  Get all roles
export const getRolesModel = async () => {
  const result = await pool.query(`SELECT * FROM roles`);
  return result.rows;
};

//  Delete role by ID
export const deleteRoleModel = async (id) => {
  const result = await pool.query(
    "DELETE FROM roles WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};