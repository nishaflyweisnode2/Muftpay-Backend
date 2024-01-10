const Wallet = require('../models/walletModel');
const Transaction = require('../models/transctionModel');
const User = require('../models/userModel');




exports.checkBalance = async (req, res) => {
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

        return res.status(200).json({ status: 200, data: wallet/*balance: wallet.balance*/ });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to check balance', error: error.message });
    }
};


exports.makeTransaction = async (req, res) => {
    try {
        const userId = req.user.id;
        const { type, amount, description } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const wallet = await Wallet.findOne({ userId });

        if (!wallet) {
            return res.status(404).json({ status: 404, message: 'Wallet not found' });
        }

        if (type === 'debit' && wallet.balance < amount) {
            return res.status(400).json({ status: 400, message: 'Insufficient balance' });
        }

        const transaction = new Transaction({
            userId,
            type,
            amount,
            description,
        });

        if (type === 'credit') {
            wallet.balance += amount;
        } else {
            wallet.balance -= amount;
        }

        wallet.transactions.push(transaction._id);

        await transaction.save();
        await wallet.save();

        return res.status(201).json({ status: 201, message: 'Transaction successful', data: transaction });
    } catch (error) {
        return res.status(500).json({ message: 'Transaction failed', error: error.message });
    }
};


exports.getTransactionHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const wallet = await Wallet.findOne({ userId }).populate('transactions');

        if (!wallet) {
            return res.status(404).json({ status: 404, message: 'Wallet not found' });
        }

        return res.status(200).json({ status: 200, transactions: wallet.transactions });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch transaction history', error: error.message });
    }
};


exports.filterTransactions = async (req, res) => {
    try {
        const userId = req.user.id;

        const { month, type } = req.query;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const filter = { userId };

        if (month) {
            const monthDate = new Date(`${month}-01`);

            if (isNaN(monthDate)) {
                return res.status(400).json({ message: 'Invalid month format. Please provide a valid date.' });
            }

            const startOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
            const endOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);

            filter.timestamp = { $gte: startOfMonth, $lte: endOfMonth };
        }

        if (type) {
            filter.type = type;
        }

        const transactions = await Transaction.find(filter);

        return res.status(200).json({ status: 200, message: 'Filtered transactions found.', data: transactions });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error while filtering transactions.' });
    }
};


exports.searchTransactions = async (req, res) => {
    try {
        const { userName, type, startDate, endDate } = req.query;

        const filter = {};

        if (userName) {
            filter.userId = await User.findOne({ name: userName }).select('_id');
        }

        if (type) {
            filter.type = type;
        }

        if (startDate && endDate) {
            filter.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const transactions = await Transaction.find(filter).populate('userId', 'name');

        return res.status(200).json({ status: 200, message: 'Transactions found.', data: transactions });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'Internal server error while searching transactions.' });
    }
};

