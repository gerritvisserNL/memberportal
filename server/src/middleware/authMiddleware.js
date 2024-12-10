import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";

    // Ensure the header exists and follows "Bearer <token>" format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized access: Token is missing or malformed!",
      });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    try {
      // Verify the token
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded; // Attach user data to the request object
      next(); // Pass control to the next middleware or route handler
    } catch (err) {
      console.error("JWT verification error:", err.message);

      // Handle specific JWT errors
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired!" });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(403).json({ message: "Invalid token provided!" });
      }

      // Fallback for other JWT errors
      return res.status(403).json({ message: "Failed to authenticate token!" });
    }
  } catch (error) {
    console.error("Error in authMiddleware:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error during authentication." });
  }
};

export default authMiddleware;
