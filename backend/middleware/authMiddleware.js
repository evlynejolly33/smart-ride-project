import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETE);

    let user = await User.findById(decoded._id).select('_id role');
    if (user) {
      req.user = user;
      req.role = "user";
      return next();
    }

    return res.status(401).json({ message: "Unauthorized user or driver" });

  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

