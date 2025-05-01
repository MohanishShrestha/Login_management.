import { model, Schema } from "mongoose";

const WebSchema = Schema(
  {
    fullName: {
      type: String,
      required: [true, "fulName is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      // unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    dob: {
      type: Date,
      required: [true, "dob is required"],
    },
    gender: {
      type: String,
      required: [true, "gender is required"],
    },
    role: {
      type: String,
      required: [true, "role is required"],
    },
    isVerified: {
      type: Boolean,
      required: [true, "isVerified is required"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id; // Rename _id to id
        delete ret._id; // Remove _id
        delete ret.__v; // Remove version key
      },
    },
  }
);

let Web = model("Web", WebSchema);

export default Web;
