// services/user/getUsersService.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all users
const getUsersService = async () => {
  try {
    const users = await prisma.user.findMany(); // Fetch all users
    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

export default getUsersService;
