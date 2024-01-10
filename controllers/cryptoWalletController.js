const CryptoWallet = require('../models/cryptoWalletModel');




exports.getBalance = async (req, res) => {
    try {
        const userId = req.user.id;
        const wallet = await CryptoWallet.findOne({ userId });

        if (!wallet) {
            return res.status(404).json({ status: 404, message: 'Crypto wallet not found' });
        }

        return res.status(200).json({ status: 200, balance: wallet.cryptoBalance });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch crypto wallet balance', error: error.message });
    }
};


exports.depositCrypto = async (req, res) => {
    // Implement deposit logic here
};


exports.withdrawCrypto = async (req, res) => {
    // Implement withdrawal logic here
};
