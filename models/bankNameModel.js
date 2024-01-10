const mongoose = require('mongoose');

const bankNameSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
});

const BankName = mongoose.model('BankName', bankNameSchema);

module.exports = BankName;
