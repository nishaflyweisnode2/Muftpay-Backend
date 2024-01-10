const auth = require("../controllers/walletController");
const express = require("express");
const router = express()


const authJwt = require("../middleware/auth");



module.exports = (app) => {

    // api/user/

    app.post('/api/user/wallet/create', [authJwt.verifyToken], auth.createWallet);
    app.get('/api/user/wallet', [authJwt.verifyToken], auth.getWallet);

}
