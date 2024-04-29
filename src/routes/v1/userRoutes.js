const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController')
const validateRequest = require('../../middlewares/validationMiddleware')
const userValidations = require('../../validations/userValidations');
const { checkAuth } = require('../../middlewares/authMiddleware');

router.route('/')
    .post(
        validateRequest(userValidations.createUser),
        userController.createUser)
    .get(userController.listUsers)

router.route('/:userId')
    .put(
        checkAuth,
        validateRequest(userValidations.updateUser),
        userController.updateUser)
    .get(
        checkAuth,
        validateRequest(userValidations.readUser),
        userController.readUser)
    .delete(
        checkAuth,
        validateRequest(userValidations.deleteUser),
        userController.deleteUser)

module.exports = router;
