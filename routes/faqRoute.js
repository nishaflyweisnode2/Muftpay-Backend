const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');



const authJwt = require("../middleware/auth");


module.exports = (app) => {

    // api/user/

    app.post('/api/user/faqs', [authJwt.verifyToken], faqController.createFAQ);
    app.get('/api/user/faqs', [authJwt.verifyToken], faqController.listFAQs);
    app.put('/api/user/faqs/:id', [authJwt.verifyToken], faqController.updateFAQ);
    app.delete('/api/user/faqs/:id', [authJwt.verifyToken], faqController.deleteFAQ);



}