const express = require("express");
const {
  createCarOffering,
  updateCarOffering,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  deleteListingById,
  getalltruckownerlisting,
  updateInspectionController,
} = require("./controller");

const {
  handlefileSizeLimitError,
  upload,
  fileUpload,
} = require("../../middleware/upload");

const router = express.Router();

// Car Offering Routes
router.post(
  "/offerings",
  fileUpload,
  handlefileSizeLimitError,
  upload.fields([{ name: "pictures", maxCount: 5 }]),
  createCarOffering
);

router.put(
  "/offerings/:listingId",
  fileUpload,
  handlefileSizeLimitError,
  upload.fields([{ name: "pictures", maxCount: 5 }]),
  updateCarOffering
);
// router.get("/offerings/:id", getOfferingbyid);
// router.get("/all-offerings", getAllOffering);
router.put("isinspected/:id", updateInspectionController);
router.delete("/offering/:id", deleteListingById);
router.post("/category", createCategory);
router.get("/category", getAllCategories);
router.get("/category/:id", getCategoryById);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);
router.get("/all-truckowner-listing", getalltruckownerlisting);

module.exports = router;
