const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendStatus(200)
    // res.status(200)
});

module.exports = router;
