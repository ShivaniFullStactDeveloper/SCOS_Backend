import express from "express";
import {
  createTenant,
  getTenants
} from "../controllers/tenant.controller.js";

const router = express.Router();

// POST /api/tenants
router.post("/", createTenant);
//  GET /api/tenants
router.get("/", getTenants);

export default router;