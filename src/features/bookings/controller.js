const repository = require("./repository");
const {
  appointmentSchema,
  updateStatusSchema,
  updateappointmentSchema,
  negotiationSchema,
} = require("./schema");

async function createBooking(req, res, next) {
  try {
    const userId = req.userId;
    const validatedData = await appointmentSchema.validateAsync(req.body);
    const newUserData = { ...validatedData, userId };

    const newUser = await repository.createAppointment(newUserData);

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

// async function updatecreateBooking(req, res, next) {
//   try {
//     const userId = req.userId;

//     // Validate the update data
//     const validatedData = await updateappointmentSchema.validateAsync(req.body);

//     const updatedUser = await repository.updateAppointment(
//       userId,
//       validatedData
//     );
//     return res.status(200).json({
//       message: "Profile updated successfully.",
//       data: updatedUser,
//     });
//   } catch (err) {
//     console.error("Update Profile Error: ", err);
//     return res
//       .status(500)
//       .json({ message: "Internal Server Error", error: err.message });
//   }
// }

/**
 * Controller to update the status of an appointment.
 */
async function updateAppointmentStatusController(req, res) {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    const updatedAppointment = await repository.updateAppointmentStatus(
      appointmentId,
      status
    );
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

    // Validate using Joi schema
    const validatedNegotiation = await negotiationSchema.validateAsync(
      req.body
    );

    const updatedAppointment = await repository.negotiateAppointment(
      appointmentId,
      validatedNegotiation
    );

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
