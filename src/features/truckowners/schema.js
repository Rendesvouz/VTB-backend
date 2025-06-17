const Joi = require("joi");

const employmentSchema = Joi.object({
  driverId: Joi.string().uuid().optional(),
  status: Joi.string()
    .valid("active", "inactive", "terminated", "pending")
    .default("active"),
  startDate: Joi.date().default(() => new Date()),
  endDate: Joi.date().optional().allow(null),
  notes: Joi.string().optional().allow(null, ""),
});

const assignTruckSchema = Joi.object({
  driverId: Joi.string().uuid().optional(),
  truckId: Joi.string().uuid().optional().allow(null),
  status: Joi.string().valid("assign", "unassign").default("assign"),
  startDate: Joi.date().default(() => new Date()),
  endDate: Joi.date().optional().allow(null),
});

module.exports = {
  assignTruckSchema,
  employmentSchema,
};
