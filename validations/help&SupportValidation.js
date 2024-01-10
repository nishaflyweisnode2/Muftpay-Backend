const Joi = require('joi');


exports.createHelpAndSupportValidation = Joi.object({
    mobileNumber: Joi.string().required(),
    email: Joi.string().email().required(),
});

exports.updateHelpAndSupportValidation = Joi.object({
    mobileNumber: Joi.string().optional(),
    email: Joi.string().email().optional(),
});

