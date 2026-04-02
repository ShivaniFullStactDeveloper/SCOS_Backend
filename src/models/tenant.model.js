import pool from "../config/db.js";


// Create Tenant

export const createTenantModel = async (data) => {
  const { name, code, status } = data;

  const result = await pool.query(
    `INSERT INTO tenants (name, code, status)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [name, code, status || "active"]
  );

  return result.rows[0];
};

// Get all tenants
export const getTenantsModel = async () => {
  const result = await pool.query("SELECT * FROM tenants");
  return result.rows;
};