const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../../config/dbconfig");

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    driverId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    appointmentTime: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(
        "scheduled",
        "rescheduled",
        "cancelled",
        "request",
        "completed",
        "accept",
        "decline",
        "negotiation"
      ),
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    negotiation: {
      type: DataTypes.JSONB,
      allowNull: true,
      description:
        "Negotiation history and current status. Keys: proposedBy, userOffer, driverOffer, status",
      defaultValue: null,
    },

    cancellationReason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pickupLocation: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    deliveryLocation: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    reminders: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = {
  Appointment,
};
