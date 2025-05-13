const express = require("express");
const {
  createCarOffering,
  updateCarOffering,
  // getAllOffering,
  // getOfferingbyid,
  deleteListingById,
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
router.delete("/offering/:id", deleteListingById);

module.exports = router;
