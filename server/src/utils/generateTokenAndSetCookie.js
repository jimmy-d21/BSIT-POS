import jwt from "jsonwebtoken";
import ENV from "./ENV.js";

const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, ENV.jwt, { expiresIn: "1h" });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000,
  });
};

export default generateTokenAndSetCookie;
