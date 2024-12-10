import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import emailService from "../email/emailService.js";

const prisma = new PrismaClient();

// Custom error class for user not found
class UserNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserNotFoundError";
  }
}

const forgotPasswordService = async (email) => {
  // Find the user by email using Prisma
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new UserNotFoundError("User not found");
  }

  // Generate a cryptographically secure reset token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Set the token expiration date (1 hour from now)
  const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour in the future

  // Save the reset token and expiration date in the database
  await prisma.user.update({
    where: { email: email },
    data: {
      resetToken,
      resetTokenExpiry,
    },
  });

  // Send the password reset email
  await emailService.sendPasswordResetEmail(user.email, resetToken);
};

export default forgotPasswordService;
