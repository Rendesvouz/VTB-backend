const { DataTypes } = require("sequelize");
const sequelize = require("../../config/dbconfig");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../authentication/model");

const UserProfile = sequelize.define(
  "UserProfile",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: true, freezeTableName: true }
);

// User and UserProfile relationship
User.hasOne(UserProfile, { foreignKey: "userId", onDelete: "CASCADE" });
UserProfile.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
module.exports = {
  UserProfile,
};
