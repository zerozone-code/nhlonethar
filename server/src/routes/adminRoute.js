import { Router } from "express";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { getStats } from "../controllers/adminController.js";

const router = Router();

router.use(protect, adminOnly);
router.get("/stats", getStats);

export default router;
