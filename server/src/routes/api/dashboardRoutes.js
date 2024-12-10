import express from "express";
import { getAllUsers } from "../../controllers/dashboardController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

// Route to fetch all users or search users by a query parameter
router.get("/", authMiddleware, getAllUsers);

export default router;
