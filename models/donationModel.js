const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DonationCampaign',
    },
    amount: {
        type: Number,
    },
    description: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
