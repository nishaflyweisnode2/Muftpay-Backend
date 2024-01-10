const Wallet = require('../models/walletModel');
const User = require('../models/userModel');



exports.createWallet = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const existingWallet = await Wallet.findOne({ userId });

        if (existingWallet) {
            return res.status(400).json({ status: 400, message: 'User already has a wallet' });
        }

        const wallet = new Wallet({ userId: userId });
        await wallet.save();

        return res.status(201).json({ status: 201, message: 'Wallet created successfully', wallet });
    } catch (error) {
        return res.status(500).json({ message: 'Wallet creation failed', error: error.message });
    }
};


exports.getWallet = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const wallet = await Wallet.findOne({ userId });

        if (!wallet) {
            return res.status(404).json({ status: 404, message: 'Wallet not found' });
        }

        return res.status(200).json({ status: 200, data: wallet });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch wallet', error: error.message });
    }
};
