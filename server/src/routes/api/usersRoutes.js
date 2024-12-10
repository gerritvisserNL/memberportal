import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../../controllers/userController.js";

const router = express.Router();

// Get all users (requires authentication)
router.get("/", authMiddleware, getUsers);

// Get a specific user by ID (requires authentication)
router.get("/:userId", authMiddleware, getUserById);

// Update a user by ID (requires authentication)
router.put("/:userId", authMiddleware, updateUserById);

// Delete a user by ID (requires authentication)
router.delete("/:userId", authMiddleware, deleteUserById);

export default router;
