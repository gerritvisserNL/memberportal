// services/profiles/deleteProfileByIdService.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Delete a profile by userId
const deleteProfileById = async (userId) => {
  try {
    return await prisma.profile.delete({
      where: { userId },
    });
  } catch (error) {
    throw new Error("Error deleting profile: " + error.message);
  }
};

export default deleteProfileById;
