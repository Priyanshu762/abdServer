import Inquiry from "../models/Inquiry.js";

// @desc    Submit new event inquiry (Public)
// @route   POST /api/inquiries
export async function createInquiry(req, res) {
  try {
    const { name, phone, occasion, packageChoice, venueArea, notes } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone number are required.",
      });
    }

    const inquiry = await Inquiry.create({
      name,
      phone,
      occasion: occasion || "Birthday Milestone",
      packageChoice: packageChoice || "The Signature Arch (₹2,999)",
      venueArea: venueArea || "Varanasi",
      notes: notes || "",
    });

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully! Our decorator will contact you.",
      data: inquiry,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

// @desc    Get all inquiries (Admin protected)
// @route   GET /api/inquiries
export async function getInquiries(req, res) {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
