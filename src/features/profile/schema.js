const Joi = require("joi");

// Signup schema
const createprofileSchema = Joi.object({
  fullname: Joi.string().optional(),
  country: Joi.string().optional(),
  city: Joi.string().optional(),
  address: Joi.string().optional(),
});

const updatetruckOwnerSchema = Joi.object({
  address: Joi.string().optional(),
  licenseNumber: Joi.string().optional(),
  fleetSize: Joi.number().integer().min(0).optional(),
  operatingRegions: Joi.array().items(Joi.string()).optional(),
});

const updatedriverSchema = Joi.object({
  emergencyContact: Joi.string().optional(),
  address: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
  dateOfBirth: Joi.date().iso().optional(),
});

module.exports = {
  createprofileSchema,
  updatetruckOwnerSchema,
  updatedriverSchema,
};
