const { DataTypes } = require("sequelize");
const sequelize = require("../../config/dbconfig");
const Userhash = require("../../utils/bcrypt");

// User model
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(
        "Admin",
        "User",
        "Driver",
        "SuperAdmin",
        "TruckOwner"
      ),
      allowNull: false,
      defaultValue: "User",
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    tableName: "User",
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        await Userhash.hashPassword(user);
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          await Userhash.hashPassword(user);
        }
      },
    },
  }
);

// Token model for refresh tokens
const Token = sequelize.define(
  "Token",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    token_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "refresh_token",
    },
    expiresIn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Tokens",
    timestamps: false,
  }
);

module.exports = {
  User,
  Token,
};
