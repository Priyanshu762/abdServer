import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    event: {
      type: String,
      required: [true, "Event/Location details are required"],
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
    comment: {
      type: String,
      required: [true, "Testimonial comment is required"],
    },
    avatar: {
      type: String,
      default: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
    },
    cloudinaryPublicId: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "Recently",
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

export default mongoose.model("Testimonial", TestimonialSchema);
