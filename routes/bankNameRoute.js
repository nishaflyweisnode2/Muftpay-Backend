const express = require('express');
const router = express.Router();

const auth = require('../controllers/bankNameController');

const authJwt = require("../middleware/auth");

const { bankImage } = require('../middleware/imageUpload');


module.exports = (app) => {

    // api/admin/

    app.post('/api/admin/bankname/add', [authJwt.isAdmin], bankImage.single('image'), auth.addBankName);
    app.get('/api/admin/banknames', [authJwt.isAdmin], auth.getAllBankNames);
    app.get('/api/user/search', [authJwt.verifyToken], auth.searchBankNames);

}