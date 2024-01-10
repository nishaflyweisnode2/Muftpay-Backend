const express = require('express');
const router = express.Router();

const auth = require('../controllers/bankAddController');


const authJwt = require("../middleware/auth");



module.exports = (app) => {

    // api/user/

    app.post('/api/user/bank/add', [authJwt.verifyToken], auth.addBankAccount);
    app.get('/api/user/bank/accounts', [authJwt.verifyToken], auth.getBankAccounts);
    app.put('/api/user/bank/update', [authJwt.verifyToken], auth.updateBankDetails);
    app.get('/api/user/bank/search', [authJwt.verifyToken], auth.searchBankAccounts);

}
