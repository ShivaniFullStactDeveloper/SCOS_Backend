import express from "express";
import {
  login,
  getMyInstitutesRoles,
  selectContext,
  logout
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();
// All auth related routes here
router.post("/login", login);
router.get("/my-institutes-roles", verifyToken, getMyInstitutesRoles);
router.post("/select-context", verifyToken, selectContext);
router.post("/logout", logout);

export default router;