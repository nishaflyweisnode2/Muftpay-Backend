const User = require('../models/userModel');
const Wallet = require('../models/walletModel');
const SendMoneyTransaction = require('../models/sendMoneyModel');
const Transaction = require('../models/transctionModel');

const { createSendMoneyTransactionValidation } = require('../validations/sendMoneyValidation');




exports.createSendMoneyTransaction = async (req, res) => {
    try {
        const userId = req.user.id;

        const { error } = createSendMoneyTransactionValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const senderWallet = await Wallet.findOne({ userId });

        if (!senderWallet) {
            return res.status(404).json({ status: 400, message: 'Sender wallet not found' });
        }

        if (senderWallet.balance < req.body.amount) {
            return res.status(400).json({ status: 400, message: 'Insufficient balance' });
        }

        const amount = req.body.amount;

        senderWallet.balance -= amount;
        await senderWallet.save();

        const sendMoneyTransaction = new SendMoneyTransaction({
            userId,
            recipientName: req.body.recipientName,
            recipientAccountNumber: req.body.recipientAccountNumber,
            recipientIFSC: req.body.recipientIFSC,
            amount,
        });

        await sendMoneyTransaction.save();

        const transaction = new Transaction({
            userId,
            type: 'transfer',
            amount,
            description: `Sent ${amount} to ${req.body.recipientName}`,
        });
        await transaction.save();

        return res.status(201).json({ status: 201, message: 'Send money transaction created successfully', data: sendMoneyTransaction });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create send money transaction', error: error.message });
    }
};


exports.getSendMoneyTransactionHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const transactions = await SendMoneyTransaction.find({ userId }).sort({ transactionDate: 'desc' });

        return res.status(200).json({ status: 200, data: transactions });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve send money transaction history', error: error.message });
    }
};


exports.updateSendMoneyTransactionStatus = async (req, res) => {
    try {
        const transactionId = req.params.transactionId;

        const newStatus = req.body.status;

        const sendMoneyTransaction = await SendMoneyTransaction.findById(transactionId);

        if (!sendMoneyTransaction) {
            return res.status(404).json({ status: 404, message: 'Send money transaction not found' });
        }

        sendMoneyTransaction.status = newStatus;
        await sendMoneyTransaction.save();

        return res.status(200).json({ status: 200, message: 'Send money transaction status updated successfully', data: sendMoneyTransaction });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update send money transaction status', error: error.message });
    }
};

