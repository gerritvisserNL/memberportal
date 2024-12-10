import express from "express";
import { validateRegister } from "../../middleware/validateRegister.js";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} from "../../controllers/authController.js";

const router = express.Router();

// Authentication routes
router.post("/register", validateRegister, registerUser);

router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);
router.get("/forgot-password", (req, res) => {
  res.send("Forgot-password GET endpoint werkt!");
});

router.post("/reset-password", resetPassword);
router.get("/reset-password", (req, res) => {
  res.send("Reset-password GET endpoint werkt!");
});

export default router;
