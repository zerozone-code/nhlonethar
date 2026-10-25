import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email ထည့်ပါ"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password ထည့်ပါ"],
      minLength: [8, "Password က ၈ လုံးအထက် ဖြစ်ရမယ်"],
      select: false,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
  },
  { timestamps: true },
);

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

adminSchema.methods.matchPassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
