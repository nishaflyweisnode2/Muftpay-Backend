const UPI = require('../models/upiModel');
const User = require('../models/userModel');
const Bank = require('../models/bankAddModel');
const BankName = require('../models/bankNameModel');

const { createUPIValidation, updateUPIValidation } = require('../validations/upiValidation');




exports.createUPI = async (req, res) => {
    try {
        const { error } = createUPIValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { mobileNumber, upiId, bankId } = req.body;

        const userId = req.user.id;

        const user1 = await User.findById(userId);

        if (!user1) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const user = await User.findOne({ userId, mobileNumber: mobileNumber });

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const existingUserUPI = await UPI.findOne({ userId: userId });

        if (existingUserUPI) {
            return res.status(400).json({ status: 400, message: 'User already has an UPI ID' });
        }

        const bank = await BankName.findOne({ bankId });

        if (!bank) {
            return res.status(404).json({ status: 404, message: 'BankName not found' });
        }

        const checkBankName = bank._id.toString();


        const bankData = await Bank.findOne({ bankId })/*.populate('bankName', 'name image')*/;

        if (!bankData) {
            return res.status(404).json({ status: 404, message: 'Bank not found' });
        }

        const checkBank = bankData.bankName.toString();

        const match = checkBankName === checkBank;

        if (!match) {
            return res.status(404).json({ status: 400, message: 'Bank not Match' });
        }

        let bankName = bank.name

        let generatedUPI;

        if (!upiId) {
            generatedUPI = generateUPIFromMobileAndBank(mobileNumber, bankName);

            const existingUPI = await UPI.findOne({ upiId: generatedUPI });

            if (existingUPI) {
                return res.status(400).json({ status: 400, message: 'Generated UPI ID already exists' });
            }
        } else {
            const existingCustomUPI = await UPI.findOne({ upiId });

            if (existingCustomUPI) {
                return res.status(400).json({ status: 400, message: 'Custom UPI ID already exists' });
            }

            generatedUPI = upiId;
        }

        const newUPI = new UPI({
            upiId: generatedUPI,
            userId: user._id,
            bankId: bank._id,
        });

        await newUPI.save();

        return res.status(201).json({ status: 201, message: 'UPI ID created successfully', data: newUPI });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create UPI ID', error: error.message });
    }
};

function generateUPIFromMobileAndBank(mobileNumber, bankName) {

    const cleanedBankName = bankName.replace(/\s+/g, '').toLowerCase();

    const generatedUPI = `${mobileNumber}@${cleanedBankName}`;

    return generatedUPI;
}


exports.updateUPI = async (req, res) => {
    try {
        const { error } = updateUPIValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { upiId, newUPIId } = req.body;

        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const existingUPI = await UPI.findOne({ upiId });

        if (!existingUPI) {
            return res.status(404).json({ status: 404, message: 'UPI ID not found' });
        }

        const existingCustomUPI = await UPI.findOne({ upiId: newUPIId });

        if (existingCustomUPI) {
            return res.status(400).json({ status: 400, message: 'Custom UPI ID already exists' });
        }

        existingUPI.upiId = newUPIId;

        await existingUPI.save();

        return res.status(200).json({ status: 200, message: 'UPI ID updated successfully', data: existingUPI });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update UPI ID', error: error.message });
    }
};


exports.getUPI = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const upi = await UPI.find({ user });

        if (!upi) {
            return res.status(404).json({ status: 404, message: 'UPI ID not found' });
        }

        return res.status(200).json({ status: 200, message: 'UPI ID retrieved successfully', data: upi });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve UPI ID', error: error.message });
    }
};


exports.deleteUPI = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const deletedUPI = await UPI.findOneAndRemove({ user });

        if (!deletedUPI) {
            return res.status(404).json({ status: 404, message: 'UPI ID not found' });
        }

        return res.status(200).json({ status: 200, message: 'UPI ID deleted successfully', data: deletedUPI });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete UPI ID', error: error.message });
    }
};
