const Joi = require('joi');


exports.createSendMoneyTransactionValidation = Joi.object({
    recipientName: Joi.string().required(),
    recipientAccountNumber: Joi.string().required(),
    recipientIFSC: Joi.string().required(),
    amount: Joi.number().min(1).required(),
});
