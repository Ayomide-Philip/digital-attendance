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
      minlength: 5,
    },
    title: {
      type: String,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    matricNo: {
      type: String,
      minlength: 5,
      maxlength: 20,
      unique: true,
      default: "",
    },
    department: {
      type: String,
      minlength: 5,
      maxlength: 50,
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
  },
  {
    timestamps: true,
  },
);

const User = models.User || model("User", userSchema);
export default User;
