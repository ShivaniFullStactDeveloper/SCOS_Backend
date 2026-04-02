import express from "express";
import userRoutes from "../routes/user.route.js";
import roleRoutes from "../routes/role.route.js";
import tenantRoutes from "../routes/tenant.route.js";
import instituteRoutes from "../routes/institute.route.js";
import mappingRoutes from "../routes/mapping.route.js";
import authRoutes from "../routes/auth.route.js";

const router = express.Router();
// All routes register here
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/tenants", tenantRoutes);
router.use("/institutes", instituteRoutes);
router.use("/user-institute-roles", mappingRoutes);
router.use("/auth", authRoutes);

export default router;