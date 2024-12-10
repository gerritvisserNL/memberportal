// src/middleware/roleCheck.js

export const roleCheck = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // Check if the user is authenticated and has a role
      const user = req.user; // req.user is set by the authMiddleware
      if (!user) {
        return res.status(401).json({ message: "Authentication required" });
      }

      // Check if the user's role is included in the allowed roles
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      // User is authorized, proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Role check error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
};
