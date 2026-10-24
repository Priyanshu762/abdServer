import GalleryItem from "../models/GalleryItem.js";

// @desc    Get all gallery items (supports ?featured=true and ?category=...)
// @route   GET /api/gallery
export async function getGalleryItems(req, res) {
  try {
    const filter = {};
    if (req.query.featured === "true") {
      filter.isFeatured = true;
    }
    if (req.query.category && req.query.category !== "all") {
      filter.category = req.query.category.toLowerCase();
    }

    const items = await GalleryItem.find(filter).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// @desc    Get single gallery item
// @route   GET /api/gallery/:id
export async function getGalleryItemById(req, res) {
  try {
    const item = await GalleryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// @desc    Create gallery item
// @route   POST /api/gallery
export async function createGalleryItem(req, res) {
  try {
    const item = await GalleryItem.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
export async function updateGalleryItem(req, res) {
  try {
    const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
export async function deleteGalleryItem(req, res) {
  try {
    const item = await GalleryItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }
    res.status(200).json({ success: true, message: "Gallery item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
