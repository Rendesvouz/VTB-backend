const { Appointment } = require("./model"); // Import Appointment model

/**
 * Creates a new appointment.
 */
async function createAppointment(appointmentData) {
  try {
    return await Appointment.create(appointmentData);
  } catch (err) {
    console.log("Error creating appointment: " + err.message);
    throw new Error("Error creating appointment: " + err.message);
  }
}

/**
 * Fetches all appointments for a specific provider.
 * @param {UUID} providerId - The provider's ID.
 * @returns {Promise<Appointment[]>} - List of appointments.
 */
async function getAllAppointments() {
  try {
    return await Appointment.findAll();
  } catch (err) {
    console.log("Error fetching appointments: " + err.message);
    throw new Error("Error fetching appointments: " + err.message);
  }
}

/**
 * Fetches all appointments for a specific provider.
 * @param {UUID} providerId - The provider's ID.
 * @returns {Promise<Appointment[]>} - List of appointments.
 */
async function getAllAppointmentsbyusersid(userId) {
  try {
    return await Appointment.findAll({
      where: { userId: userId },
    });
  } catch (err) {
    console.log("Error fetching appointments: " + err.message);
    throw new Error("Error fetching appointments: " + err.message);
  }
}

/**
 * Fetches a specific appointment by its ID.
 * @param {UUID} appointmentId - The appointment ID.
 * @returns {Promise<Appointment|null>} - The appointment details or null if not found.
 */
async function getAppointmentById(appointmentId) {
  try {
    return await Appointment.findByPk(appointmentId);
  } catch (err) {
    console.log("Error fetching appointments: " + err.message);
    throw new Error("Error fetching appointment by ID: " + err.message);
  }
}

/**
 * Updates an appointment by its ID.
 * @param {UUID} appointmentId - The appointment ID.
 * @param {Object} updateData - The data to update the appointment with.
 * @returns {Promise<Appointment>} - The updated appointment.
 */
async function updateAppointment(appointmentId, updateData) {
  try {
    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) throw new Error("Appointment not found");
    return await appointment.update(updateData);
  } catch (err) {
    console.log("Error updating appointment: " + err.message);
    throw new Error("Error updating appointment: " + err.message);
  }
}

/**
 * Deletes an appointment by its ID.
 * @param {UUID} appointmentId - The appointment ID.
 * @returns {Promise<boolean>} - Returns true if deletion was successful.
 */
async function deleteAppointment(appointmentId) {
  try {
    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) throw new Error("Appointment not found");
    await appointment.destroy();
    return true;
  } catch (err) {
    console.log("Error deleting appointment: " + err.message);
    throw new Error("Error deleting appointment: " + err.message);
  }
}

/**
 * Updates the status of an appointment.
 * @param {UUID} appointmentId - The appointment ID.
 * @param {string} status - The new status of the appointment.
 * @returns {Promise<Appointment>} - The updated appointment.
 */
async function updateAppointmentStatus(appointmentId, status) {
  try {
    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) throw new Error("Appointment not found");
    appointment.status = status;
    return await appointment.save();
  } catch (err) {
    console.log("Error updating appointment status: " + err.message);
    throw new Error("Error updating appointment status: " + err.message);
  }
}

/**
 * Reschedules an appointment by updating the start and end times.
 * @param {UUID} appointmentId - The appointment ID.
 * @param {UUID} userId - The user ID who is rescheduling the appointment.
 * @param {Date} newStartTime - The new start time.
 * @param {Date} newEndTime - The new end time.
 * @returns {Promise<Appointment>} - The rescheduled appointment.
 */
async function rescheduleAppointment(
  appointmentId,
  userId,
  newStartTime,
  newEndTime
) {
  try {
    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) throw new Error("Appointment not found");
    if (appointment.userId !== userId && appointment.providerId !== userId) {
      throw new Error("Unauthorized access");
    }
    appointment.startTime = newStartTime;
    appointment.endTime = newEndTime;
    appointment.status = "rescheduled";
    return await appointment.save();
  } catch (err) {
    console.log("Error rescheduling appointment: " + err.message);
    throw new Error("Error rescheduling appointment: " + err.message);
  }
}

/**
 * Cancels an appointment with an optional cancellation reason.
 * @param {UUID} appointmentId - The appointment ID.
 * @param {UUID} userId - The user ID who is cancelling the appointment.
 * @param {string} cancellationReason - The reason for cancellation.
 * @returns {Promise<Appointment>} - The cancelled appointment.
 */
async function cancelAppointment(appointmentId, userId, cancellationReason) {
  try {
    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) throw new Error("Appointment not found");
    if (appointment.userId !== userId && appointment.providerId !== userId) {
      throw new Error("Unauthorized access");
    }
    appointment.status = "cancelled";
    appointment.cancellationReason = cancellationReason;
    return await appointment.save();
  } catch (err) {
    console.log("Error cancelling appointment: " + err.message);
    throw new Error("Error cancelling appointment: " + err.message);
  }
}

module.exports = {
  createAppointment,
  getAllAppointmentsbyusersid,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  updateAppointmentStatus,
  rescheduleAppointment,
  cancelAppointment,
  getAllAppointments,
};
