const express = require('express');
const router = express.Router();

const exchangeRateController = require('../controllers/exchangeRateController');


const authJwt = require("../middleware/auth");


module.exports = (app) => {

    // api/user/

    app.get('/api/user/exchange-rate', [authJwt.verifyToken], exchangeRateController.getExchangeRate);

}