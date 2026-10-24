import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Service slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Service description is required"],
    },
    icon: {
      type: String,
      default: "🎈",
    },
    priceRange: {
      type: String,
      required: [true, "Price range is required"],
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      required: [true, "Service image is required"],
    },
    cloudinaryPublicId: {
      type: String,
      default: "",
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

export default mongoose.model("Service", ServiceSchema);
