const asyncHandler = require('express-async-handler')
const httpStatus = require('http-status')
const { sendSuccessResponse } = require('../utils/success')
const db = require('../db/models')
const { where } = require('sequelize')
const { sendErrorResponse } = require('../utils/failure')


const createUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email } = req.body

    const userData = {
        firstName,
        lastName,
        email
    }

    const user = await db.User.create(userData)

    sendSuccessResponse(httpStatus.CREATED, res, "Successfully created", user)
})
const updateUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email } = req.body
    const { userId } = req.params

    //check if exists or not
    const existingUser = await db.User.findByPk(userId)
    if (existingUser === null) return sendErrorResponse(httpStatus.NOT_FOUND, res, "User not found")

    const userData = {
        firstName,
        lastName,
        email
    }

    await db.User.update(userData, {
        where: {
            id: userId
        }
    })

    sendSuccessResponse(httpStatus.OK, res, "Successfully updated")
})
const readUser = asyncHandler(async (req, res) => {
    const { userId } = req.params

    //check if exists or not
    const existingUser = await db.User.findByPk(userId)
    if (existingUser === null) return sendErrorResponse(httpStatus.NOT_FOUND, res, "User not found")

    sendSuccessResponse(httpStatus.OK, res, "Successfully fetched user", existingUser)
})
const listUsers = asyncHandler(async (req, res) => {
    //pagination
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const users = await db.User.findAll({
        offset: skip,
        limit,
    })

    const response = {
        results: users,
        page,
        limit
    }

    sendSuccessResponse(httpStatus.OK, res, "Successfully fetched users", response)
})
const deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.params

    //check if exists or not
    const existingUser = await db.User.findByPk(userId)
    if (existingUser === null) return sendErrorResponse(httpStatus.NOT_FOUND, res, "User not found")

    await db.User.destroy({
        where: {
            id: userId,
        },
    });

    sendSuccessResponse(httpStatus.OK, res, "Successfully deleted user")
})

module.exports = {
    createUser,
    updateUser,
    readUser,
    listUsers,
    deleteUser,
}