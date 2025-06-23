const express = require("express");
const { authenticate } = require("../middleware/authmiddleware");
//const { authorize } = require("../middleware/authmiddleware");

const authRoutes = require("../features/authentication/routes");
const profiles = require("../features/profile/route");
const listings = require("../features/listings/route");
const bookings = require("../features/bookings/route");
const list = require("../features/listings/routes");
const truckowner = require("../features/truckowners/routes");
const Location = require("../features/location/route");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/profile", authenticate(), profiles);
router.use("/listing", authenticate(), listings);
router.use("/listings", list);
router.use("/books", authenticate(), bookings);
router.use("/truckowner", authenticate(), truckowner);
router.use("/location", authenticate(), Location);

// Catch-All for Undefined Routes
router.use("*", (req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

module.exports = router;
