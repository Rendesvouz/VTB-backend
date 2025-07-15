const repository = require("./repository");
const {
  listingSchema,
  updatelistingSchema,
  categorySchema,
} = require("./schema");

/**
 * Creates a new car offering.
 */
async function createCarOffering(req, res, next) {
  try {
    const dealerId = req.userId;
    const truckOwnerId = req.userId;
    const offeringPictureUrls = [];

    if (req.files && req.files.pictures) {
      const files = req.files.pictures.slice(0, 5);
      for (const file of files) {
        const offeringPictureUrl = await req.storage.uploadFile(
          file.buffer,
          `car_offering_pictures/${dealerId}-${file.originalname}`
        );
        offeringPictureUrls.push(offeringPictureUrl);
      }
    }

    const offeringData = {
      ...req.body,
      pictures: offeringPictureUrls,
    };

    const validatedData = await listingSchema.validateAsync(offeringData);

    const completeOfferingData = {
      truckOwnerId,
      ...validatedData,
    };
    const newOffering = await repository.createlisting(completeOfferingData);
    return res.status(200).json({
      message: "Car offering created successfully",
      offering: newOffering,
    });
  } catch (err) {
    console.log(err);
    console.error("Error in createCarOffering:", err);
    next(err);
  }
}

/**
 * Updates a car offering.
 */
async function updateCarOffering(req, res, next) {
  try {
    const { listingId } = req.params;
    const offeringPictureUrls = [];

    if (req.files && req.files.pictures) {
      const files = req.files.pictures.slice(0, 5);
      for (const file of files) {
        const offeringPictureUrl = await req.storage.uploadFile(
          file.buffer,
          `car_offering_pictures/${listingId}-${file.originalname}`
        );
        offeringPictureUrls.push(offeringPictureUrl);
      }
    }

    const updateData = {
      ...req.body,
      pictures:
        offeringPictureUrls.length > 0 ? offeringPictureUrls : undefined,
    };

    const validatedData = await updatelistingSchema.validateAsync(updateData);
    const updatedOffering = await repository.updatelisting(
      listingId,
      validatedData
    );
    return res.status(200).json({
      message: "Car offering created successfully",
      offering: updatedOffering,
    });
  } catch (err) {
    console.error("Error in updateCarOffering:", err);
    next(err);
  }
}

async function getOfferingbyid(req, res, next) {
  try {
    const { id } = req.params;
    const offerings = await repository.getlistingById(id);
    res
      .status(200)
      .json({ message: "Offerings retrieved successfully", data: offerings });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function getAllOffering(req, res, next) {
  try {
    const offerings = await repository.getAlllisting();
    res
      .status(200)
      .json({ message: "Offerings retrieved successfully", data: offerings });
  } catch (err) {
    next(err);
  }
}

const deleteListingById = async (req, res) => {
  const { id } = req.params;

  try {
    await repository.deletelisting(id);
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    res
      .status(404)
      .json({ error: error.message || "Failed to delete listing" });
  }
};
async function createCategory(req, res) {
  try {
    const validatedData = await categorySchema.validateAsync(req.body);
    const newCategory = await repository.createcategory(validatedData);

    return res.status(201).json({
      data: newCategory,
      message: "Category created successfully.",
    });
  } catch (err) {
    console.error("Create category error:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
}

async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const validatedData = await categorySchema.validateAsync(req.body);
    const updatedCategory = await repository.updatecategory(id, validatedData);

    return res.status(200).json({
      data: updatedCategory,
      message: "Category updated successfully.",
    });
  } catch (err) {
    console.error("Update category error:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    await repository.deletecategory(id);

    return res.status(200).json({
      message: "Category deleted successfully.",
    });
  } catch (err) {
    console.error("Delete category error:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
}

async function getAllCategories(req, res) {
  try {
    const categories = await repository.getAllcategory();
    return res.status(200).json({ data: categories });
  } catch (err) {
    console.error("Fetch categories error:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
}

async function getCategoryById(req, res) {
  try {
    const { id } = req.params;
    const category = await repository.getcategoryById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    return res.status(200).json({ data: category });
  } catch (err) {
    console.error("Fetch category by ID error:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
}

const getalltruckownerlisting = async (req, res) => {
  const truckownerId = req.userId;
  try {
    const user = await repository.getAlllistingByTruckOwner(truckownerId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "truck owner listings not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

async function updateInspectionController(req, res) {
  try {
    const { id } = req.params;
    const { Isinspected } = req.body;

    if (typeof isinspected !== "boolean") {
      return res.status(400).json({ message: "isinspected must be a boolean" });
    }

    const updatedListing = await repository.updateInspectionStatus(
      id,
      isinspected
    );

    return res.status(200).json({
      message: "Inspection status updated successfully",
      data: updatedListing,
    });
  } catch (error) {
    console.error("Controller error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createCarOffering,
  updateCarOffering,
  getAllOffering,
  getOfferingbyid,
  deleteListingById,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  getalltruckownerlisting,
  updateInspectionController,
};
