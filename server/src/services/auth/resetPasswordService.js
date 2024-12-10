// services/auth/resetPasswordService.js
import { PrismaClient } from "@prisma/client";
import emailService from "../email/emailService.js";

const prisma = new PrismaClient();

const resetPasswordService = async ({ token, newPassword }) => {
  const user = await emailService.resetPasswordLogic(token);
  if (!user) throw new Error("Invalid or expired token");

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password in the database
  await prisma.updateUserPassword(user.id, hashedPassword);
};

export default resetPasswordService;
