import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - no token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Attach decoded userId to the request object
    next();
  } catch (error) {
    console.error("Error in verifyToken:", error.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized - invalid or expired token",
    });
  }
};
