const Joi = require("joi");

// Appointment Joi Schema
const appointmentSchema = Joi.object({
  listingId: Joi.string().uuid().optional(),
  appointmentTime: Joi.object({
    date: Joi.string().optional(),
    time: Joi.string().optional(),
  }),
  description: Joi.string().max(255).optional(),
  status: Joi.string()
    .valid(
      "scheduled",
      "rescheduled",
      "cancelled",
      "request",
      "completed",
      "accept",
      "decline"
    )
    .optional(),
  price: Joi.number().precision(2).optional(),
  cancellationReason: Joi.string().max(255).optional(),
  address: Joi.string().max(255).optional(),
  city: Joi.string().max(100).optional(),
  country: Joi.string().max(100).optional(),
  reminders: Joi.array().items(Joi.number().integer()).optional(),
});

// Appointment Joi Schema
const updateappointmentSchema = Joi.object({
  listingId: Joi.string().uuid().optional(),
  appointmentTime: Joi.object({
    date: Joi.string().optional(),
    time: Joi.string().optional(),
  }),
  description: Joi.string().max(255).optional(),
  status: Joi.string()
    .valid(
      "scheduled",
      "rescheduled",
      "cancelled",
      "request",
      "completed",
      "accept",
      "decline"
    )
    .optional(),
  price: Joi.number().precision(2).optional(),
  cancellationReason: Joi.string().max(255).optional(),
  address: Joi.string().max(255).optional(),
  city: Joi.string().max(100).optional(),
  country: Joi.string().max(100).optional(),
  reminders: Joi.array().items(Joi.number().integer()).optional(),
});
const updateStatusSchema = Joi.object({
  status: Joi.string()
    .valid("scheduled", "rescheduled", "cancelled", "completed")
    .required(),
});
module.exports = {
  appointmentSchema,
  updateStatusSchema,
  updateappointmentSchema,
};
