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
      lowercase: true,
      trim: true,
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
    school: {
      type: String,
      lowercase: true,
      trim: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save middleware to trim and lowercase school and matricNo fields
userSchema.pre("save", function (next) {
  if (this.school) {
    this.school = this.school.trim().toLowerCase();
    if (!this.school) this.school = undefined;
  }

  if (this.matricNo) {
    this.matricNo = this.matricNo.trim().toLowerCase();
    if (!this.matricNo) this.matricNo = undefined;
  }
});

userSchema.index(
  { school: 1, matricNo: 1 },
  {
    unique: true,
    partialFilterExpression: {
      matricNo: { $exists: true, $ne: null },
      school: { $exists: true, $ne: null },
    },
  },
);
const User = models.User || model("User", userSchema);
export default User;
