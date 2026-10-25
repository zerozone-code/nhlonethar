import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI not found");
  }

  const connection = await mongoose.connect(uri);
  //   console.log(uri);
  console.log(`MongoDB connected: ${connection.connection.host}`);
};

export default connectDB;
