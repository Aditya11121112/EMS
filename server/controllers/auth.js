// auth.js
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Optional chaining for safety

  if (!token) {
    return res.status(401).json({
      message: "Token not found in backend",
      success: false,
    });
  }

  try {
    const decoded = await jwt.verify(token, "adi");
    req.user = decoded; // Store the decoded token in the request object
    next(); // Call next to proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({
      message: "Invalid token",
      success: false,
    });
  }
};

export { auth };
