import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    min: [6, "Email too short"],
    max: [50, "Email too long"],
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },
  password: {
    min: [8, "Password too short. Need > 8 characters"],
    max: [50, "Password too long"],
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
  username: {
    min: [2, "Username too short"],
    max: [50, "Username too long"],
    type: String,
    required: [true, "Please provide an username!"],
    unique: [true, "Username Exist"],
  },
});
const Users = mongoose.model.Users || mongoose.model("Users", userSchema);

export default Users;
