const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    mobileNumber: {
        type: String,
    },
    image: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    resetCode: {
        type: String,
    },
    panCardNumber: {
        type: String,
    },
    panCardImage: {
        type: String,
    },
    aadharNumber: {
        type: String,
    },
    aadharCardImage: {
        type: String,
    },
    otp: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
    },
    completeProfile: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    userType: {
        type: String,
        enum: ["ADMIN", "USER"], default: "USER"
    },

}, { timestamps: true });


const User = mongoose.model('User', userSchema);



module.exports = User;
