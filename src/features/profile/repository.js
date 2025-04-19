const { UserProfile } = require("./model");
const { User } = require("../authentication/model");
const { Op, Sequelize } = require("sequelize");

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

// /**
//  * Finds a user profile by userId field.
//  * @param {string} userId - The user's ID.
//  * @returns {Promise<UserProfile|null>} - The user profile if found, otherwise null.
//  */
// async function findUserprofileById(userId) {
//   try {
//     const user = await UserProfile.findOne({ where: { userId } });
//     return user || null;
//   } catch (error) {
//     throw error;
//   }
// }

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

module.exports = {
  updateUserprofile,
  createUserprofile,
  findUserprofileById,
};
