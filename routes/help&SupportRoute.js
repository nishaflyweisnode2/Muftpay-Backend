const express = require('express');
const router = express.Router();

const helpAndSupportController = require('../controllers/help&SupportController');


const authJwt = require("../middleware/auth");



module.exports = (app) => {

    // api/user/

    app.post('/api/user/help-and-support', [authJwt.isAdmin], helpAndSupportController.createHelpAndSupport);
    app.get('/api/user/help-and-support', [authJwt.verifyToken], helpAndSupportController.getAllHelpAndSupport);
    app.put('/api/user/help-and-support/:id', [authJwt.isAdmin], helpAndSupportController.updateHelpAndSupport);
    app.delete('/api/user/help-and-support/:id', [authJwt.isAdmin], helpAndSupportController.deleteHelpAndSupport);

}