const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PWD
    }
});

function sendMail(type, mail) {
    switch (type) {
        case 'verification':
            transporter.sendMail(createAccountVerificationOptions(mail.to, mail.uri), function(error) {
                error ? console.log(`Failed to send verification email to ${mail.to}`) : console.log(`Sucessfully sent verification email to ${mail.to}`);
            });
            break;
        case 'pwd-reset':
            transporter.sendMail(createPwdResetOptions(mail.to, mail.uri), function(error) {
                error ? console.log(`Failed to send password reset email to ${mail.to}`) : console.log(`Sucessfully sent password reset email to ${mail.to}`);
            });
            break;
        default:
            console.log('Invalid email type');
            break;
    }
}

function createAccountVerificationOptions(to, uri) {
    return {
        from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_ADDRESS}>`,
        to,
        subject: 'R-Tracker Account Verification',
        html: `
            <p>Please follow this link below to verify your account.</p>
            <p><a href="${uri}">${uri}</a></p>
            <p>Link will be valid for <b>15 minutes</b></p>
            <br>
            <p>If you didn't request this, please ignore this email</p>
            <br>
            <p>Best regards,<br>
            R-Tracker</p>
        `
    };
}

function createPwdResetOptions(to, uri) {
    return {
        from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_ADDRESS}>`,
        to,
        subject: 'R-Tracker Reset Password',
        html: `
            <p>We received a request to reset the password for your account.</p>
            <br>
            <p>To reset your password, please follow the link below. Link will be valid for <b>15 minutes</b></p>
            <p><a href="${uri}">${uri}</a></p>
            <br>
            <p>If you didn't request this, please ignore this email</p>
            <br>
            <p>Best regards,<br>
            R-Tracker</p>
        `
    };
}

module.exports = sendMail;