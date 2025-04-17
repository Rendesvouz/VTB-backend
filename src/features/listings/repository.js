const { Listings } = require("./model");

/**
 * Creates a new car offering.
 */
async function createlisting(offeringData) {
  return await Listings.create(offeringData);
}

/**
 * Fetches all tour guide offerings.
 * @returns {Promise<TourGuideOfferings[]>} - List of all offerings.
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

module.exports = {
  createlisting,
  getlistingById,
  updatelisting,
  getAlllisting,
  deletelisting,
};
