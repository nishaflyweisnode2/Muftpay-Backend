const mongoose = require('mongoose');

const donationCampaignSchema = new mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    targetAmount: {
        type: Number
    },
    recivedAmount: {
        type: Number,
        default: 0
    },

}, { timestamps: true });

const DonationCampaign = mongoose.model('DonationCampaign', donationCampaignSchema);

module.exports = DonationCampaign;
