const asyncHandler = require('express-async-handler')
const httpStatus = require('http-status')
const { sendSuccessResponse } = require('../utils/success')
const db = require('../db/models')
const { where } = require('sequelize')
const { sendErrorResponse } = require('../utils/failure')
const config = require('../config/config')
const bcrypt = require('bcrypt');
const authServices = require('../services/authServices')

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

module.exports = {
    signup,
    login,
}