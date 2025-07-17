const repository = require("./repository");
const {
  appointmentSchema,
  updateStatusSchema,
  updateappointmentSchema,
  negotiationSchema,
} = require("./schema");
const { createNotification } = require("../notifications/repository");
const { findUserByAnyId } = require("../profile/repository");

async function createBooking(req, res, next) {
  try {
    const userId = req.userId;
    const validatedData = await appointmentSchema.validateAsync(req.body);
    const newUserData = { ...validatedData, userId };
    const username = await findUserByAnyId({ userId });
    const action = validatedData.status;
    const providerId = validatedData.driverId;
    const newUser = await repository.createAppointment(newUserData);
    if (action === "request") {
      await createNotification(
        providerId,
        "request",
        `you have a booking request from ${username}`
      );
    }

    return res.status(201).json({
      message: "booking sucessfull.",
    });
  } catch (err) {
    console.error("booking error: ", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

/**
 * Controller to update the status of an appointment.
 */
async function updateAppointmentStatusController(req, res) {
  try {
    const { appointmentId } = req.params;
    const DriverId = userId;
    const { status } = req.body;
    const reciever = await repository.getAppointmentById(appointmentId);
    const recieverId = reciever.userId;
    const username = await findUserByAnyId({ DriverId });

    const updatedAppointment = await repository.updateAppointmentStatus(
      appointmentId,
      status
    );
    if (status === "accept") {
      await createNotification(
        recieverId,
        "accept",
        `your booking request have been accepted by ${username}`
      );
    }
    return res.status(200).json({
      message: " bookings updated successfully.",
      data: updatedAppointment,
    });
  } catch (error) {
    console.log(error);
  }
}

// Function to get user by ID
const getuserbooking = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await repository.getAllAppointmentsbyusersid(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to get user by ID
const getuserbookingbyid = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const user = await repository.getAppointmentById(appointmentId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to get user by ID
const getallbooking = async (req, res) => {
  try {
    const user = await repository.getAllAppointments();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

async function negotiatePrice(req, res) {
  try {
    const { appointmentId } = req.params;
    const user = req.userId;
    const driver = req.userId;
    const reciever = await repository.getAppointmentById(appointmentId);
    const driverId = reciever.driverId;
    const userId = reciever.userId;
    console.log("heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", driverId);
    console.log("heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", userId);
    const username = await findUserByAnyId({ userId });
    const drivername = await findUserByAnyId({ driverId });

    // Validate using Joi schema
    const validatedNegotiation = await negotiationSchema.validateAsync(
      req.body
    );

    const status = validatedNegotiation.status;
    const proposedBy = validatedNegotiation.proposedBy;

    const updatedAppointment = await repository.negotiateAppointment(
      appointmentId,
      validatedNegotiation
    );
    if (status === "proposed") {
      await createNotification(
        driverId,
        "negotiation",
        `You have a negotiation proposal from ${username}`
      );
    } else if (status === "countered") {
      await createNotification(
        userId,
        "negotiation",
        `Your negotiation has been countered by ${drivername}`
      );
    } else if ((status === "accepted") & (proposedBy === "user")) {
      await createNotification(
        driverId,
        "negotiation",
        `Your negotiation has been accepted by ${username}`
      );
    } else if ((status === "accepted") & (proposedBy === "driver")) {
      await createNotification(
        userId,
        "negotiation",
        `Your negotiation has been accepted by ${drivername}`
      );
    } else if ((status === "rejected") & (proposedBy === "user")) {
      await createNotification(
        driverId,
        "negotiation",
        `Your negotiation has been rejected by ${username}`
      );
    } else if ((status === "rejected") & (proposedBy === "driver")) {
      await createNotification(
        userId,
        "negotiation",
        `Your negotiation has been rejected by ${drivername}`
      );
    }
    //"accepted", "rejected", "countered"
    return res.status(200).json({
      data: updatedAppointment,
      message: "Negotiation updated successfully.",
    });
  } catch (err) {
    console.error("Negotiation error: ", err);
    return res.status(400).json({
      message: "Negotiation failed",
      error: err.message,
    });
  }
}

module.exports = {
  createBooking,
  getallbooking,
  //updatecreateBooking,
  updateAppointmentStatusController,
  getuserbooking,
  getuserbookingbyid,
  negotiatePrice,
};
