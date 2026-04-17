import { Schema, model, models } from "mongoose";

const classSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 500,
      trim: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    students: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    rules: {
      type: {
        emailSuffix: {
          type: String,
          trim: true,
        },
        departmentCode: {
          type: [String],
          trim: true,
        },
      },
    },
  },
  {
    timestamps: true,
  },
);

classSchema.index({ teacher: 1, code: 1 }, { unique: true });
classSchema.index({ teacher: 1 });

const Classes = models.Classes || model("Classes", classSchema);
export default Classes;
