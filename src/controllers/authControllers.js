const asyncHandler = require('express-async-handler')
const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const { sendSuccessResponse } = require('../utils/success')
const db = require('../db/models')
const { where } = require('sequelize')
const { sendErrorResponse } = require('../utils/failure')
const config = require('../config/config')
const bcrypt = require('bcrypt');
const authServices = require('../services/authServices')
const { sendMail } = require('../services/emailService')

const signup = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    //check if user already exists
    const userExists = await db.User.findOne({ where: { email }, paranoid: false })
    if (userExists) { return sendErrorResponse(httpStatus.BAD_REQUEST, res, "User already exists") }


    const hashedPassword = await bcrypt.hash(password, config.passwordEncryption.saltRounds)

    const userData = {
        firstName,
        lastName,
        email,
        password: hashedPassword
    }

    const user = await db.User.create(userData)

    //jwt flow
    const jwtClaim = {
        id: user.id
    }
    const { accessToken, refreshToken } = await authServices.generateJwtTokens(jwtClaim)

    const response = {
        ...user.dataValues,
        accessToken,
        refreshToken,
    }

    sendSuccessResponse(httpStatus.CREATED, res, "Successfully created", response)
})
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //check if user already exists
    const userExists = await db.User.findOne({ where: { email } })
    if (userExists === null) { return sendErrorResponse(httpStatus.NOT_FOUND, res, "User not found") }

    //check password
    const isMatch = await bcrypt.compare(password, userExists.password)
    if (!isMatch) { return sendErrorResponse(httpStatus.UNAUTHORIZED, res, "Username or password is wrong.") }


    //jwt flow
    const jwtClaim = {
        id: userExists.id
    }
    const { accessToken, refreshToken } = await authServices.generateJwtTokens(jwtClaim)

    const response = {
        ...userExists.dataValues,
        accessToken,
        refreshToken,
    }
    res.cookie('accessToken', accessToken, { maxAge: 900000, httpOnly: true });
    res.cookie('refreshToken', refreshToken, { maxAge: 900000, httpOnly: true });

    sendSuccessResponse(httpStatus.OK, res, "Successfully logged in", response)
})
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body

    //check if user already exists
    const userExists = await db.User.findOne({ where: { email } })
    if (userExists === null) { return sendErrorResponse(httpStatus.NOT_FOUND, res, "User not found") }

    const jwtData = {
        id: userExists.id
    }
    const { token } = await authServices.getToken(jwtData, config.jwt.forgotPasswordExpiration)
    console.log(token)

    const html = `Click here to reset your password: <a href="${config.front_end_url}/forgot-password/?${token}">Link</a>`
    sendMail(userExists.email, "Reset password", html).catch((err) => console.log("Error sending mail: " + err))

    sendSuccessResponse(httpStatus.OK, res, "Please check mail for reset link")
})
const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.query
    const { newPassword } = req.body
    try {
        const decoded = jwt.verify(token, config.jwt.secret);

        const user = await db.User.findByPk(decoded.id)
        if (user === null) { return sendErrorResponse(httpStatus.UNAUTHORIZED, res, "User not found") }

        req.user = user


        const hashedPassword = await bcrypt.hash(newPassword, config.passwordEncryption.saltRounds)
        const userData = {
            password: hashedPassword
        }

        await db.User.update(userData, {
            where: { id: user.id }
        })

        sendSuccessResponse(httpStatus.OK, res, "Password updated")

    } catch (err) {
        return sendErrorResponse(httpStatus.FORBIDDEN, res, "token verification failed")
    }
})

module.exports = {
    signup,
    login,
    forgotPassword,
    resetPassword,
}