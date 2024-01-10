const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    mobileNumber: {
        type: String,
    },
    bankName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BankName',
    },
    accountNumber: {
        type: String,
    },
    qrCodeImagePath: {
        type: String,
        default: null,
    },

});

const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank;
