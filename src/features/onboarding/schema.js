const Joi = require("joi");

const onboardSchema = Joi.object({
  supportingDocuments: Joi.array().optional(),
  contactInfo: Joi.object().optional(),
  verificationStatus: Joi.string()
    .valid("pending", "verified", "processing", "rejected")
    .default("pending"),
  verifiedAt: Joi.date().optional(),
});

const updatestatusSchema = Joi.object({
  verificationStatus: Joi.string()
    .valid("pending", "verified", "rejected")
    .default("pending"),
});

module.exports = { onboardSchema, updatestatusSchema };
