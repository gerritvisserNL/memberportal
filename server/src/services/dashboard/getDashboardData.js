import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Fetch all users or search users by a query parameter.
 * @param {string} search - Optional search query for filtering users.
 * @returns {Promise<Array>} - List of users matching the query or all users.
 */
const getDashboardData = async (search) => {
  try {
    // If a search term is provided, filter users
    if (search) {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { email: { contains: search, mode: "insensitive" } },
            { name: { contains: search, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          createdAt: true,
        },
      });
      return users;
    }

    // If no search term is provided, fetch all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    return users;
  } catch (error) {
    throw new Error("Error fetching dashboard data: " + error.message);
  }
};

export default getDashboardData;
