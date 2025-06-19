const admin = require("../utils/firebase");

async function sendNotification(token, title, body, data = {}) {
  const message = {
    notification: { title, body },
    data, // Optional custom key-value pairs
    token, // Device FCM token
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Notification sent:", response);
    return response;
  } catch (err) {
    console.error("Error sending notification:", err);
    throw err;
  }
}

module.exports = sendNotification;
