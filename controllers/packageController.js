import Package from "../models/Package.js";

// @desc    Get all pricing packages
// @route   GET /api/packages
export async function getPackages(req, res) {
  try {
    const packages = await Package.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: packages.length, data: packages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// @desc    Get single package
// @route   GET /api/packages/:id
export async function getPackageById(req, res) {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }
    res.status(200).json({ success: true, data: pkg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// @desc    Create package
// @route   POST /api/packages
export async function createPackage(req, res) {
  try {
    const pkg = await Package.create(req.body);
    res.status(201).json({ success: true, data: pkg });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

// @desc    Update package
// @route   PUT /api/packages/:id
export async function updatePackage(req, res) {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pkg) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }
    res.status(200).json({ success: true, data: pkg });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

// @desc    Delete package
// @route   DELETE /api/packages/:id
export async function deletePackage(req, res) {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }
    res.status(200).json({ success: true, message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
