const Joi = require('joi');


exports.createBannerValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
});

