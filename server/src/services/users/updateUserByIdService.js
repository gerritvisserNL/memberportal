// services/user/updateUserByIdService.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Update a user by ID
const updateUserByIdService = async (userId, userData) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId, 10) }, // Search for user by ID
      data: userData, // Update user with new data
    });
    return updatedUser;
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
};

export default updateUserByIdService;
