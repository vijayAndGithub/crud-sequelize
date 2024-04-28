module.exports = {
    defaultErrorMessage: "Oops! Something went wrong",
    sendErrorResponse: function (statusCode, res, message, data = []) {
        res.status(statusCode)
        throw new Error(message)
        // res.status(statusCode).json({
        //     success: true,
        //     code: statusCode,
        //     message: message || "Oops! Something went wrong",
        //     data
        // })
    }
}