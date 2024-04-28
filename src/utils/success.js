module.exports = {
    defaultSuccessMessage: "Successful",
    sendSuccessResponse: function (statusCode, res, message, data = []) {
        res.status(statusCode).json({
            success: true,
            code: statusCode,
            message: message || "Successful",
            data
        })
    }
}