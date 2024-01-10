const mongoose = require('mongoose');

const helpAndSupportSchema = new mongoose.Schema({
    mobileNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('HelpAndSupport', helpAndSupportSchema);
