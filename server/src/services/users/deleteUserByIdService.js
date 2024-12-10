// services/user/deleteUserByIdService.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Delete a user by ID
const deleteUserByIdService = async (userId) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(userId, 10) }, // Search for user by ID
    });
    return deletedUser;
  } catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
};

export default deleteUserByIdService;
