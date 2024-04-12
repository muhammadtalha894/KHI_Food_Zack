import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  photo: String,
  googleId: {
    type: String,
    required: true,
    unique: true,
  },

  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
