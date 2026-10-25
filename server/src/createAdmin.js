import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";

const createAdmin = async () => {
  try {
    const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error("ADMIN_EMAIL နဲ့ ADMIN_PASSWORD ကို .env ထဲ ထည့်ပါ");
    }

    if (ADMIN_PASSWORD.length < 8) {
      throw new Error("ADMIN_PASSWORD က 8 လုံးအထက် ဖြစ်ရမယ်");
    }

    await connectDB();

    const email = ADMIN_EMAIL.toLowerCase().trim();
    const existing = await Admin.findOne({ email }).select("+password");

    if (existing) {
      existing.password = ADMIN_PASSWORD;
      await existing.save();
      console.log("admin password verify");
    } else {
      await Admin.create({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
      console.log("Admin create success");
    }

    console.log("notic .env password delete");
  } catch (error) {
    console.error("createAdmin error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();
