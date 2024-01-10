const mongoose = require('mongoose');

const privacyPolicySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});


module.exports = mongoose.model('PrivacyPolicy', privacyPolicySchema);
