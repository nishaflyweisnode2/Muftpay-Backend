const Joi = require('joi');



exports.DonationCampaignSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    targetAmount: Joi.number().min(1).required(),

})


exports.DonationCampaignUpdateSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    targetAmount: Joi.number().min(1).optional(),

})