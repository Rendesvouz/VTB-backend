const { Listings, Category } = require("./model");
const { ListingLocation } = require("../location/model");
/**
 * Creates a new car offering.
 */
async function createlisting(offeringData) {
  return await Listings.create(offeringData);
}

/**
 * Fetches all tour guide offerings.
 */
// async function getAlllisting() {
//   try {
//     return await Listings.findAll();
//   } catch (err) {
//     console.error("Error fetching offerings:", err.message);
//     throw err;
//   }
// }

// async function getlistingById(listingId) {
//   return await Listings.findOne({ where: { id: listingId } });
// }

/**
 * Fetches all listings including their location.
 */
async function getAlllisting() {
  try {
    return await Listings.findAll({
      include: [{ model: ListingLocation }],
    });
  } catch (err) {
    console.error("Error fetching offerings:", err.message);
    throw err;
  }
}

/**
 * Fetches a single listing by ID including its location.
 */
async function getlistingById(listingId) {
  try {
    return await Listings.findOne({
      where: { id: listingId },
      include: [{ model: ListingLocation }],
    });
  } catch (err) {
    console.error("Error fetching listing:", err.message);
    throw err;
  }
}

/**
 * Updates a car offering by its ID.
 */
async function updatelisting(listingId, updateData) {
  const offering = await Listings.findByPk(listingId);
  if (!offering) throw new Error("Car offering not found");
  return await offering.update(updateData);
}

async function updateListingDriverId(listingId, driverId) {
  const offering = await Listings.findByPk(listingId);
  if (!offering) throw new Error("Car offering not found");

  // Only update the driverId field
  return await offering.update({ driverId });
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
async function getAlllistingByTruckOwner(truckOwnerId) {
  try {
    return await Listings.findAll({
      where: { truckOwnerId },
      include: [{ model: ListingLocation }],
    });
  } catch (err) {
    console.error("Error fetching driver profiles:", err.message);
    throw err;
  }
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
  updateListingDriverId,
  getAlllistingByTruckOwner,
};
