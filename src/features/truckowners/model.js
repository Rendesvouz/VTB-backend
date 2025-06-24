const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../../config/dbconfig");
const { DriverProfile } = require("../profile/model");

const Employment = sequelize.define(
  "Employment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    truckOwnerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    driverId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "terminated", "pending"),
      defaultValue: "active",
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "Employment",
    timestamps: true,
  }
);

const AssignTruck = sequelize.define(
  "AssignTruck",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    truckOwnerId: {
      type: DataTypes.UUID,
      allowNull: false,
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
    truckId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("assign", "unassign"),
      defaultValue: "assign",
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "AssignTruck",
    timestamps: true,
  }
);

DriverProfile.hasMany(AssignTruck, {
  foreignKey: "driverId",
  sourceKey: "driverId",
  as: "assignedTrucks",
  onDelete: "CASCADE",
});

// AssignTruck → DriverProfile
AssignTruck.belongsTo(DriverProfile, {
  foreignKey: "driverId",
  targetKey: "driverId",
  as: "driverProfile",
  onDelete: "CASCADE",
});
module.exports = {
  Employment,
  AssignTruck,
};
