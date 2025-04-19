const express = require("express");
const { authenticate } = require("../middleware/authmiddleware");
//const { authorize } = require("../middleware/authmiddleware");

const authRoutes = require("../features/authentication/routes");
const profiles = require("../features/profile/route");
const listings = require("../features/listings/route");
const bookings = require("../features/bookings/route");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/profile", authenticate(), profiles);
router.use("/listing", authenticate(), listings);
router.use("/books", authenticate(), bookings);

// Catch-All for Undefined Routes
router.use("*", (req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

module.exports = router;
