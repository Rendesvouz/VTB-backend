const express = require("express");
const {
  getNotifications,
  markAsRead,
  deleteNotification,
  getNotificationByIdController,
} = require("./controller");

const router = express.Router();

router.get("/", getNotifications);
router.get("/:notificationId", getNotificationByIdController);
router.patch("/:id/read", markAsRead);
router.delete("/:id", deleteNotification);

module.exports = router;
