const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../../config/dbconfig");

// CarOffering Model
const Listings = sequelize.define(
  "Listings",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false,
    },
    truckOwnerId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "User",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    driverId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    car_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    availability: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "available",
    },
    pictures: {
      type: DataTypes.ARRAY(DataTypes.STRING(255)),
      allowNull: true,
      description: "Array of URLs for car pictures",
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = {
  Listings,
};
