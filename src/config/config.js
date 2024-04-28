require('dotenv').config()

module.exports = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    passwordEncryption: {
        saltRounds: 11
    },
    jwt: {
        secret: 'randomStrongSecret@12',
        accessExpiration: '2h',
        refreshExpiration: '8h'
    }
}