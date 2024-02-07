import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
  username: {
    type: String,
    required: [true, "Please provide an username!"],
    unique: [true, "Username Exist"],
  },
});
const Users = mongoose.model.Users || mongoose.model("Users", userSchema);

export default Users;
