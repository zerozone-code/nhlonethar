import { Router } from "express";
import {
  getStories,
  getStoryById,
  createStory,
  updateStory,
  deleteStory,
} from "../controllers/storyController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = Router();

// Public (Reader တွေ)
router.get("/", getStories);
router.get("/:id", getStoryById);

// Admin သီးသန့်
router.post("/", protect, adminOnly, createStory);
router.put("/:id", protect, adminOnly, updateStory);
router.delete("/:id", protect, adminOnly, deleteStory);

export default router;
