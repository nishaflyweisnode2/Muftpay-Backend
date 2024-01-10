const express = require('express');
const router = express.Router();

const donationController = require('../controllers/donationController');


const authJwt = require("../middleware/auth");




module.exports = (app) => {

    // api/user/

    app.post('/api/user/create-donation', [authJwt.verifyToken], donationController.createDonation);
    app.get('/api/user/donations', [authJwt.verifyToken], donationController.getDonations);

}