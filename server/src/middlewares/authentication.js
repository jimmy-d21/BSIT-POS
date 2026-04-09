import jwt from "jsonwebtoken";
import ENV from "../utils/ENV.js";
import staffModel from "../models/staffModel.js";

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, authorization denied" });
    }

    const decoded = jwt.verify(token, ENV.jwt);
    const user = await staffModel.findById(decoded.userId);

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
    console.error(`Authentication Middleware Error: ${error.message}`);
  }
};

export default authenticateUser;
