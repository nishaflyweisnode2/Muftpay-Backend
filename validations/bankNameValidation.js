const Joi = require('joi');
const mongoose = require('mongoose');


exports.AddbankName = Joi.object({
    name: Joi.string().required(),
});