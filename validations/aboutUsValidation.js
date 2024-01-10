const Joi = require('joi');


exports.createOrUpdateAboutUsValidation = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
});


