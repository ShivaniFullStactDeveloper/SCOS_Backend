import pool from "../config/db.js";

//  Create mapping
export const createMappingModel = async (data) => {
  const {
    tenant_id,
    institute_id,
    user_id,
    role_id,
    is_primary,
    status
  } = data;

  const result = await pool.query(
    `INSERT INTO user_institute_roles
    (tenant_id, institute_id, user_id, role_id, is_primary, status)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *`,
    [
      tenant_id,
      institute_id,
      user_id,
      role_id,
      is_primary || false,
      status || "active"
    ]
  );

  return result.rows[0];
};

//  Get mappings by user (IMPORTANT for login flow)
export const getMappingsByUserModel = async (user_id) => {
  const result = await pool.query(
    `SELECT 
        uir.tenant_id,
        uir.institute_id,
        i.name AS institute_name,
        i.location,
        i.type,
        i.logo,
        r.id AS role_id,
        r.name AS role_name,
        r.description,
        r.icon
     FROM user_institute_roles uir
     JOIN institutes i ON i.id = uir.institute_id
     JOIN roles r ON r.id = uir.role_id
     WHERE uir.user_id = $1`,
    [user_id]
  );

  return result.rows;
};