import { Schema, model, models } from "mongoose";

const attandanceSchema = new Schema(
  {
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    classes: {
      type: Schema.Types.ObjectId,
      ref: "Classes",
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      trim: true,
      lowercase: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    students: {
      type: [
        {
          studentId: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
          status: {
            type: String,
            enum: ["present", "absent", "late"],
            default: "absent",
          },
          timestamp: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

const Attandance = models.Attandance || model("Attandance", attandanceSchema);
export default Attandance;
