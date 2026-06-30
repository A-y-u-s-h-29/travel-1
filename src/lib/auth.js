import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

export function generateToken() {
  try {
    return jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: "1d" });
  } catch (error) {
    console.error("Generate Token Error:", error);
    throw new Error("Failed to generate authentication token.");
  }
}

export function verifyToken(token) {
  try {
    if (!token) {
      throw new Error("Token is missing.");
    }
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("Verify Token Error:", error.message);
    return null;
  }
}