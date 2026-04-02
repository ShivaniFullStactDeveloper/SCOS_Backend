import express from "express";
import { createRole, getRoles, deleteRole } from "../controllers/role.controller.js";

const router = express.Router();
//  Create a new role
router.post("/", createRole);
//  Get all roles
router.get("/", getRoles);
//  Delete a role by ID
router.delete("/:id", deleteRole);

export default router;