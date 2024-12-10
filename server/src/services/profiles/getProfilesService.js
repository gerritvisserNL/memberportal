// services/profiles/getProfileService.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch all profiles with user data
const getProfiles = async () => {
  try {
    return await prisma.profile.findMany({
      include: { user: true }, // Include related user data
    });
  } catch (error) {
    throw new Error("Error fetching profiles: " + error.message);
  }
};

export default getProfiles;
