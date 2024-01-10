const auth = require("../controllers/userController");
const express = require("express");
const router = express()


const authJwt = require("../middleware/auth");

const { profileImage, panCardImage, AadharCardImage } = require('../middleware/imageUpload');



module.exports = (app) => {

    // api/user/

    app.post('/api/user/register', auth.register);
    app.post('/api/user/verify/:userId', auth.verifyOTP);
    app.post('/api/user/login', auth.login);
    app.post('/api/user/resend/:userId', auth.resendOTP);
    app.get("/api/user/getProfile", [authJwt.verifyToken], auth.getProfile);
    app.post('/api/user/forgot-password', auth.forgotPassword)
    app.post('/api/user/reset-password/:resetCode', auth.resetPassword);
    app.put('/api/user/update', [authJwt.verifyToken], auth.updateUser);
    app.put('/api/user/updateProfile', [authJwt.verifyToken], auth.updateProfile);
    app.put('/api/user/upload-profile-picture', [authJwt.verifyToken], profileImage.single('image'), auth.uploadProfilePicture);
    app.put('/api/user/upload/uploadPancardPicture', [authJwt.verifyToken], panCardImage.single('image'), auth.uploadPancardPicture);
    app.put('/api/user/upload/uploadAadharPicture', [authJwt.verifyToken], AadharCardImage.single('image'), auth.uploadAadharPicture);
    app.get('/api/user/getAll', [authJwt.verifyToken], auth.getAllUsers);
    app.get('/api/user/byId/:userId', [authJwt.verifyToken], auth.getUserById);



    /// admin 
    app.post("/api/admin/registration", auth.registration);
    app.post("/api/admin/login", auth.signin);
    app.put("/api/admin/update", [authJwt.isAdmin], auth.update);

}