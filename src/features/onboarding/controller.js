const profileRepo = require("./repository");
const validateRequest = require("../../utils/validateRequest");
const { onboardSchema, updatestatusSchema } = require("./schema");

/**
 * Create Company Profile
 */
const onboardCompany = async (req, res) => {
  const errorMessage = validateRequest(onboardSchema, req.body);
  if (errorMessage) return res.status(400).json({ error: errorMessage });
  const userId = req.userId;
  try {
    const companyonboard = await profileRepo.onboard(userId, req.body);
    return res.status(201).json(companyonboard);
  } catch (error) {
    console.error("Error verifying :", error);
    return res.status(500).json({ error: "Failed to create Company" });
  }
};

/**
 * Create Company Profile
 */
const uploadFiles = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No files uploaded" });
  }

  const userId = req.userId;
  const files = req.files.map((file) => ({
    filename: file.originalname,
    mimetype: file.mimetype,
    buffer: file.buffer.toString("base64"),
  }));

  try {
    const updatedOnboarding = await profileRepo.saveUploadedFiles(
      userId,
      files
    );
    return res.status(200).json({
      success: true,
      message: "Files uploaded successfully",
      data: updatedOnboarding,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateCompanystatus = async (req, res) => {
  const errorMessage = validateRequest(updatestatusSchema, req.body);
  if (errorMessage) return res.status(400).json({ error: errorMessage });

  const { userId } = req.params;
  try {
    const updatedProfile = await profileRepo.updateonbordingstatus(
      userId,
      req.body
    );
    return res.status(200).json({
      success: true,
      message: "verification status updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating onboarding status", error);
    return res
      .status(500)
      .json({ error: "Failed to update onboarding status" });
  }
};

/**
 * Get all onboarded companies
 */
const getAllOnboardedCompanies = async (req, res) => {
  try {
    const companies = await profileRepo.findonbordedcompany();
    return res.status(200).json({ success: true, data: companies });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Get onboarded company by ID
 */
const getOnboardedCompanyById = async (req, res) => {
  try {
    const { userId } = req.params;
    const company = await profileRepo.findonbordedcompanybyId(userId);

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    return res.status(200).json({ success: true, data: company });
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  updateCompanystatus,
  onboardCompany,
  getAllOnboardedCompanies,
  getOnboardedCompanyById,
  uploadFiles,
};
