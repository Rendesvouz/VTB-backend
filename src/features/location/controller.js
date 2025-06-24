const repository = require("./repository");
const { locationschema } = require("./schema");

// // Driver Location Controllers
// async function createDriverLocation(req, res, next) {
//   try {
//     const driverId = req.userId; // From auth middleware
//     const validatedData = await locationschema.validateAsync(req.body);
//     const { location, listingId } = validatedData;

//     // Handle Driver Location (Create or Update)
//     let driverLocation =
//       await repository.findDriverLocationByDriverId(driverId);
//     if (driverLocation) {
//       driverLocation = await repository.updateDriverLocation(
//         driverId,
//         location
//       );
//     } else {
//       driverLocation = await repository.createDriverLocation({
//         driverId,
//         location,
//       });
//     }

//     // Handle Listing Location (Create or Update)
//     let listingLocation = null;
//     if (listingId) {
//       const existingListing =
//         await repository.findListingLocationByListingId(listingId);
//       if (existingListing) {
//         listingLocation = await repository.updateListingLocation(
//           listingId,
//           location
//         );
//       } else {
//         listingLocation = await repository.createListingLocation({
//           listingId,
//           location,
//         });
//       }
//     }

//     return res.status(200).json({
//       message: "Locations processed successfully.",
//       data: {
//         driverLocation,
//         listingLocation,
//       },
//     });
//   } catch (err) {
//     console.error("Location processing error:", err);
//     return res.status(500).json({
//       message: "Internal Server Error",
//       error: err.message,
//     });
//   }
// }

async function createDriverLocation(req, res, next) {
  try {
    const driverId = req.userId;
    const validatedData = await locationschema.validateAsync(req.body);
    const { location, listingId, onlineStatus } = validatedData;

    // Handle Driver Location (Create or Update)
    let driverLocation =
      await repository.findDriverLocationByDriverId(driverId);

    if (driverLocation) {
      driverLocation = await repository.updateDriverLocation(
        driverId,
        location,
        onlineStatus
      );
    } else {
      driverLocation = await repository.createDriverLocation({
        driverId,
        location,
        onlineStatus: onlineStatus ?? false, // default to false if not provided
      });
    }

    // Handle Listing Location (Create or Update)
    let listingLocation = null;
    if (listingId) {
      const existingListing =
        await repository.findListingLocationByListingId(listingId);
      if (existingListing) {
        listingLocation = await repository.updateListingLocation(
          listingId,
          location,
          onlineStatus
        );
      } else {
        listingLocation = await repository.createListingLocation({
          listingId,
          location,
          onlineStatus: onlineStatus ?? false,
        });
      }
    }

    return res.status(200).json({
      message: "Locations processed successfully.",
      data: {
        driverLocation,
        listingLocation,
      },
    });
  } catch (err) {
    console.error("Location processing error:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
}

async function getDriverLocationById(req, res) {
  try {
    const { driverId } = req.params;
    const location = await repository.findDriverLocationByDriverId(driverId);

    if (!location) {
      return res.status(404).json({ message: "Driver location not found." });
    }

    return res.status(200).json({ data: location });
  } catch (err) {
    console.error("Get driver location error:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
}

async function getListingLocationById(req, res) {
  try {
    const { listingId } = req.params;
    const location = await repository.findListingLocationByListingId(listingId);

    if (!location) {
      return res.status(404).json({ message: "Listing location not found." });
    }

    return res.status(200).json({ data: location });
  } catch (err) {
    console.error("Get listing location error:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
}

module.exports = {
  createDriverLocation,
  getDriverLocationById,
  getListingLocationById,
};
