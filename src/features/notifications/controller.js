const repository = require("./repository");

/**
 * Fetches all notifications for the logged-in user.
 */
async function getNotifications(req, res) {
  try {
    const userId = req.userId;
    const notifications = await repository.getUserNotifications(userId);
    return res.status(200).json({
      message: "Notifications retrieved successfully",
      data: { notifications },
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 * Fetches a notification by its ID.
 */
async function getNotificationByIdController(req, res) {
  try {
    const { notificationId } = req.params;

    if (!notificationId) {
      return res.status(400).json({ message: "Notification ID is required." });
    }

    const notification = await repository.getNotificationById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }

    return res.status(200).json({
      message: "Notification retrieved successfully.",
      data: { notification },
    });
  } catch (error) {
    console.error("Error fetching notification:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 * Marks a notification as read.
 */
async function markAsRead(req, res) {
  try {
    const { id } = req.params;
    const notification = await repository.markNotificationAsRead(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.status(200).json({
      message: "Notification marked as read",
      data: { notification },
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 * Deletes a notification.
 */
async function deleteNotification(req, res) {
  try {
    const { id } = req.params;
    const notification = await repository.deleteNotification(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res
      .status(200)
      .json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getNotifications,
  markAsRead,
  deleteNotification,
  getNotificationByIdController,
};
