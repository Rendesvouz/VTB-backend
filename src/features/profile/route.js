const express = require("express");
const controller = require("./controller");
const router = express.Router();

router.post("/profile", controller.createUserprofile);
router.put("/update-profile", controller.updateUserprofileController);
//router.post("/logout", logout);
router.get("/profile", controller.getUserprofileById);
router.get("/profiles/:userId", controller.getUsersprofileById);

module.exports = router;
