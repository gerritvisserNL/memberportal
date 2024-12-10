import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const registerUserService = async ({ email, password }) => {
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user in database
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return newUser;
};

export default registerUserService;
