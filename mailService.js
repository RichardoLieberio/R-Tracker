require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PWD
    }
});

async function sendMail(type, mail) {
    switch (type) {
        case 'verification':
            await transporter.sendMail(createVerificationOptions(mail.to, mail.otp), function(error) {
                error ? console.log(`Failed to send verification email to ${mail.to}`) : console.log(`Sucessfully sent verification email to ${mail.to}`);
            });
            break;
        default:
            console.log('Invalid email type');
            break;
    }
}

function createVerificationOptions(to, otp) {
    return {
        from: process.env.EMAIL_ADDRESS,
        to,
        subject: 'R-Tracker Verification Code',
        html: `
            <h1>R-Tracker</h1>
            <p>Please use this code below to verify your account.</p>
            <h2><strong>${otp}</strong></h2>
            <p>Code will be valid for <b>15 minutes</b></p>
            <br>
            <p>If you didn't request this, please ignore this email</p>
            <br>
            <p>Regards,<br>
            R-Tracker</p>
        `
    };
}

module.exports = sendMail;