import Service from "../models/Service.js";

// @desc    Get all services
// @route   GET /api/services
export async function getServices(req, res) {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// @desc    Get single service by id or slug
// @route   GET /api/services/:id
export async function getServiceById(req, res) {
  try {
    const query = req.params.id.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: req.params.id }
      : { slug: req.params.id };

    const service = await Service.findOne(query);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// @desc    Create service
// @route   POST /api/services
export async function createService(req, res) {
  try {
    const { title, slug, description, icon, priceRange, features, image, cloudinaryPublicId, order } = req.body;

    const computedSlug = slug || title.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");

    const service = await Service.create({
      title,
      slug: computedSlug,
      description,
      icon: icon || "🎈",
      priceRange,
      features: Array.isArray(features) ? features : [],
      image,
      cloudinaryPublicId: cloudinaryPublicId || "",
      order: order || 0,
    });

    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

// @desc    Update service
// @route   PUT /api/services/:id
export async function updateService(req, res) {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

// @desc    Delete service
// @route   DELETE /api/services/:id
export async function deleteService(req, res) {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.status(200).json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
