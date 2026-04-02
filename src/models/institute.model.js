import pool from "../config/db.js";

// Create Institute (all fields)
export const createInstituteModel = async (data) => {
  const {
    tenant_id,
    name,
    code,
    type,
    location,
    logo,
    status
  } = data;

  const result = await pool.query(
    `INSERT INTO institutes 
    (tenant_id, name, code, type, location, logo, status)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *`,
    [
      tenant_id,
      name,
      code,
      type || null,
      location || null,
      logo || null,
      status || "active"
    ]
  );

  return result.rows[0];
};

// Get all institutes
export const getInstitutesModel = async () => {
  const result = await pool.query(`SELECT * FROM institutes`);
  return result.rows;
};