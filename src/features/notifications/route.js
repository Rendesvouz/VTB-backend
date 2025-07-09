const express = require("express");
const { validateJwt } = require("../../middlewares/auth");
const {
  getNotifications,
  markAsRead,
  deleteNotification,
  getNotificationByIdController,
} = require("./controller");

const notificationRouter = express.Router();

notificationRouter.get("/", getNotifications);
notificationRouter.get("/:notificationId", getNotificationByIdController);
notificationRouter.patch("/:id/read", markAsRead);
notificationRouter.delete("/:id", deleteNotification);

module.exports = notificationRouter;
