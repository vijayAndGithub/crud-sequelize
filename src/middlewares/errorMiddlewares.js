const { stack } = require("sequelize/lib/utils")
const config = require("../config/config")
const httpStatus = require("http-status")

const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Not Found'
    })
}

const errorHandler = (err, req, res, next) => {
    console.log(err)

    const statusCode = (res.statusCode === httpStatus.OK) ? httpStatus.INTERNAL_SERVER_ERROR : res.statusCode

    const response = {
        success: false,
        message: err.message || "Internal server error",
        stack: config.node_env === "production" ? null : err.stack,
    }

    res.status(statusCode).json(response)
}

module.exports = {
    notFound,
    errorHandler,
}