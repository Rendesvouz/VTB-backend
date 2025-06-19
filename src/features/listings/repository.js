const { Listings, Category } = require("./model");

/**
 * Creates a new car offering.
 */
async function createlisting(offeringData) {
  return await Listings.create(offeringData);
}

/**
 * Fetches all tour guide offerings.
 */
async function getAlllisting() {
  try {
    return await Listings.findAll();
  } catch (err) {
    console.error("Error fetching offerings:", err.message);
    throw err;
  }
}

async function getlistingById(listingId) {
  return await Listings.findOne({ where: { id: listingId } });
}

/**
 * Updates a car offering by its ID.
 */
async function updatelisting(listingId, updateData) {
  const offering = await Listings.findByPk(listingId);
  if (!offering) throw new Error("Car offering not found");
  return await offering.update(updateData);
}

async function deletelisting(listingId) {
  const offering = await Listings.findByPk(listingId);
  if (!offering) {
    throw new Error("Car offering not found");
  }
  await offering.destroy();
  return true;
}

/**
 * Creates a new category.
 */
async function createcategory(offeringData) {
  return await Category.create(offeringData);
}

/**
 * Updates category.
 */
async function updatecategory(CategoryId, updateData) {
  const offering = await Category.findByPk(CategoryId);
  if (!offering) throw new Error("Category offering not found");
  return await offering.update(updateData);
}

async function deletecategory(CategoryId) {
  const offering = await Category.findByPk(CategoryId);
  if (!offering) {
    throw new Error("Category offering not found");
  }
  await offering.destroy();
  return true;
}

async function getAllcategory() {
  try {
    return await Category.findAll();
  } catch (err) {
    console.error("Error fetching category:", err.message);
    throw err;
  }
}

async function getcategoryById(listingId) {
  return await Category.findOne({ where: { id: listingId } });
}
module.exports = {
  createlisting,
  getlistingById,
  updatelisting,
  getAlllisting,
  deletelisting,
  deletecategory,
  updatecategory,
  createcategory,
  getAllcategory,
  getcategoryById,
};
