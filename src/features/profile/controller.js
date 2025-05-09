const repository = require("./repository");
const { createprofileSchema } = require("./schema");

async function createUserprofile(req, res, next) {
  try {
    const userId = req.userId;
    const validatedData = await createprofileSchema.validateAsync(req.body);
    const newUserData = { ...validatedData, userId };

    const newUser = await repository.createUserprofile(newUserData);

    return res.status(201).json({
      message: "profile created successfully.",
    });
  } catch (err) {
    console.error("Signup Error: ", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

async function updateUserprofileController(req, res, next) {
  try {
    const userId = req.userId;

    // Validate the update data
    const validatedData = await createprofileSchema.validateAsync(req.body);

    const updatedUser = await repository.updateUserprofile(
      userId,
      validatedData
    );

    // if (!updatedUser) {
    //   return res.status(404).json({ message: "User profile not found." });
    // }

    return res.status(200).json({
      message: "Profile updated successfully.",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Update Profile Error: ", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

// Function to get user by ID
const getUsersprofileById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await repository.findUserprofileById(userId);
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
const getUserprofileById = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await repository.findUserprofileById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getUserprofileById,
  createUserprofile,
  getUsersprofileById,
  updateUserprofileController,
};
