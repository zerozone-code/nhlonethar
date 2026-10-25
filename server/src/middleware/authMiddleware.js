import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Login ဝင်ထားဖို့ လိုပါတယ်" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ message: "Login ဝင်ထားဖို့ လိုပါတယ်" });
    }
    req.admin = admin;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Session ကုန်သွားပါပြီ၊ ပြန် Login ဝင်ပါ" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.admin?.role !== "admin") {
    return res.status(403).json({ message: "ခွင့်ပြုချက် မရှိပါ" });
  }

  next();
};
