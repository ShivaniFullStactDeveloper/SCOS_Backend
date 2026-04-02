import express from "express";
import {
  createInstitute,
  getInstitutes
} from "../controllers/institute.controller.js";

const router = express.Router();

// CREATE INSTITUTE
router.post("/", createInstitute);
// GET ALL INSTITUTES
router.get("/", getInstitutes);

export default router;