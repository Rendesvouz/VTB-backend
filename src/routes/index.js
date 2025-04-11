const express = require("express");
//const { authenticate } = require("../middleware/authentication");
const { authorize } = require("../middleware/authmiddleware");

const authRoutes = require("../features/authentication/routes");

const router = express.Router();

router.use("/auth", authRoutes);

// Catch-All for Undefined Routes
router.use("*", (req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

module.exports = router;
