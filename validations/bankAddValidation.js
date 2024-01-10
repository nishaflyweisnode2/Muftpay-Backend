const Joi = require('joi');
const mongoose = require('mongoose');


exports.addbank = Joi.object({
    bankName: Joi.string().custom((value, helpers) => {
        if (!mongoose.isValidObjectId(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    }).required(),
    mobileNumber: Joi.string().required(),
    accountNumber: Joi.string().required(),
});


exports.updateAddbank = Joi.object({
    bankName: Joi.string().custom((value, helpers) => {
        if (!mongoose.isValidObjectId(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    }).optional(),
    mobileNumber: Joi.string().optional(),
    accountNumber: Joi.string().optional(),
});