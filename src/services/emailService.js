const nodemailer = require("nodemailer");
const config = require("../config/config");

const transporter = nodemailer.createTransport(config.mail.transportConfig);

const sendMail = async (to, subject, html, text = '') => {
    try {
        const info = await transporter.sendMail({
            from: `"Maddison Foo Koch 👻" <${config.mail.from}>`, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    } catch (error) {
        console.log("Error sending mail", error)
    }
}


module.exports = {
    sendMail
}