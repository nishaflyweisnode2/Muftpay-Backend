// routes/aboutUsRoutes.js
const express = require('express');
const router = express.Router();

const privacyController = require('../controllers/privacyPolicyController');

const authJwt = require("../middleware/auth");


module.exports = (app) => {

    // api/user/

    app.post('/api/user/privacy-policy', [authJwt.isAdmin], privacyController.createOrUpdatePrivacy);
    app.get('/api/user/privacy-policy', [authJwt.verifyToken], privacyController.getPrivacy);

}