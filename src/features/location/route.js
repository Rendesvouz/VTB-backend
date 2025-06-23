const express = require("express");
const controller = require("./controller");

const router = express.Router();

// Driver Location Routes
router.post("/driver-location", controller.createDriverLocation);
router.get("/driver-location/:driverId", controller.getDriverLocationById);
router.get("/listing-location/:listingId", controller.getListingLocationById);

module.exports = router;
