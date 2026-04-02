import express from "express";
import {
  createMapping,
  getUserMappings
} from "../controllers/mapping.controller.js";

const router = express.Router();

//  POST /api/user-institute-roles
router.post("/", createMapping);
//  GET /api/user-institute-roles/:user_id
router.get("/:user_id", getUserMappings);

export default router;