const express = require('express');
const router = express.Router();

const Campaign = require('../controllers/donationCampaignController');


const authJwt = require("../middleware/auth");

const { DonationCampaignImage } = require('../middleware/imageUpload');



module.exports = (app) => {

    // api/user/

    app.post('/api/user/Campaign', [authJwt.verifyToken], DonationCampaignImage.single('image'), Campaign.createCampaign);
    app.get('/api/user/Campaign', [authJwt.verifyToken], Campaign.getAllCampaigns);
    app.get('/api/user/Campaign/:id', [authJwt.verifyToken], Campaign.getCampaignById);
    app.put('/api/user/Campaign/:id', [authJwt.verifyToken], DonationCampaignImage.single('image'), Campaign.updateCampaign);
    app.delete('/api/user/Campaign/:id', [authJwt.verifyToken], Campaign.deleteCampaign);

}
