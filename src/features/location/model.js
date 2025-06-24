const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../../config/dbconfig");
const { DriverProfile } = require("../profile/model");
const { Listings } = require("../listings/model");

const DriverLocation = sequelize.define(
  "DriverLocation",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    driverId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "DriverProfile",
        key: "driverId",
      },
      onDelete: "CASCADE",
    },
    onlineStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      description: "Driver's current online status",
    },
    location: {
      type: DataTypes.JSONB,
      allowNull: false,
      description: "Geo-coordinates as an object: { latitude, longitude }",
    },
  },
  {
    tableName: "DriverLocation",
    timestamps: true,
  }
);

const ListingLocation = sequelize.define(
  "ListingLocation",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false,
    },
    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Listings",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    location: {
      type: DataTypes.JSONB,
      allowNull: false,
      description: "Geo-coordinates as an object: { latitude, longitude }",
    },
  },
  {
    tableName: "ListingLocation",
    timestamps: true,
  }
);

// Association between Listings and ListingLocation
Listings.hasOne(ListingLocation, {
  foreignKey: "listingId",
  onDelete: "CASCADE",
});

ListingLocation.belongsTo(Listings, {
  foreignKey: "listingId",
  onDelete: "CASCADE",
});
DriverProfile.hasOne(DriverLocation, {
  foreignKey: "driverId",
  sourceKey: "driverId",
  as: "location",
  onDelete: "CASCADE",
});

DriverLocation.belongsTo(DriverProfile, {
  foreignKey: "driverId",
  targetKey: "driverId",
  as: "driver",
  onDelete: "CASCADE",
});

module.exports = { DriverLocation, ListingLocation };
