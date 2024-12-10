import logger from "../utils/logger.js"; // import logger troubleshooting

const errorHandler = (err, req, res, next) => {
  // Set the status code. Default to 500 if no specific status code is provided.
  const statusCode = err.status || 500;

  // Create an error message. Provide a default if no message is available.
  const message =
    err.message ||
    "An error occurred on the server. Please double-check your request!";

  // Log the error for debugging purposes (useful in development and production).
  logger.error(err);

  // Specific handling for validation errors.
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed, please check your input.",
      errors: err.errors, // For example, an array of specific validation errors
    });
  }

  // Specific handling for authentication errors (example, could be expanded).
  if (err.name === "AuthenticationError") {
    return res.status(401).json({
      message: "Authentication failed. Please check your credentials.",
    });
  }

  // Specific handling for authorization errors (example, could be expanded).
  if (err.name === "AuthorizationError") {
    return res.status(403).json({
      message: "You do not have permission to access this resource.",
    });
  }

  // For all other errors, return the error message and stack trace (in development).
  if (process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      message,
      stack: err.stack, // Only visible in the development environment
    });
  }

  // In production, return only the message for security reasons.
  return res.status(statusCode).json({
    message,
  });
};

export default errorHandler;
