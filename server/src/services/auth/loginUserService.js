// services/auth/loginUserService.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateAuthToken } from "../token/authTokenService.js";

const prisma = new PrismaClient();

const loginUserService = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error("User not found for email:", email);
    throw new Error("Invalid credentials");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    console.error("Password mismatch for email:", email);
    throw new Error("Invalid password");
  }

  // Generate auth token
  const token = generateAuthToken(user.id);

  // Return token and userdata
  return { token, user };
};

export default loginUserService;
