const Notification = require("./model");

/**
 * Creates a notification for a user.
 */
async function createNotification(userId, type, message, metadata = {}) {
  const notificationData = { userId, type, message, metadata };
  try {
    return await Notification.create(notificationData);
  } catch (error) {
    console.error("Error creating notification:", error);
    console.error("Notification data attempted:", notificationData);
    throw error;
  }
}

/**
 * Fetches all notifications for a user.
 */
async function getUserNotifications(userId) {
  return await Notification.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });
}

/**
 * Fetches a notification by its ID.
 */
async function getNotificationById(notificationId) {
  return await Notification.findOne({
    where: { id: notificationId },
  });
}

/**
 * Marks a notification as read.
 */
async function markNotificationAsRead(id) {
  const notification = await Notification.findByPk(id);
  if (notification) {
    notification.isRead = true;
    await notification.save();
  }
  return notification;
}

/**
 * Deletes a notification.
 */
async function deleteNotification(id) {
  const notification = await Notification.findByPk(id);
  if (notification) {
    await notification.destroy();
  }
  return notification;
}

module.exports = {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification,
  getNotificationById,
};
