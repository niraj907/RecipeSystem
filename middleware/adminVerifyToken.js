import jwt from "jsonwebtoken";
export const adminVerifyToken = (req, res, next) => {
    // Use correct cookie name 'adminToken'
    const token = req.cookies?.adminToken;
  
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No authentication token",
      });
    }
  
    try {
      // Verify token and extract admin ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.adminId = decoded.id; // Match JWT payload structure
      next();
    } catch (error) {
      console.error("Token verification error:", error.message);
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid or expired token",
      });
    }
  };