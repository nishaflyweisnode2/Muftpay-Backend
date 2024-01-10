const auth = require("../controllers/transctionController");
const express = require("express");
const router = express()


const authJwt = require("../middleware/auth");




module.exports = (app) => {

    // api/user/

    app.get('/api/user/wallet/balance', [authJwt.verifyToken], auth.checkBalance);
    app.post('/api/user/wallet/transaction', [authJwt.verifyToken], auth.makeTransaction);
    app.get('/api/user/wallet/transactions', [authJwt.verifyToken], auth.getTransactionHistory);
    app.get('/api/user/filter-transactions', [authJwt.verifyToken], auth.filterTransactions);
    app.get('/api/user/search', [authJwt.verifyToken], auth.searchTransactions);

}