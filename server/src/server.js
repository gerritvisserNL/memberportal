import "dotenv/config";
import express from "express";
import * as Sentry from "@sentry/node";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/api/authRoutes.js";
import dashboardRoutes from "./routes/api/dashboardRoutes.js";
import usersRoutes from "./routes/api/usersRoutes.js";
import profilesRoutes from "./routes/api/profilesRoutes.js";

import logMiddleware from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";

// Prisma client
const prisma = new PrismaClient();

// Check required environment variables
const requiredEnvVars = ["EMAIL_USER", "EMAIL_PASS", "SENTRY_DSN"];
requiredEnvVars.forEach((env) => {
  if (!process.env[env]) {
    console.error(`Missing environment variable: ${env}`);
    process.exit(1);
  }
});

const app = express();

// Welcome message
app.get("/", (req, res) => {
  res.send("Welcome to the memberPortal API!");
});

// Force HTTPS in production
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.secure) {
      return next();
    }
    return res.redirect("https://" + req.headers.host + req.url);
  });
}

// Rate limiting: General limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // General requests
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting: Specific for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit to 5 login attempts
  message: "Too many login attempts. Try again in 15 minutes.",
});

// Middleware
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
      "https://www.gerritvisser.nl",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(helmet());
app.use(express.json());
app.use(logMiddleware);

// Sentry configuration
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
  ],
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
});

// Middleware for Sentry error handling and tracing
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profiles", profilesRoutes);
app.use("/api/users", usersRoutes);

// Prisma disconnect on shutdown
const gracefulShutdown = async () => {
  console.log("Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

// Sentry error handler
app.use(Sentry.Handlers.errorHandler());

// General error handler
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
