import getDashboardData from "../services/dashboard/getDashboardData.js";

// Get all users or search by query
export const getAllUsers = async (req, res, next) => {
  const { search } = req.query;

  try {
    const users = await getDashboardData(search); // Call service
    res.status(200).json(users);
  } catch (error) {
    next(error); // Pass error to middleware
  }
};
