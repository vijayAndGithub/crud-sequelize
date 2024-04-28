const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController')
const validateRequest = require('../../middlewares/validationMiddleware')
const userValidations = require('../../validations/userValidations')

router.route('/')
    .post(
        validateRequest(userValidations.createUser),
        userController.createUser)
    .get(userController.listUsers)

router.route('/:userId')
    .put(
        validateRequest(userValidations.updateUser),
        userController.updateUser)
    .get(
        validateRequest(userValidations.readUser),
        userController.readUser)
    .delete(
        validateRequest(userValidations.deleteUser),
        userController.deleteUser)

module.exports = router;
