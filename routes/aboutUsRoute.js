// routes/aboutUsRoutes.js
const express = require('express');
const router = express.Router();

const aboutUsController = require('../controllers/aboutUsController');

const authJwt = require("../middleware/auth");



module.exports = (app) => {

    // api/user/

    app.post('/api/user/about-us', [authJwt.isAdmin], aboutUsController.createOrUpdateAboutUs);
    app.get('/api/user/about-us', [authJwt.verifyToken], aboutUsController.getAboutUs);

}