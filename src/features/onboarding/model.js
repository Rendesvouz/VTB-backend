const { DataTypes } = require("sequelize");
const sequelize = require("../../config/dbconfig");

const verification = sequelize.define(
  "Onboarding",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    contactInfo: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    supportingDocuments: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: [],
    },
    verificationStatus: {
      type: DataTypes.ENUM("pending", "verified", "processing", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    },
    verifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "verification",
  }
);

module.exports = {
  verification,
};
