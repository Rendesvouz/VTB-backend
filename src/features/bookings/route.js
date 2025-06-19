const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.get("/user-booking", controller.getuserbooking);
router.get("/bookingbyid/:appointmentId", controller.getuserbookingbyid);
router.get("/all-booking", controller.getallbooking);
router.post("/booking", controller.createBooking);
router.put(
  "/update/:appointmentId",
  controller.updateAppointmentStatusController
);

router.put("/negotiation/:appointmentId", controller.negotiatePrice);

module.exports = router;
