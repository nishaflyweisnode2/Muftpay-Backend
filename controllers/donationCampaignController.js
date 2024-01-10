const DonationCampaign = require('../models/donationCampaignModel');


const { DonationCampaignSchema, DonationCampaignUpdateSchema } = require('../validations/DonationCampaignValidation');




exports.createCampaign = async (req, res) => {
    try {
        const { error } = DonationCampaignSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { name, description, targetAmount } = req.body;

        if (!req.file) {
            return res.status(400).json({ status: 400, error: "Image file is required" });
        }

        const newCampaign = new DonationCampaign({
            name,
            description,
            targetAmount,
            image: req.file.path,
        });

        const savedCampaign = await newCampaign.save();

        return res.status(201).json({ status: 201, message: 'Donation campaign created successfully', data: savedCampaign, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Failed to created donation campaign', error: error.message, });
    }
};


exports.getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await DonationCampaign.find();

        return res.status(200).json({ status: 200, message: 'List of all donation campaigns', data: campaigns, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Failed to List of all donation campaign', error: error.message, });
    }
};


exports.getCampaignById = async (req, res) => {
    try {
        const campaign = await DonationCampaign.findById(req.params.id);

        if (!campaign) {
            return res.status(404).json({ status: 404, message: 'Donation campaign not found', });
        }

        return res.status(200).json({ status: 200, message: 'Donation campaign details', data: campaign, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Failed to Donation campaign details ', error: error.message, });
    }
};


exports.updateCampaign = async (req, res) => {
    try {
        const { error } = DonationCampaignUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { name, description, targetAmount } = req.body;

        // if (!req.file) {
        //     return res.status(400).json({ status: 400, error: "Image file is required" });
        // }

        const campaign = await DonationCampaign.findById(req.params.id);

        if (!campaign) {
            return res.status(404).json({ status: 404, message: 'Donation campaign not found', });
        }

        if (name) {
            campaign.name = name;
        }

        if (description) {
            campaign.description = description;
        }

        if (targetAmount) {
            campaign.targetAmount = targetAmount;
        }

        if (req.file) {
            campaign.image = req.file.path;
        }

        const updatedCampaign = await campaign.save();

        return res.status(200).json({ status: 200, message: 'Donation campaign updated successfully', data: updatedCampaign, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Failed to updated donation campaign', error: error.message, });
    }
};


exports.deleteCampaign = async (req, res) => {
    try {
        const campaign = await DonationCampaign.findByIdAndDelete(req.params.id);

        if (!campaign) {
            return res.status(404).json({ status: 404, message: 'Donation campaign not found', });
        }

        return res.status(200).json({ status: 200, message: 'Donation campaign deleted successfully', data: campaign, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Failed to delete donation campaign', error: error.message, });
    }
};
