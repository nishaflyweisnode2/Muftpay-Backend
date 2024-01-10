const HelpAndSupport = require('../models/help&SupportModel');

const { createHelpAndSupportValidation, updateHelpAndSupportValidation } = require('../validations/help&SupportValidation');



exports.createHelpAndSupport = async (req, res) => {
    try {
        const { error } = createHelpAndSupportValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { mobileNumber, email } = req.body;

        const helpAndSupport = new HelpAndSupport({ mobileNumber, email });

        await helpAndSupport.save();
        return res.status(201).json({ status: 201, message: 'Help and support entry created successfully', data: helpAndSupport });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create help and support entry', error: error.message });
    }
};


exports.getAllHelpAndSupport = async (req, res) => {
    try {
        const helpAndSupportEntries = await HelpAndSupport.find();
        return res.status(200).json({ status: 200, data: helpAndSupportEntries });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch help and support entries', error: error.message });
    }
};



exports.updateHelpAndSupport = async (req, res) => {
    try {
        const { error } = updateHelpAndSupportValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { mobileNumber, email } = req.body;

        const helpAndSupportId = req.params.id;

        const existingEntry = await HelpAndSupport.findById(helpAndSupportId);

        if (!existingEntry) {
            return res.status(404).json({ message: 'Help and support entry not found' });
        }

        if (mobileNumber) {
            existingEntry.mobileNumber = mobileNumber;
        }

        if (email) {
            existingEntry.email = email;
        }

        await existingEntry.save();

        return res.status(200).json({ status: 200, message: 'Help and support entry updated successfully', helpAndSupport: existingEntry });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update help and support entry', error: error.message });
    }
};


exports.deleteHelpAndSupport = async (req, res) => {
    try {
        const helpAndSupportId = req.params.id;

        const deletedEntry = await HelpAndSupport.findByIdAndDelete(helpAndSupportId);

        if (!deletedEntry) {
            return res.status(404).json({ message: 'Help and support entry not found' });
        }

        return res.status(200).json({ status: 200, message: 'Help and support entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete help and support entry', error: error.message });
    }
};
