const Joi = require('joi');

const signup = {
    body: Joi.object({
        firstName: Joi.string().alphanum().min(3).max(30).required(),
        lastName: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9@#]{8,30}$')),
    }),

}
const login = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9@#]{8,30}$')),
    }),
}


module.exports = {
    signup,
    login,
}