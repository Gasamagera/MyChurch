const nodemailer = require('nodemailer');


const sendEmail = async options => {

    const transporter = nodemailer.createTransport({
        host : process.env.EMAIL_HOST,
        port : process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    // Define the Email options

    const mailOptions = { 
        from: 'Iraadukunda Prince <iradukundaprincega@gmail.como>' ,
        to : options.email,
        subject : options.subject,
        text : options.message
    }
    // actual Send Email
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;