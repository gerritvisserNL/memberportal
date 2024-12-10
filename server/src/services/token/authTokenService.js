// services/token/authTokenService.js
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_secret_key";
const EXPIRES_IN = "1h";

// Genereer een token
export const generateAuthToken = (userId) => {
  const payload = { userId };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
  return token;
};

// Verifieer een token
export const verifyAuthToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    throw new Error("Token is invalid or expired");
  }
};

// Verkrijg de gebruiker uit een token
export const getUserFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    throw new Error("Token is invalid or expired");
  }
};
