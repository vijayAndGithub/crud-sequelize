const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateJwtTokens = async (JwtData) => {
    try {

        const accessToken = jwt.sign(JwtData, config.jwt.secret, { expiresIn: config.jwt.accessExpiration });
        const refreshToken = jwt.sign(JwtData, config.jwt.secret, { expiresIn: config.jwt.refreshExpiration });


        return {
            accessToken,
            refreshToken
        }

    } catch (error) {
        console.log('error generating token', error)
    }
}
const getToken = async (JwtData, expiresIn) => {
    try {

        const token = jwt.sign(JwtData, config.jwt.secret, { expiresIn });

        return {
            token,
        }

    } catch (error) {
        console.log('error generating token', error)
    }
}

module.exports = {
    generateJwtTokens,
    getToken,
}