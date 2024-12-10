// services/user/createUserService.js

// services/user/createUserService.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new user
const createUserService = async (userData) => {
  try {
    const newUser = await prisma.user.create({
      data: userData, // Create user with provided data
    });
    return newUser;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

export default createUserService;
