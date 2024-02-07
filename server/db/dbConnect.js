import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const dbConnect = async () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log("DB connection error", err);
    });
};

export default dbConnect;
