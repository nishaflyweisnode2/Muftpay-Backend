const BankName = require('../models/bankNameModel');

const { AddbankName } = require('../validations/bankNameValidation');



exports.addBankName = async (req, res) => {
    try {
        if (!req.user.id) {
            return res.status(403).json({ message: 'Access denied. Only admin users can add bank names' });
        }

        const { error } = AddbankName.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { name } = req.body;

        if (!req.file) {
            return res.status(400).json({ status: 400, error: "Image file is required" });
        }

        const bankName = new BankName({
            name,
            image: req.file.path,
        });
        await bankName.save();

        return res.status(201).json({ status: 201, message: 'Bank name added successfully', bankName });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to add bank name', error: error.message });
    }
};


exports.getAllBankNames = async (req, res) => {
    try {
        const bankNames = await BankName.find();

        return res.status(200).json({ status: 200, data: bankNames });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch bank names', error: error.message });
    }
};


exports.searchBankNames = async (req, res) => {
    try {
        const { keyword } = req.query;

        if (!keyword) {
            return res.status(400).json({ status: 400, message: 'Keyword is required for searching bank names.' });
        }

        const regex = new RegExp(keyword, 'i');
        const bankNames = await BankName.find({ name: regex });

        return res.status(200).json({ status: 200, message: 'Bank names found successfully', bankNames });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to search bank names', error: error.message });
    }
};
