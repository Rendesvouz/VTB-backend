const Joi = require("joi");

// Signup schema
const createprofileSchema = Joi.object({
  fullname: Joi.string().optional(),
  country: Joi.string().optional(),
  city: Joi.string().optional(),
  address: Joi.string().optional(),
});

module.exports = {
  createprofileSchema,
};
