import jwt from "jsonwebtoken";

//  Pre-context token (after login)
export const generatePreToken = (user) => {
  return jwt.sign(
    {
      user_id: user.id,
      email: user.email,
      token_type: "pre_context"
    },
    "secret",
    { expiresIn: "8h" }
  );
};

//  Final access token (after selection)
export const generateAccessToken = (data) => {
  return jwt.sign(
    {
      user_id: data.user_id,
      tenant_id: data.tenant_id,
      institute_id: data.institute_id,
      role_id: data.role_id,
      token_type: "access"
    },
    "secret",
    { expiresIn: "8h" }
  );
};