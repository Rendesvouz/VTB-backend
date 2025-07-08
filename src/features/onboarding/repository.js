const { verification } = require("./model");
const { TruckOwner, DriverProfile } = require("../profile/model");

const onboard = async (userId, userData) => {
  try {
    const onboarded = await verification.create({
      userId,
      ...userData,
    });
    return onboarded;
  } catch (error) {
    console.error("Error in creating Hrfunction:", error);
    throw error;
  }
};

const saveUploadedFiles = async (userId, files) => {
  try {
    // Find the existing onboarding entry
    const onboarding = await verification.findOne({ where: { userId } });
    if (!onboarding) {
      throw new Error("Company onboarding record not found.");
    }

    // Append new files to existing ones
    const existingFiles = onboarding.supportingDocuments || [];
    const updatedFiles = [...existingFiles, ...files];

    // Update onboarding record with new files
    onboarding.supportingDocuments = updatedFiles;
    await onboarding.save();

    return onboarding;
  } catch (error) {
    console.error("Error saving uploaded files:", error);
    throw error;
  }
};

// const updateonbordingstatus = async (userId, updateData) => {
//   try {
//     updateData.updatedAt = new Date();

//     // Ensure verifiedAt is set when the verification status is "verified"
//     if (updateData.verificationStatus === "verified") {
//       updateData.verifiedAt = new Date();
//     }

//     const [updated] = await verification.update(updateData, {
//       where: { userId },
//     });

//     if (!updated) throw new Error("Company not found");

//     return await verification.findOne({ where: { userId } });
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

const updateonbordingstatus = async (userId, updateData) => {
  try {
    updateData.updatedAt = new Date();

    // If verificationStatus is "verified", update verifiedAt and isVerified fields
    if (updateData.verificationStatus === "verified") {
      updateData.verifiedAt = new Date();

      // Update isVerified in TruckOwner
      await TruckOwner.update(
        { isVerified: true },
        { where: { truckownerId: userId } }
      );

      // Update isVerified in DriverProfile
      await DriverProfile.update(
        { isVerified: true },
        { where: { driverId: userId } }
      );
    }

    const [updated] = await verification.update(updateData, {
      where: { userId },
    });

    if (!updated) throw new Error("Company not found");

    return await verification.findOne({ where: { userId } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Find onboarded company
 */
const findonbordedcompanybyId = async (userId) => {
  return await verification.findOne({ where: { userId } });
};

/**
 * Find onboarded company
 */
const findonbordedcompany = async () => {
  return await verification.findAll();
};

module.exports = {
  onboard,
  findonbordedcompanybyId,
  findonbordedcompany,
  updateonbordingstatus,
  saveUploadedFiles,
};
