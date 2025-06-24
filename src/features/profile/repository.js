const { UserProfile, TruckOwner, DriverProfile } = require("./model");
const { User } = require("../authentication/model");
const { Op, Sequelize } = require("sequelize");
const { DriverLocation } = require("../location/model");
const { AssignTruck } = require("../truckowners/model");

// Create a new user
/**
 * Creates a new user in the database.
 * @param {Object} data - The user data.
 * @returns {Promise<User>} - The newly created user.
 */
async function createUserprofile(data) {
  try {
    const user = await UserProfile.create(data);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Creates a new car offering.
 */
async function createtruckowner(offeringData) {
  return await TruckOwner.create(offeringData);
}

/**
 * Creates a new car offering.
 */
async function createdriverprofile(offeringData) {
  return await DriverProfile.create(offeringData);
}

async function updateUserprofile(userId, updates) {
  try {
    const result = await UserProfile.update(updates, {
      where: { userId: userId },
      returning: true,
    });
    return result[1][0];
  } catch (error) {
    console.log("Error updating user:", error);
    throw error;
  }
}

async function updatetruckownerprofile(truckownerId, updates) {
  try {
    const result = await TruckOwner.update(updates, {
      where: { truckownerId: truckownerId },
      returning: true,
    });
    return result[1][0];
  } catch (error) {
    console.log("Error updating truck owner:", error);
    throw error;
  }
}

async function updatedriverprofile(driverId, updates) {
  try {
    const result = await DriverProfile.update(updates, {
      where: { driverId: driverId },
      returning: true,
    });
    return result[1][0];
  } catch (error) {
    console.log("Error updating driver profile:", error);
    throw error;
  }
}

async function markDriverAsEmployed(driverId) {
  try {
    const driver = await DriverProfile.findOne({ where: { driverId } });
    if (!driver) throw new Error("Driver not found");

    driver.status = "employed";
    await driver.save();
    return driver;
  } catch (error) {
    console.log("Error updating driver status to employed:", error);
    throw error;
  }
}

async function markTruckOwnerForDriver(driverId, truckownerId) {
  try {
    const driver = await DriverProfile.findOne({ where: { driverId } });
    if (!driver) throw new Error("Driver not found");

    driver.truckownerId = truckownerId;
    await driver.save();
    return driver;
  } catch (error) {
    console.log("Error updating driver truckownerId:", error);
    throw error;
  }
}

/**
 * Finds a user profile by userId field, including the associated User model.
 * @param {string} userId - The user's ID.
 * @returns {Promise<UserProfile|null>} - The user profile with associated User if found, otherwise null.
 */
async function findUserprofileById(userId) {
  try {
    const userProfile = await UserProfile.findOne({
      where: { userId },
      include: [
        {
          model: User,
          as: "User",
        },
      ],
    });
    return userProfile || null;
  } catch (error) {
    throw error;
  }
}

/**
 * Finds a user profile by userId field, including the associated User model.
 * @param {string} userId - The user's ID.
 * @returns {Promise<UserProfile|null>} - The user profile with associated User if found, otherwise null.
 */
async function findtruckownerprofileById(truckownerId) {
  try {
    const truckProfile = await TruckOwner.findOne({
      where: { truckownerId },
      include: [
        {
          model: User,
          as: "User",
        },
      ],
    });
    return truckProfile || null;
  } catch (error) {
    throw error;
  }
}

/**
 * Finds a user profile by userId field, including the associated User model.
 * @param {string} userId - The user's ID.
 * @returns {Promise<UserProfile|null>} - The user profile with associated User if found, otherwise null.
 */

async function finddriverrprofileById(driverId) {
  try {
    const driverProfile = await DriverProfile.findOne({
      where: { driverId },
      include: [
        {
          model: User,
          as: "User",
        },
        {
          model: DriverLocation,
          as: "location",
        },
        {
          model: AssignTruck,
          as: "assignedTrucks",
        },
      ],
    });
    return driverProfile || null;
  } catch (error) {
    throw error;
  }
}

async function getAlldriverprofile() {
  try {
    return await DriverProfile.findAll({
      include: [
        {
          model: DriverLocation,
          as: "location",
        },
        {
          model: AssignTruck,
          as: "assignedTrucks",
        },
      ],
    });
  } catch (err) {
    console.error("Error fetching drivers profile:", err.message);
    throw err;
  }
}

async function getAllDriverProfilesByTruckOwner(truckownerId) {
  try {
    return await DriverProfile.findAll({
      where: { truckownerId },
      include: [
        {
          model: DriverLocation,
          as: "location",
        },
        {
          model: AssignTruck,
          as: "assignedTrucks",
        },
      ],
    });
  } catch (err) {
    console.error("Error fetching driver profiles:", err.message);
    throw err;
  }
}

module.exports = {
  updateUserprofile,
  finddriverrprofileById,
  createUserprofile,
  findUserprofileById,
  createtruckowner,
  findtruckownerprofileById,
  updatetruckownerprofile,
  createdriverprofile,
  updatedriverprofile,
  markDriverAsEmployed,
  getAlldriverprofile,
  getAllDriverProfilesByTruckOwner,
  markTruckOwnerForDriver,
};
