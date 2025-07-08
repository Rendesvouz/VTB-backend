const express = require("express");
const controller = require("./controller");
const upload = require("../../middleware/uploads");

const router = express.Router();

/**
 * Routes for company onboarding
 */
router.post("/verify", controller.onboardCompany);

router.post("/upload", upload, controller.uploadFiles);

router.put("/status/:userId", controller.updateCompanystatus);

router.get("/verify/all", controller.getAllOnboardedCompanies);

router.get("/:userId", controller.getOnboardedCompanyById);

module.exports = router;
