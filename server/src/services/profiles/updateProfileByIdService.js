// services/profiles/updateProfileByIdService.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Update a profile by userId
const updateProfileById = async (userId, profileData) => {
  try {
    return await prisma.profile.update({
      where: { userId },
      data: profileData, // Profile data to be updated
    });
  } catch (error) {
    throw new Error("Error updating profile: " + error.message);
  }
};

export default updateProfileById;
