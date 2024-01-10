const Joi = require('joi');
const mongoose = require('mongoose');



exports.donationSchema = Joi.object({
    userId: Joi.string().custom((value, helpers) => {
        if (!mongoose.isValidObjectId(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    }).required(),
    campaign: Joi.string().custom((value, helpers) => {
        if (!mongoose.isValidObjectId(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    }).required(),
    amount: Joi.number().min(1).required(),
    description: Joi.string(),
});