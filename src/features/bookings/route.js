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
//router.put("/", controller.updatecreateBooking);
// router.post(
//   "/cancel",
//   validateJwt(["User", "Therapist", "LifeCoach"]),
//   isUserSubscribed(["Basic", "free_trial", "Premium Plan", "Ultimate"]),
//   cancelAppointmentController
// );
// appointmentRouter.get(
//   "/upcoming",
//   validateJwt(["Therapist", "User", "LifeCoach"]),
//   getAppointmentsController
// );
// appointmentRouter.get(
//   "/:appointmentId",
//   validateJwt(["User", "Therapist", "LifeCoach"]),
//   getAppointmentByIdController
// );
// appointmentRouter.get(
//   "/schedule/:providerId",
//   validateJwt(["User", "Therapist", "LifeCoach"]),
//   getscheduleByIdController
// );

// appointmentRouter.put(
//   "/:appointmentId/reschedule",
//   validateJwt(["User", "Therapist", "LifeCoach"]),
//   isUserSubscribed(["Basic", "free_trial", "Premium Plan", "Ultimate"]),
//   rescheduleAppointmentController
// );
// appointmentRouter.put(
//   "/confirm-reschedule",
//   validateJwt(["User", "Therapist", "LifeCoach"]),
//   isUserSubscribed(["Basic", "free_trial", "Premium Plan", "Ultimate"]),
//   confirmRescheduleController
// );

module.exports = router;
