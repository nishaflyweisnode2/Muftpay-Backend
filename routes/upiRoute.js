const express = require('express');
const router = express.Router();

const auth = require('../controllers/upiController');

const authJwt = require("../middleware/auth");


module.exports = (app) => {

    // api/user/

    app.post('/api/user/create-upi', [authJwt.verifyToken], auth.createUPI);
    app.put('/api/user/update-upi', [authJwt.verifyToken], auth.updateUPI);
    app.get('/api/user/upi', [authJwt.verifyToken], auth.getUPI);
    app.delete('/api/user/upi', [authJwt.verifyToken], auth.deleteUPI);
}