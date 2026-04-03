import {
  createRoleModel,
  getRolesModel,
  deleteRoleModel
} from "../models/role.model.js";

// CREATE ROLE
// This API inserts a new role into database

export const createRole = async (req, res, next) => {
  try {
    const {
      name,
      code,
      description,
      icon,
      status
    } = req.body;

    // Basic validation
    if (!name || !code) {
      return res.status(400).json({
        success: false,
        message: "Name and code are required"
      });
    }

    // Call model to insert role
    const role = await createRoleModel({
      name,
      code,
      description,
      icon,
      status
    });

    res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: role
    });

  } catch (error) {
    next(error);
  }
};

// GET ALL ROLES
// This API fetches all roles from database

export const getRoles = async (req, res, next) => {
  try {
    const roles = await getRolesModel();

    res.json({
      success: true,
      data: roles
    });

  } catch (error) {
    next(error);
  }
};

// DELETE ROLE
// This API deletes a role using ID
export const deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedRole = await deleteRoleModel(id);

    // If role not found
    if (!deletedRole) {
      return res.status(404).json({
        success: false,
        message: "Role not found"
      });
    }

    res.json({
      success: true,
      message: "Role deleted successfully",
      data: deletedRole
    });

  } catch (error) {
    next(error);
  }
};