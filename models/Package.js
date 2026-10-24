import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Package name is required"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Package price is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Package description is required"],
    },
    features: {
      type: [String],
      required: [true, "Package features are required"],
      default: [],
    },
    popular: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      enum: ["purple", "pink", "gradient"],
      default: "purple",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Package", PackageSchema);
