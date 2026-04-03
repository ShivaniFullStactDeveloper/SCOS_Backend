import {
  createInstituteModel,
  getInstitutesModel
} from "../models/institute.model.js";


//  CREATE INSTITUTE

export const createInstitute = async (req, res, next) => {
  try {
    const {
      tenant_id,
      name,
      code,
      type,
      location,
      logo,
      status
    } = req.body;

    // validation
    if (!tenant_id || !name || !code) {
      return res.status(400).json({
        success: false,
        message: "tenant_id, name and code are required"
      });
    }

    const institute = await createInstituteModel({
      tenant_id,
      name,
      code,
      type,
      location,
      logo,
      status
    });

    res.status(201).json({
      success: true,
      message: "Institute created successfully",
      data: institute
    });

  } catch (error) {
    next(error);
  }
};


//  GET ALL INSTITUTES

export const getInstitutes = async (req, res, next) => {
  try {
    const institutes = await getInstitutesModel();

    res.json({
      success: true,
      data: institutes
    });

  } catch (error) {
    next(error);
  }
};