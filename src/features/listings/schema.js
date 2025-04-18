const Joi = require("joi");

const listingSchema = Joi.object({
  car_name: Joi.string().optional(),
  description: Joi.string().required(),
  price: Joi.array().optional(),
  pictures: Joi.array().items(Joi.string()).optional(),
  location: Joi.string().optional(),
  model: Joi.string().optional(),
  type: Joi.string().optional(),
  availability: Joi.string().valid("available", "unavailable").optional(),
});

const updatelistingSchema = Joi.object({
  car_name: Joi.string().optional(),
  description: Joi.string().required(),
  price: Joi.array().optional(),
  pictures: Joi.array().items(Joi.string()).optional(),
  location: Joi.string().optional(),
  model: Joi.string().optional(),
  type: Joi.string().optional(),
  availability: Joi.string().valid("available", "unavailable").optional(),
});

module.exports = { listingSchema, updatelistingSchema };
