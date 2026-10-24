import cloudinary from "../config/cloudinary.js";

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
export async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Please provide an image file" });
    }

    // Check if Cloudinary credentials are set, else return mock URL or error
    if (
      !process.env.CLOUDINARY_API_KEY ||
      process.env.CLOUDINARY_API_KEY === "placeholder_api_key"
    ) {
      console.warn("[Upload] Real Cloudinary API keys not configured. Simulating image response.");
      // Provide a clean fallback or simulate upload for local testing
      const base64Data = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      return res.status(200).json({
        success: true,
        url: base64Data,
        public_id: `local_${Date.now()}`,
        simulated: true,
      });
    }

    // Upload via stream
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "affordable_balloons",
        resource_type: "image",
        transformation: [
          { quality: "auto", fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error) {
          console.error("[Cloudinary] Upload error:", error);
          return res.status(500).json({ success: false, message: error.message });
        }

        res.status(200).json({
          success: true,
          url: result.secure_url,
          public_id: result.public_id,
          format: result.format,
          width: result.width,
          height: result.height,
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// @desc    Delete image from Cloudinary
// @route   DELETE /api/upload/:publicId
export async function deleteImage(req, res) {
  try {
    const { publicId } = req.params;
    if (!publicId) {
      return res.status(400).json({ success: false, message: "Missing public_id" });
    }

    if (
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_KEY !== "placeholder_api_key"
    ) {
      await cloudinary.uploader.destroy(publicId);
    }

    res.status(200).json({ success: true, message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
