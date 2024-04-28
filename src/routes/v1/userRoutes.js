const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController')

/* GET home page. */
// router.get('/', function (req, res, next) {
//     res.sendStatus(200)
//     // res.status(200)
// });

router.route('/')
    .post(userController.createUser)
    .get(userController.listUsers)

router.route('/:userId')
    .put(userController.updateUser)
    .get(userController.readUser)
    .delete(userController.deleteUser)

module.exports = router;
