const Donation = require('../models/donationModel');
const DonationCampaign = require('../models/donationCampaignModel');
const User = require('../models/userModel');
const Transaction = require('../models/transctionModel');
const Wallet = require('../models/walletModel');

const { donationSchema } = require('../validations/donationValidation');



exports.createDonation = async (req, res) => {
    try {
        const { userId, campaign, amount, description } = req.body;

        const { error } = donationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const donationCampaign = await DonationCampaign.findById(campaign)

        if (!donationCampaign) {
            return res.status(404).json({ status: 404, message: 'Donation campaign not found', });
        }

        const donation = new Donation({
            userId,
            campaign,
            amount,
            description,
        });

        await donation.save();

        donationCampaign.recivedAmount += amount;

        await donationCampaign.save();

        return res.status(201).json({ status: 201, message: 'Donation created successfully', data: donation });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'Failed to create donation', error: error.message });
    }
};



exports.getDonations = async (req, res) => {
    try {

        const donations = await Donation.find().populate('userId', 'name');

        return res.status(200).json({ status: 200, message: 'Donations retrieved successfully', data: donations });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'Failed to retrieve donations', error: error.message });
    }
};
