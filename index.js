import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { protect } from "./middleware/auth.js";
import { upload } from "./middleware/upload.js";

// Controllers
import * as authController from "./controllers/authController.js";
import * as serviceController from "./controllers/serviceController.js";
import * as packageController from "./controllers/packageController.js";
import * as testimonialController from "./controllers/testimonialController.js";
import * as galleryController from "./controllers/galleryController.js";
import * as uploadController from "./controllers/uploadController.js";
import * as inquiryController from "./controllers/inquiryController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS configuration (allow requests from Next.js frontend)
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:3000",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Allow during development
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "Affordable Balloon Decoration Backend",
  });
});

// Authentication Routes
app.post("/api/auth/login", authController.login);
app.get("/api/auth/me", protect, authController.getMe);
app.put("/api/auth/updatepassword", protect, authController.updatePassword);

// Service Routes
app.get("/api/services", serviceController.getServices);
app.get("/api/services/:id", serviceController.getServiceById);
app.post("/api/services", protect, serviceController.createService);
app.put("/api/services/:id", protect, serviceController.updateService);
app.delete("/api/services/:id", protect, serviceController.deleteService);

// Pricing Package Routes
app.get("/api/packages", packageController.getPackages);
app.get("/api/packages/:id", packageController.getPackageById);
app.post("/api/packages", protect, packageController.createPackage);
app.put("/api/packages/:id", protect, packageController.updatePackage);
app.delete("/api/packages/:id", protect, packageController.deletePackage);

// Testimonial Routes
app.get("/api/testimonials", testimonialController.getTestimonials);
app.get("/api/testimonials/:id", testimonialController.getTestimonialById);
app.post("/api/testimonials", protect, testimonialController.createTestimonial);
app.put("/api/testimonials/:id", protect, testimonialController.updateTestimonial);
app.delete("/api/testimonials/:id", protect, testimonialController.deleteTestimonial);

// Gallery & Work Carousel Routes
app.get("/api/gallery", galleryController.getGalleryItems);
app.get("/api/gallery/:id", galleryController.getGalleryItemById);
app.post("/api/gallery", protect, galleryController.createGalleryItem);
app.put("/api/gallery/:id", protect, galleryController.updateGalleryItem);
app.delete("/api/gallery/:id", protect, galleryController.deleteGalleryItem);

// Image Upload Routes (Multer + Cloudinary)
app.post("/api/upload", protect, upload.single("image"), uploadController.uploadImage);
app.delete("/api/upload/:publicId", protect, uploadController.deleteImage);

// Event Inquiry Routes (Public Submission + Admin Listing)
app.post("/api/inquiries", inquiryController.createInquiry);
app.get("/api/inquiries", protect, inquiryController.getInquiries);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// Global Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, _next) => {
  console.error("[Server Error]", err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`[Server] Affordable Balloon Backend running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});

export default app;
