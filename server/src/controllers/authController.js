import Admin from "../models/Admin.js";
import { setAuthCookie, clearAuthCookie } from "../utils/authCookie.js";

const toAdminResponse = (admin) => {
  return {
    _id: admin._id,
    email: admin.email,
    role: admin.role,
  };
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email နဲ့ Password ထည့်ပါ" });
    }

    const admin = await Admin.findOne({
      email: String(email).toLowerCase().trim(),
    }).select("+password");

    const isMatch = admin ? await admin.matchPassword(String(password)) : false;

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email သို့မဟုတ် Password မှားနေတယ်" });
    }

    setAuthCookie(res, admin._id);
    res.json(toAdminResponse(admin));
  } catch (error) {
    console.log("login error:", error.message);
    res.status(500).json({ message: "Login ဝင်လို့မရပါ" });
  }
};

export const logout = (req, res) => {
  clearAuthCookie(res);
  res.json({ message: "Logout လုပ်ပြီးပါပြီ" });
};

export const getMe = (req, res) => {
  res.json(toAdminResponse(req.admin));
};
