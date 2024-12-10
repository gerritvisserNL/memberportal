// services/profiles/getProfileByIdService.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch a profile by userId
const getProfileById = async (userId) => {
  try {
    return await prisma.profile.findUnique({
      where: { userId },
      include: { user: true },
    });
  } catch (error) {
    throw new Error("Error fetching profile by ID: " + error.message);
  }
};

export default getProfileById;
