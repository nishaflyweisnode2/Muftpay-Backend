const Joi = require('joi');


exports.createFAQValidation = Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
});


exports.updateFAQValidation = Joi.object({
    question: Joi.string().optional(),
    answer: Joi.string().optional(),
});