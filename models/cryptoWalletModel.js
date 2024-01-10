const mongoose = require('mongoose');

const cryptoWalletSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    cryptoBalance: {
        type: Number,
        default: 0,
    },
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction',
        },
    ],
});

module.exports = mongoose.model('CryptoWallet', cryptoWalletSchema);
