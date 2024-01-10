const express = require('express');
const router = express.Router();
const auth = require('../controllers/cryptoWalletController');




const authJwt = require("../middleware/auth");


module.exports = (app) => {

    // api/user/

    app.get('/api/user/crypto-wallet/balance', [authJwt.verifyToken], auth.getBalance);
    app.post('/api/user/crypto-wallet/deposit', [authJwt.verifyToken], auth.depositCrypto);
    app.post('/api/user/crypto-wallet/withdraw', [authJwt.verifyToken], auth.withdrawCrypto);

}