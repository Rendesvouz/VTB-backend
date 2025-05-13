const express = require("express");
const { getAllOffering, getOfferingbyid } = require("./controller");

const router = express.Router();

router.get("/offerings/:id", getOfferingbyid);
router.get("/all-offerings", getAllOffering);

module.exports = router;
