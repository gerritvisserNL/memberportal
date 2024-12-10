import winston from "winston";
import path from "path";

// Use import.meta.url to get the current module's directory path
const logDir = path.join(path.dirname(import.meta.url), "../logs");

// Create the logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "info" : "error", // Log levels: 'info' in development and 'error' in production
  format: winston.format.json(),
  defaultMeta: { service: "memberportal-api" },
});

// Transports for different environments
if (process.env.NODE_ENV !== "production") {
  // In development environment, log to the console
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(), // Display logs in a simple text format
    })
  );
} else {
  // In production, log to files
  logger.add(
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error", // Log only errors in production
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
    })
  );

  logger.add(
    new winston.transports.File({
      filename: path.join(logDir, "info.log"),
      level: "info", // Log informational messages as well in production
    })
  );
}

export default logger;
