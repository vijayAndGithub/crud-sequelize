const Joi = require('joi');

const createUser = {
    body: Joi.object({
        firstName: Joi.string().alphanum().min(3).max(30).required(),
        lastName: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required()
    }),

}
const updateUser = {
    params: Joi.object({
        userId: Joi.number().integer().min(1).required(),
    }),
    body: Joi.object({
        firstName: Joi.string().alphanum().min(3).max(30).required(),
        lastName: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required()
    }),

}
const readUser = {
    params: Joi.object({
        userId: Joi.number().integer().min(1).required(),
    })
}
const deleteUser = {
    params: Joi.object({
        userId: Joi.number().integer().min(1).required(),
    })
}


module.exports = {
    createUser,
    updateUser,
    readUser,
    deleteUser,
}