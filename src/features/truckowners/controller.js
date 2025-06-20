const repository = require("./repository");
const profilerepository = require("../profile/repository");
const listingrepository = require("../listings/repository");
const { assignTruckSchema, employmentSchema } = require("./schema");

async function createemployment(req, res, next) {
  try {
    const truckOwnerId = req.userId;
    const validatedData = await employmentSchema.validateAsync(req.body);
    const newUserData = { ...validatedData, truckOwnerId };

    const newUser = await repository.createEmployment(newUserData);
    const update = await profilerepository.markDriverAsEmployed(
      validatedData.driverId
    );

    return res.status(201).json({
      data: newUser,
      message: "employment created successfully sucessfull.",
    });
  } catch (err) {
    console.error("employment error: ", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

async function createeassigntruck(req, res, next) {
  try {
    const truckOwnerId = req.userId;
    const validatedData = await assignTruckSchema.validateAsync(req.body);
    const newUserData = { ...validatedData, truckOwnerId };

    const newUser = await repository.createAssigntruck(newUserData);
    const assign = await listingrepository.updateListingDriverId(
      validatedData.truckId,
      validatedData.driverId
    );

    return res.status(201).json({
      data: newUser,
      message: "assign created successfully sucessfull.",
    });
  } catch (err) {
    console.error("assign error: ", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}
// controllers/employmentController.js

async function getEmploymentById(req, res) {
  try {
    const { id } = req.params;
    const result = await repository.getemploymentId(id);

    if (!result) {
      return res.status(404).json({ message: "Employment not found." });
    }

    return res.status(200).json({ data: result });
  } catch (error) {
    console.error("Get employment error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

async function updateEmployment(req, res) {
  try {
    const { id } = req.params;
    const validatedData = await employmentSchema.validateAsync(req.body);

    const updated = await repository.updateemployment(id, validatedData);

    return res.status(200).json({
      data: updated,
      message: "Employment updated successfully.",
    });
  } catch (error) {
    console.error("Update employment error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

async function deleteEmployment(req, res) {
  try {
    const { id } = req.params;
    await repository.deleteemployment(id);

    return res
      .status(200)
      .json({ message: "Employment deleted successfully." });
  } catch (error) {
    console.error("Delete employment error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

// ===================== AssignTruck ===================== //

async function getAssignTruckById(req, res) {
  try {
    const { id } = req.params;
    const result = await repository.getassigntruckId(id);

    if (!result) {
      return res.status(404).json({ message: "Assigned truck not found." });
    }

    return res.status(200).json({ data: result });
  } catch (error) {
    console.error("Get assignTruck error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

async function updateAssignTruck(req, res) {
  try {
    const { id } = req.params;
    const validatedData = await assignTruckSchema.validateAsync(req.body);

    const updated = await repository.updateassigntruck(id, validatedData);

    return res.status(200).json({
      data: updated,
      message: "Truck assignment updated successfully.",
    });
  } catch (error) {
    console.error("Update assignTruck error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

async function deleteAssignTruck(req, res) {
  try {
    const { id } = req.params;
    await repository.deleteassigntruck(id);

    return res
      .status(200)
      .json({ message: "Truck assignment deleted successfully." });
  } catch (error) {
    console.error("Delete assignTruck error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
/**
 * Controller to get all driver profiles assigned to a truck owner
 */
async function getDriversByTruckOwner(req, res) {
  try {
    const truckownerId = req.userId;

    if (!truckownerId) {
      return res.status(400).json({ message: "Truck owner ID is required." });
    }

    const drivers =
      await profilerepository.getAllDriverProfilesByTruckOwner(truckownerId);

    return res.status(200).json({
      data: drivers,
      message: "Driver profiles fetched successfully.",
    });
  } catch (err) {
    console.error("Error fetching driver profiles:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
}

module.exports = {
  createemployment,
  createeassigntruck,
  getEmploymentById,
  updateEmployment,
  deleteEmployment,
  getAssignTruckById,
  updateAssignTruck,
  deleteAssignTruck,
  getDriversByTruckOwner,
};
