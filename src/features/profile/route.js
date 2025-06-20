const express = require("express");
const controller = require("./controller");
const router = express.Router();
const {
  handlefileSizeLimitError,
  upload,
  fileUpload,
} = require("../../middleware/upload");

// Car Offering Routes
router.post(
  "/truckowner-profile",
  fileUpload,
  handlefileSizeLimitError,
  upload.fields([{ name: "supportingDocuments", maxCount: 5 }]),
  controller.createTruckOwnerProfile
);
router.post("/profile", controller.createUserprofile);
router.put("/update-profile", controller.updateUserprofileController);
router.get("/profiles/:userId", controller.getUsersprofileById);
router.get("/profile", controller.getUserprofileById);
router.get("/truckprofiles/:truckownerId", controller.getTruckownerprofileById);
router.get("/truckprofile", controller.gettruckownerprofileById);
router.put(
  "/update-truckownerprofile",
  controller.updatetruckprofileController
);
router.put("/update-driverprofile", controller.updatedriverprofileController);
router.get("/driverprofiles/:driverId", controller.getDriverprofileById);
router.get("/driverprofile", controller.getdriverprofileById);
router.get("/all-driverprofile", controller.getalldriver);
router.post(
  "/driver-profile",
  fileUpload,
  handlefileSizeLimitError,
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "supportingDocuments", maxCount: 10 },
  ]),
  controller.createdriverProfile
);

module.exports = router;
