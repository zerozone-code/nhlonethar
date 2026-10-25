import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// routes
import storyRoutes from "./routes/storyRoutes.js";
import authRoutes from "./routes/authRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

// dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Server is good" });
});

app.use("/api/stories", storyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});
const startServer = async () => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET ကို .env ထဲမှာ သတ်မှတ်ပါ");
    }
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  } catch (error) {
    console.error("Server can not start", error);
    process.exit(1);
  }
};

startServer();
