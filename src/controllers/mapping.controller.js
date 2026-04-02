import {
    createMappingModel,
    getMappingsByUserModel
  } from "../models/mapping.model.js";
  
  /**
   * CREATE MAPPING
   */
  export const createMapping = async (req, res, next) => {
    try {
      const {
        tenant_id,
        institute_id,
        user_id,
        role_id,
        is_primary,
        status
      } = req.body;
  
      // validation
      if (!tenant_id || !institute_id || !user_id || !role_id) {
        return res.status(400).json({
          success: false,
          message: "All fields are required"
        });
      }
  
      const mapping = await createMappingModel({
        tenant_id,
        institute_id,
        user_id,
        role_id,
        is_primary,
        status
      });
  
      res.status(201).json({
        success: true,
        message: "Mapping created successfully",
        data: mapping
      });
  
    } catch (error) {
      next(error);
    }
  };
  
  

  //  GET USER INSTITUTES + ROLES (VERY IMPORTANT 🔥)
 
  export const getUserMappings = async (req, res, next) => {
    try {
      const { user_id } = req.params;
  
      const data = await getMappingsByUserModel(user_id);
  
      res.json({
        success: true,
        data
      });
  
    } catch (error) {
      next(error);
    }
  };