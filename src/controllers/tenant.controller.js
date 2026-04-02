import {
  createTenantModel,
  getTenantsModel
} from "../models/tenant.model.js";

//  CREATE TENANT
export const createTenant = async (req, res, next) => {
  try {
    const { name, code, status } = req.body;

    // validation
    if (!name || !code) {
      return res.status(400).json({
        success: false,
        message: "Name and code are required"
      });
    }

    const tenant = await createTenantModel({
      name,
      code,
      status
    });

    res.status(201).json({
      success: true,
      message: "Tenant created successfully",
      data: tenant
    });

  } catch (error) {
    next(error);
  }
};

// GET TENANTS
export const getTenants = async (req, res, next) => {
  try {
    const tenants = await getTenantsModel();

    res.json({
      success: true,
      data: tenants
    });

  } catch (error) {
    next(error);
  }
};