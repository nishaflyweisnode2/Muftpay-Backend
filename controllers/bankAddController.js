const Bank = require('../models/bankAddModel');
const User = require('../models/userModel');
const BankName = require('../models/bankNameModel');
const qrcode = require('qrcode');
const fs = require('fs');

const { qrImage } = require('../middleware/imageUpload');

const { addbank, updateAddbank } = require('../validations/bankAddValidation');


//
var multer = require("multer");
require('dotenv').config()
const authConfig = require("../configs/auth.config");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: authConfig.cloud_name, api_key: authConfig.api_key, api_secret: authConfig.api_secret, });
//


exports.addBankAccount = async (req, res) => {
    try {
        const userId = req.user.id;

        const { error } = addbank.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { mobileNumber, bankName, accountNumber } = req.body;

        const user = await User.findById(userId);

        if (user.mobileNumber !== mobileNumber) {
            return res.status(400).json({ status: 400, message: 'Mobile number does not match' });
        }

        const existingBankAccount = await Bank.findOne({ userId, bankName, accountNumber });

        if (existingBankAccount) {
            return res.status(400).json({ status: 400, message: 'Bank account already exists' });
        }

        const bank = await BankName.findById(bankName);

        if (!bank) {
            return res.status(404).json({ status: 404, message: 'Bank Name not found' });
        }

        const bankAccount = new Bank({
            userId,
            mobileNumber,
            bankName,
            accountNumber,
        });

        await bankAccount.save();

        var data = []
        data = [`Bank Name: ${bankName}\nAccount Number: ${accountNumber}`]
        var userString = data.toString()
        let qrURL = await qrcode.toDataURL(userString);

        const cloudinaryUploadResult = await cloudinary.uploader.upload(qrURL, {
            folder: 'bank_qr_codes',
        });

        const qrCodeImageUrl = cloudinaryUploadResult.secure_url;

        bankAccount.qrCodeImagePath = qrCodeImageUrl;
        await bankAccount.save();

        return res.status(201).json({ status: 201, message: 'Bank account added successfully', bankAccount });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to add bank account', error: error.message });
    }
};


exports.getBankAccounts = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const bankAccounts = await Bank.find({ userId })
            .populate('userId', 'name')
            .populate('bankName', 'name image');

        return res.status(200).json({ status: 200, data: bankAccounts });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch bank accounts', error: error.message });
    }
};


exports.updateBankDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const { mobileNumber, bankName, accountNumber } = req.body;

        const { error } = updateAddbank.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const bankAccount = await Bank.findOne({ userId });

        if (!bankAccount) {
            return res.status(404).json({ status: 404, message: 'Bank account not found' });
        }

        if (mobileNumber !== undefined) {
            if (user.mobileNumber !== mobileNumber) {
                return res.status(400).json({ status: 400, message: 'If you Update Mobile number First Change Mobile Number In Your Profile then here update' });
            }
            bankAccount.mobileNumber = mobileNumber;
        }

        if (bankName !== undefined) {
            bankAccount.bankName = bankName;
        }

        if (accountNumber !== undefined) {
            bankAccount.accountNumber = accountNumber;
        }

        const qrData = `Bank Name: ${bankAccount.bankName}\nAccount Number: ${bankAccount.accountNumber}`;
        const qrImage = await qrcode.toDataURL(qrData);

        const cloudinaryUploadResult = await cloudinary.uploader.upload(qrImage, {
            public_id: `bank_qr_codes/${userId}`,
            overwrite: true,
        });

        const qrCodeImageUrl = cloudinaryUploadResult.secure_url;

        bankAccount.qrCodeImageUrl = qrCodeImageUrl;

        await bankAccount.save();

        return res.status(200).json({ status: 200, message: 'Bank details updated successfully', bankAccount });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update bank details', error: error.message });
    }
};


// exports.searchBankAccounts = async (req, res) => {
//     try {
//         const { bankName, accountNumber, userName, mobileNumber } = req.query;

//         const searchCriteria = {};

//         if (bankName) {
//             searchCriteria.bankName = bankName;
//         }

//         if (accountNumber) {
//             searchCriteria.accountNumber = accountNumber;
//         }

//         if (userName) {
//             const users = await User.find({ name: userName });
//             const userIds = users.map((user) => user._id);
//             searchCriteria.userId = { $in: userIds };
//         }

//         if (mobileNumber) {
//             searchCriteria.mobileNumber = mobileNumber;
//         }

//         const bankAccounts = await Bank.find(searchCriteria)
//             .populate('bankName')
//             .populate('userId');

//         return res.status(200).json({ message: 'Bank accounts found successfully', bankAccounts });
//     } catch (error) {
//         return res.status(500).json({ message: 'Failed to search bank accounts', error: error.message });
//     }
// };


exports.searchBankAccounts = async (req, res) => {
    try {
        const { searchQuery } = req.query;

        if (!searchQuery) {
            return res.status(400).json({ message: 'Search query is required.' });
        }

        const searchRegex = new RegExp(searchQuery, 'i');

        const banks = await Bank.aggregate([
            {
                $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' },
            },
            { $unwind: '$user' },
            {
                $lookup: { from: 'banknames', localField: 'bankName', foreignField: '_id', as: 'bankName' },
            },
            { $unwind: '$bankName' },
            {
                $match: {
                    $or: [
                        { 'user.name': searchRegex },
                        { 'user.mobileNumber': searchRegex },
                        { 'bankName.name': searchRegex },
                        { accountNumber: searchRegex },
                    ],
                },
            },
        ]);

        return res.status(200).json({ status: 200, message: 'Bank data found.', data: banks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error while searching banks.' });
    }
};




