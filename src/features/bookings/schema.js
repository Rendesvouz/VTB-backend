const Joi = require("joi");

// Define the schema for location objects
const locationSchema = Joi.object({
  address: Joi.string().max(255).optional(),
  city: Joi.string().max(100).optional(),
  country: Joi.string().max(100).optional(),
});

const negotiationSchema = Joi.object({
  proposedBy: Joi.string().valid("user", "driver").optional(),
  userOffer: Joi.number().optional(),
  driverOffer: Joi.number().optional(),
  status: Joi.string()
    .valid("proposed", "accepted", "rejected", "countered")
    .optional(),
});
// Define the main appointment schema
const appointmentSchema = Joi.object({
  listingId: Joi.string().uuid().optional(),
  driverId: Joi.string().uuid().optional(),
  appointmentTime: Joi.object({
    date: Joi.string().optional(),
    time: Joi.string().optional(),
  }).optional(),
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
  pickupLocation: locationSchema.optional(),
  deliveryLocation: locationSchema.optional(),
  reminders: Joi.array().items(Joi.number().integer()).optional(),
  negotiation: negotiationSchema.optional(),
});

// Appointment Joi Schema
const updateappointmentSchema = Joi.object({
  listingId: Joi.string().uuid().optional(),
  driverId: Joi.string().uuid().optional(),
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
  negotiationSchema,
};
