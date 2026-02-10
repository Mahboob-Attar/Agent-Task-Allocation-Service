const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      const error = new Error("Not authorized, no token");
      error.statusCode = 401;
      return next(error);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      const error = new Error("Not authorized, admin not found");
      error.statusCode = 401;
      return next(error);
    }

    req.admin = admin;

    next();
  } catch (error) {
    error.statusCode = 401;
    error.message = "Not authorized, token invalid or expired";
    next(error);
  }
};

module.exports = protect;
