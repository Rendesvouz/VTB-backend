const express = require("express");
//const { validateJwt } = require("../../middlewares/auth");
const {
  signup,
  login,
  refreshToken,
  logout,
  DriverSignup,
  AdminSignup,
  verifyEmail,
  resendVerificationCode,
  forgotPassword,
  resetPassword,
  getUsersById,
} = require("./controller");
const router = express.Router();

// Signup routes
router.post("/signup", signup);
//router.post("/admin-signup", validateJwt(["SuperAdmin"]), AdminSignup);
router.post("/driver-signup", DriverSignup);

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/verify/:code", verifyEmail);
router.post("/resend-verification", resendVerificationCode);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/user/:id", getUsersById);

module.exports = router;
