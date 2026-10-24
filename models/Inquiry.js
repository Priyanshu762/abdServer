import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Host name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    occasion: {
      type: String,
      default: "Birthday Milestone",
    },
    packageChoice: {
      type: String,
      default: "The Signature Arch (₹2,999)",
    },
    venueArea: {
      type: String,
      default: "Varanasi",
      trim: true,
    },
    notes: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "booked", "cancelled"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Inquiry", InquirySchema);
