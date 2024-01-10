const mongoose = require('mongoose');

const upiSchema = new mongoose.Schema({
    upiId: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bankId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bank',
        required: true,
    },
});

const UPI = mongoose.model('UPI', upiSchema);

module.exports = UPI;
