const repository = require("./repository");
const {
  createprofileSchema,
  updatetruckOwnerSchema,
  updatedriverSchema,
} = require("./schema");

/**
 * Creates a new car offering.
 */
async function createTruckOwnerProfile(req, res, next) {
  try {
    const truckownerId = req.userId;
    const offeringPictureUrls = [];

    if (req.files && req.files.supportingDocuments) {
      const files = req.files.supportingDocuments.slice(0, 5);
      for (const file of files) {
        const offeringPictureUrl = await req.storage.uploadFile(
          file.buffer,
          `supportingDocuments/${truckownerId}-${file.originalname}`
        );
        offeringPictureUrls.push(offeringPictureUrl);
      }
    }

    const offeringData = {
      ...req.body,
      supportingDocuments: offeringPictureUrls,
    };

    //const validatedData = await listingSchema.validateAsync(offeringData);

    const completeOfferingData = {
      ...offeringData,
      truckownerId: truckownerId,
    };
    const newOffering = await repository.createtruckowner(completeOfferingData);
    return res.status(200).json({
      message: "truck owner profile  created successfully",
      offering: newOffering,
    });
  } catch (err) {
    console.log(err);
    console.error("Error in createCarOffering:", err);
    next(err);
  }
}

/**
 * Creates a new car offering.
 */
async function createdriverProfile(req, res, next) {
  try {
    const driverId = req.userId;
    const profilePictureUrls = [];
    const supportingDocumentUrls = [];

    // Upload profile picture(s)
    if (req.files && req.files.profilePicture) {
      const files = req.files.profilePicture.slice(0, 1);
      for (const file of files) {
        const url = await req.storage.uploadFile(
          file.buffer,
          `profilePicture/${driverId}-${file.originalname}`
        );
        profilePictureUrls.push(url);
      }
    }

    // Upload supporting document images
    if (req.files && req.files.supportingDocuments) {
      const files = req.files.supportingDocuments.slice(0, 10);
      for (const file of files) {
        const url = await req.storage.uploadFile(
          file.buffer,
          `supportingDocuments/${driverId}-${file.originalname}`
        );
        supportingDocumentUrls.push(url);
      }
    }

    const profileData = {
      ...req.body,
      profilePicture: profilePictureUrls[0] || null,
      supportingDocuments: supportingDocumentUrls,
      driverId: driverId,
    };

    const newProfile = await repository.createdriverprofile(profileData);

    return res.status(200).json({
      message: "Driver profile created successfully",
      profile: newProfile,
    });
  } catch (err) {
    console.error("Error in createdriverProfile:", err);
    next(err);
  }
}

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

async function updatetruckprofileController(req, res, next) {
  try {
    const truckownerId = req.userId;

    // Validate the update data
    const validatedData = await updatetruckOwnerSchema.validateAsync(req.body);

    const updatedUser = await repository.updatetruckownerprofile(
      truckownerId,
      validatedData
    );

    // if (!updatedUser) {
    //   return res.status(404).json({ message: "User profile not found." });
    // }

    return res.status(200).json({
      message: "truck owner updated successfully.",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Update truck owner Error: ", err);
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

// Function to get user by ID
const getTruckownerprofileById = async (req, res) => {
  const { truckownerId } = req.params;
  try {
    const user = await repository.findtruckownerprofileById(truckownerId);
    if (!user) {
      return res.status(404).json({ message: "truck owner not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to get user by ID
const gettruckownerprofileById = async (req, res) => {
  const truckownerId = req.userId;
  try {
    const user = await repository.findtruckownerprofileById(truckownerId);
    if (!user) {
      return res.status(404).json({ message: "truck owner not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to get user by ID
const getDriverprofileById = async (req, res) => {
  const { driverId } = req.params;
  try {
    const user = await repository.finddriverrprofileById(driverId);
    if (!user) {
      return res.status(404).json({ message: "driver profile not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to get user by ID
const getdriverprofileById = async (req, res) => {
  const truckownerId = req.userId;
  try {
    const user = await repository.finddriverrprofileById(truckownerId);
    if (!user) {
      return res.status(404).json({ message: "driver profile not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

async function updatedriverprofileController(req, res, next) {
  try {
    const driverId = req.userId;

    // Validate the update data
    const validatedData = await updatedriverSchema.validateAsync(req.body);

    const updatedUser = await repository.updatedriverprofile(
      driverId,
      validatedData
    );

    // if (!updatedUser) {
    //   return res.status(404).json({ message: "User profile not found." });
    // }

    return res.status(200).json({
      message: "driver profile updated successfully.",
      data: updatedUser,
    });
  } catch (err) {
    console.error("driver profile error Error: ", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

async function getalldriver(req, res, next) {
  try {
    const offerings = await repository.getAlldriverprofile();
    res.status(200).json({
      message: "driver profile retrieved successfully",
      data: offerings,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUserprofileById,
  getDriverprofileById,
  getdriverprofileById,
  createUserprofile,
  getUsersprofileById,
  updateUserprofileController,
  createTruckOwnerProfile,
  getTruckownerprofileById,
  gettruckownerprofileById,
  updatetruckprofileController,
  createdriverProfile,
  updatedriverprofileController,
  getalldriver,
};
