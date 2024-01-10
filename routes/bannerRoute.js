const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');


const { bannerImage } = require('../middleware/imageUpload');

const authJwt = require("../middleware/auth");


module.exports = (app) => {

    // api/user/

    app.post('/api/user/banners', [authJwt.isAdmin], bannerImage.single('image'), bannerController.createBanner);
    app.get('/api/user/banners', [authJwt.verifyToken], bannerController.getAllBanners);



}
