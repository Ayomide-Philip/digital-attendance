import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
    },
    department: {
      type: String,
      minlength: 5,
      maxlength: 50,
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
    },
  },
  {
    timestamps: true,
  },
);

const User = models.User || model("User", userSchema);
export default User;
