require('dotenv').config()

module.exports = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    front_end_url: "http://localhost:3000",
    passwordEncryption: {
        saltRounds: 11
    },
    jwt: {
        secret: 'randomStrongSecret@12',
        accessExpiration: '2h',
        refreshExpiration: '8h',
        forgotPasswordExpiration: 300
    },
    mail: {
        from: "maddison53@ethereal.email",
        transportConfig: {
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        }
    }
}