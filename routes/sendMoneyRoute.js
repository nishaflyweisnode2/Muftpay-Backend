const express = require('express');
const router = express.Router();

const auth = require('../controllers/sendMoneyControlller');


const authJwt = require("../middleware/auth");


module.exports = (app) => {

    // api/user/

    app.post('/api/user/send-money', [authJwt.verifyToken], auth.createSendMoneyTransaction);
    app.get('/api/user/send-money/history', [authJwt.verifyToken], auth.getSendMoneyTransactionHistory);
    app.put('/api/user/transactions/:transactionId/status', [authJwt.verifyToken], auth.updateSendMoneyTransactionStatus);


}