import bcrypt from "bcrypt";
import { findUserByEmail } from "../models/auth.model.js";
import { generatePreToken, generateAccessToken } from "../utils/generateToken.js";
import { getMappingsByUserModel } from "../models/mapping.model.js";


// LOGIN API
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      });
    }

    // Generate pre-context token
    const token = generatePreToken(user);

    res.json({
      success: true,
      message: "Login successful",
      pre_context_token: token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email
      }
    });

  } catch (error) {
    next(error);
  }
};



//  GET INSTITUTES + ROLES

export const getMyInstitutesRoles = async (req, res, next) => {
  try {
    const user_id = req.user.user_id;

    const data = await getMappingsByUserModel(user_id);

    res.json({
      success: true,
      data
    });

  } catch (error) {
    next(error);
  }
};

//  SELECT CONTEXT → FINAL TOKEN
export const selectContext = async (req, res, next) => {
  try {
    const { tenant_id, institute_id, role_id } = req.body;

    const token = generateAccessToken({
      user_id: req.user.user_id,
      tenant_id,
      institute_id,
      role_id
    });

    res.json({
      success: true,
      message: "Context selected",
      access_token: token
    });

  } catch (error) {
    next(error);
  }
};

// LOGOUT

export const logout = (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully"
  });
};