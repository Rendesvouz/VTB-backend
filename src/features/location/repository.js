const { DriverLocation, ListingLocation } = require("./model");

/**
 * Creates a new driver location.
 */
async function createDriverLocation(data) {
  return await DriverLocation.create(data);
}

/**
 * Updates a driver's location by their driverId.
 */
async function updateDriverLocation(driverId, newLocation) {
  const location = await DriverLocation.findOne({ where: { driverId } });
  if (!location) throw new Error("Driver location not found");
  return await location.update({ location: newLocation });
}

/**
 * Finds a driver's location by driverId.
 */
async function findDriverLocationByDriverId(driverId) {
  return await DriverLocation.findOne({ where: { driverId } });
}

/**
 * Creates a new listing location.
 */
async function createListingLocation(data) {
  return await ListingLocation.create(data);
}

/**
 * Updates a listing's location by listingId.
 */
async function updateListingLocation(driverId, newLocation, onlineStatus) {
  const locationRecord = await ListingLocation.findOne({ where: { driverId } });
  if (!locationRecord) throw new Error("Listing location not found");

  return await locationRecord.update({
    location: newLocation,
    onlineStatus:
      onlineStatus !== undefined ? onlineStatus : locationRecord.onlineStatus,
  });
}
/**
 * Updates a driver's location and online status by their driverId.
 */
async function updateDriverLocation(driverId, newLocation, onlineStatus) {
  const locationRecord = await DriverLocation.findOne({ where: { driverId } });
  if (!locationRecord) throw new Error("Driver location not found");

  return await locationRecord.update({
    location: newLocation,
    onlineStatus:
      onlineStatus !== undefined ? onlineStatus : locationRecord.onlineStatus,
  });
}

/**
 * Finds a listing's location by listingId.
 */
async function findListingLocationByListingId(listingId) {
  return await ListingLocation.findOne({ where: { listingId } });
}

module.exports = {
  createListingLocation,
  updateListingLocation,
  findListingLocationByListingId,
  createDriverLocation,
  updateDriverLocation,
  findDriverLocationByDriverId,
};
