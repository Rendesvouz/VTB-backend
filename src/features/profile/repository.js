const { UserProfile, TruckOwner, DriverProfile } = require("./model");
const { User } = require("../authentication/model");
const { Op, Sequelize } = require("sequelize");
const { DriverLocation } = require("../location/model");
const { AssignTruck } = require("../truckowners/model");
const { verification } = require("../onboarding/model");

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

// /**
//  * Finds a user profile by userId field, including the associated User model.
//  * @param {string} userId - The user's ID.
//  * @returns {Promise<UserProfile|null>} - The user profile with associated User if found, otherwise null.
//  */
// async function findtruckownerprofileById(truckownerId) {
//   try {
//     const truckProfile = await TruckOwner.findOne({
//       where: { truckownerId },
//       include: [
//         {
//           model: User,
//           as: "User",
//         },
//       ],
//     });
//     return truckProfile || null;
//   } catch (error) {
//     throw error;
//   }
// }

// /**
//  * Finds a user profile by userId field, including the associated User model.
//  * @param {string} userId - The user's ID.
//  * @returns {Promise<UserProfile|null>} - The user profile with associated User if found, otherwise null.
//  */

// async function finddriverrprofileById(driverId) {
//   try {
//     const driverProfile = await DriverProfile.findOne({
//       where: { driverId },
//       include: [
//         {
//           model: User,
//           as: "User",
//         },
//         {
//           model: DriverLocation,
//           as: "location",
//         },
//         {
//           model: AssignTruck,
//           as: "assignedTrucks",
//         },
//       ],
//     });
//     return driverProfile || null;
//   } catch (error) {
//     throw error;
//   }
// }

// async function getAlldriverprofile() {
//   try {
//     return await DriverProfile.findAll({
//       include: [
//         {
//           model: DriverLocation,
//           as: "location",
//         },
//         {
//           model: AssignTruck,
//           as: "assignedTrucks",
//         },
//       ],
//     });
//   } catch (err) {
//     console.error("Error fetching drivers profile:", err.message);
//     throw err;
//   }
// }

// async function getAllDriverProfilesByTruckOwner(truckownerId) {
//   try {
//     return await DriverProfile.findAll({
//       where: { truckownerId },
//       include: [
//         {
//           model: DriverLocation,
//           as: "location",
//         },
//         {
//           model: AssignTruck,
//           as: "assignedTrucks",
//         },
//       ],
//     });
//   } catch (err) {
//     console.error("Error fetching driver profiles:", err.message);
//     throw err;
//   }
// }

async function findtruckownerprofileById(truckownerId) {
  try {
    const truckProfile = await TruckOwner.findOne({
      where: { truckownerId },
      include: [
        {
          model: User,
          as: "User", // MUST match your TruckOwner.belongsTo alias
          include: [
            {
              model: verification,
              as: "verification", // MUST match your User.hasOne alias
            },
          ],
        },
      ],
    });
    return truckProfile || null;
  } catch (error) {
    console.error("Error loading truck owner profile:", error.message);
    throw error;
  }
}
async function finddriverrprofileById(driverId) {
  try {
    const driverProfile = await DriverProfile.findOne({
      where: { driverId },
      include: [
        {
          model: User,
          as: "User",
          include: [
            {
              model: verification,
              as: "verification",
            },
          ],
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
          model: User,
          as: "User",
          include: [
            {
              model: verification,
              as: "verification",
            },
          ],
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
  } catch (err) {
    console.error("Error fetching drivers profile:", err.message);
    throw err;
  }
}

async function getAlltruckownerprofile() {
  try {
    return await TruckOwner.findAll({
      include: [
        {
          model: User,
          as: "User",
          include: [
            {
              model: verification,
              as: "verification",
            },
          ],
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
          model: User,
          as: "User",
          include: [
            {
              model: verification,
              as: "verification",
            },
          ],
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
  } catch (err) {
    console.error("Error fetching driver profiles:", err.message);
    throw err;
  }
}

async function updateSuspensionStatus(driverId, isSuspended) {
  const [updatedCount] = await DriverProfile.update(
    { isSuspended },
    {
      where: { driverId },
    }
  );

  if (updatedCount === 0) {
    throw new Error("Driver profile not found or no update made.");
  }

  return await DriverProfile.findOne({ where: { driverId } });
}

async function findUserByAnyId({ userId, driverId, truckownerId }) {
  try {
    if (userId) {
      const user = await UserProfile.findOne({ where: { userId } });
      return user ? user.fullname : null;
    }

    if (driverId) {
      const driver = await DriverProfile.findOne({ where: { driverId } });
      return driver ? driver.fullName : null;
    }

    if (truckownerId) {
      const owner = await TruckOwner.findOne({ where: { truckownerId } });
      return owner ? owner.fullName : null;
    }

    throw new Error("At least one ID must be provided");
  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
    throw error;
  }
}

module.exports = {
  updateUserprofile,
  findUserByAnyId,
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
  updateSuspensionStatus,
  getAlltruckownerprofile,
};
