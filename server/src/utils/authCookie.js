import jwt from "jsonwebtoken";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const isProduction = process.env.NODE_ENV === "production";

export const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
};

export const setAuthCookie = (res, adminId) => {
  const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, { ...cookieOptions, maxAge: SEVEN_DAYS_MS });
};

export const clearAuthCookie = (res) => {
  res.clearCookie("token", cookieOptions);
};
