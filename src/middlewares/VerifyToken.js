const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const SuperAdmin = require("../models/superAdmin");
const keys = require("../utils/keys");
const { ErrorHandler } = require("../utils/errorHandler");

async function verifyToken(req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      throw new ErrorHandler(
        StatusCodes.UNAUTHORIZED,
        "No authorization token found!"
      );
    }
    try {
      const decoded = jwt.verify(token, keys.jwrSecretKey);
      const isUserExists = await SuperAdmin.findOne({
        where: { id: decoded.id },
      });

      if (!isUserExists) {
        throw new Error();
      }
      req.user = decoded;
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        throw new ErrorHandler(StatusCodes.UNAUTHORIZED, "Token expired!");
      } else {
        throw new ErrorHandler(StatusCodes.UNAUTHORIZED, "Invalid token!");
      }
    }
  } catch (err) {
    next(err);
  }
}

module.exports = verifyToken;
