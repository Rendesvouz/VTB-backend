const Joi = require("joi");

const listingSchema = Joi.object({
  car_name: Joi.string().optional(),
  description: Joi.string().required(),
  price: Joi.array().optional(),
  pictures: Joi.array().items(Joi.string()).optional(),
  location: Joi.string().optional(),
  model: Joi.string().optional(),
  capacity: Joi.string().optional(),
  type: Joi.string().optional(),
  availability: Joi.string().valid("available", "unavailable").optional(),
});

const updatelistingSchema = Joi.object({
  car_name: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.array().optional(),
  pictures: Joi.array().items(Joi.string()).optional(),
  location: Joi.string().optional(),
  model: Joi.string().optional(),
  type: Joi.string().optional(),
  capacity: Joi.string().optional(),
  availability: Joi.string().valid("available", "unavailable").optional(),
});
const categorySchema = Joi.object({
  type: Joi.string().required(),
  baseFare: Joi.number().positive().required(),
  capacity: Joi.number().integer().positive().required(),
  dimension: Joi.string().optional().allow(""),
});
module.exports = { listingSchema, updatelistingSchema, categorySchema };
