const Joi = require('joi');


exports.createOrUpdatePrivacyValidation = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
});


