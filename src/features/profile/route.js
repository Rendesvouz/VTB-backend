const express = require("express");
const controller = require("./controller");
const router = express.Router();

router.post("/profile", controller.createUserprofile);
router.put("/update-profile", controller.updateUserprofileController);
router.get("/profiles/:userId", controller.getUsersprofileById);
router.get("/profile", controller.getUserprofileById);

module.exports = router;
