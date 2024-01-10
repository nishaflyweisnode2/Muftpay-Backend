const mongoose = require('mongoose');

const sendMoneyTransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recipientName: {
        type: String,
        required: true,
    },
    recipientAccountNumber: {
        type: String,
        required: true,
    },
    recipientIFSC: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    transactionDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
    },
});

const SendMoneyTransaction = mongoose.model('SendMoneyTransaction', sendMoneyTransactionSchema);

module.exports = SendMoneyTransaction;
