import bcrypt from "bcrypt";
import { createUserModel } from "../models/user.model.js";

// Create User Controller
export const createUser = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      full_name,
      email,
      mobile,
      password,
      status
    } = req.body;

    // Hash password before saving
    const password_hash = await bcrypt.hash(password, 10);

    // Call model
    const user = await createUserModel({
      first_name,
      last_name,
      full_name,
      email,
      mobile,
      password_hash,
      status
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user
    });

  } catch (error) {
    next(error);
  }
};