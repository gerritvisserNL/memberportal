// services/user/getUserByIdService.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get a user by ID
const getUserByIdService = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId, 10) }, // Search for user by ID
    });
    return user;
  } catch (error) {
    throw new Error("Error fetching user by ID: " + error.message);
  }
};

export default getUserByIdService;
