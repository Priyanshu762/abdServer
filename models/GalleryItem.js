import mongoose from "mongoose";

const GalleryItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["birthday", "wedding", "baby-shower", "corporate", "graduation", "anniversary", "other"],
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    cloudinaryPublicId: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      required: [true, "Alt text is required for SEO and accessibility"],
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: true, // Included in the Home Page Work Carousel when true
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("GalleryItem", GalleryItemSchema);
