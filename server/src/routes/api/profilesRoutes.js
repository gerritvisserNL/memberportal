// src/routes/api/profilesRoutes.js

import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import {
  getProfiles,
  getProfileById,
  updateProfileById,
  deleteProfileById,
} from "../../controllers/profileController.js";

const router = express.Router();

// Get all profiles (requires authentication)
router.get("/", authMiddleware, getProfiles);

// Get a specific user's profile by user ID (requires authentication)
router.get("/:userId", authMiddleware, getProfileById);

// Update a user's profile by user ID (requires authentication)
router.put("/:userId", authMiddleware, updateProfileById);

// Delete a user's profile by user ID (requires authentication)
router.delete("/:userId", authMiddleware, deleteProfileById);

export default router;
