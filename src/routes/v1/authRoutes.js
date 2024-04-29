const express = require('express');
const router = express.Router();
const validateRequest = require('../../middlewares/validationMiddleware')
const authValidations = require('../../validations/authValidations')
const authControllers = require('../../controllers/authControllers')

router.route('/signup')
    .post(
        validateRequest(authValidations.signup),
        authControllers.signup)
router.route('/login')
    .post(
        validateRequest(authValidations.login),
        authControllers.login)
router.route('/forgot-password')
    .post(
        validateRequest(authValidations.forgotPassword),
        authControllers.forgotPassword)
router.route('/reset-password')
    .post(
        validateRequest(authValidations.resetPassword),
        authControllers.resetPassword)


module.exports = router;
