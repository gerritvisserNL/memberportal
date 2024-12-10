import forgotPasswordService from "../services/auth/forgotPasswordService.js";
import loginUserService from "../services/auth/loginUserService.js";
import registerUserService from "../services/auth/registerUserService.js";
import resetPasswordService from "../services/auth/resetPasswordService.js";
import { validationResult } from "express-validator";

// Register a new user
export const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ status: 400, message: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const newUser = await registerUserService({ email, password });
    res.status(201).json({
      message: "User successfully registered",
      user: { id: newUser.id, email: newUser.email },
    });
  } catch (error) {
    next(error); // Forward the error to the errorHandler middleware
  }
};

// Log a user in
export const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ status: 400, message: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const { token, user } = await loginUserService({ email, password });
    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Login fout:", error.message);
    next({ status: 401, message: "Invalid credentials" });
  }
};

// Forgot password
export const forgotPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ status: 400, message: errors.array() });
  }

  const { email } = req.body;
  try {
    await forgotPasswordService(email);
    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error) {
    next(error);
  }
};

// Reset password
export const resetPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ status: 400, message: errors.array() });
  }

  const { token, newPassword } = req.body;
  try {
    await resetPasswordService({ token, newPassword });
    res.status(200).json({ message: "Password successfully reset" });
  } catch (error) {
    next(error);
  }
};
