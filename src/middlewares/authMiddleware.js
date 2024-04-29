const asyncHandler = require("express-async-handler")
const jwt = require('jsonwebtoken')
const { sendSuccessResponse } = require("../utils/success")
const { sendErrorResponse } = require("../utils/failure")
const httpStatus = require("http-status")
const db = require("../db/models")
const config = require("../config/config")

const checkRole = (roleNeeded) => userRole === roleNeeded

const checkAuth = asyncHandler(async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[ 1 ]
        try {
            const decoded = jwt.verify(token, config.jwt.secret);

            const user = await db.User.findByPk(decoded.id)
            if (user === null) { return sendErrorResponse(httpStatus.UNAUTHORIZED, res, "User not found") }

            req.user = user

            next()
        } catch (err) {
            sendErrorResponse(httpStatus.FORBIDDEN, res, "token verification failed")
        }
    } else {
        sendErrorResponse(httpStatus.FORBIDDEN, res, "please login first")
    }
})
module.exports = {
    checkRole,
    checkAuth,
}