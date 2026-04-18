import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
    },
    displayName: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    matricNo: {
      type: String,
      maxlength: 20,
      sparse: true,
    },
    department: {
      type: String,
      default: "",
    },
    level: {
      type: String,
      enum: ["100", "200", "300", "400", "500", "NA"],
      default: "NA",
    },
    role: {
      type: String,
      enum: ["student", "superadmin", "teacher", "NA"],
      required: true,
      default: "NA",
    },
    image: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      select: false,
    },
    googleId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const User = models.User || model("User", userSchema);
export default User;
