import { Schema, model, models } from "mongoose";

const attandanceSchema = new Schema(
  {
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    classesId: {
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
    description: {
      type: String,
      maxlength: 500,
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
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
          location: {
            type: {
              type: String,
              enum: ["Point"],
              required: true,
              default: "Point",
            },
            coordinates: {
              type: [Number],
              required: true,
            },
          },
          timestamp: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    allowedRadius: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

attandanceSchema.index({ location: "2dsphere" });
attandanceSchema.index({ classesId: 1, startTime: 1 }, { unique: true });
const Attandance = models.Attandance || model("Attandance", attandanceSchema);
export default Attandance;
