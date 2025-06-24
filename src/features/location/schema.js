const Joi = require("joi");
const locationschema = Joi.object({
  listingId: Joi.string().uuid().optional(),
  location: Joi.array()
    .optional()
    .description("List of languages spoken by the user."),
  onlineStatus: Joi.boolean()
    .optional()
    .default(false)
    .description("Driver's online status (true or false)"),
});

module.exports = {
  locationschema,
};
