const Joi = require('joi');


exports.createUPIValidation = Joi.object({
    mobileNumber: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
    upiId: Joi.string().optional(),
    bankId: Joi.string().required(),
});


exports.updateUPIValidation = Joi.object({
    upiId: Joi.string().required(),
    newUPIId: Joi.string().required(),
});