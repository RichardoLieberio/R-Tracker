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
        case 'account-verification':
            transporter.sendMail(createAccountVerificationOptions(mail.to, mail.otp), function(error) {
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

function createAccountVerificationOptions(to, otp) {
    return {
        from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_ADDRESS}>`,
        to,
        subject: 'Account Verification Code',
        html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">R-Tracker</a>
                    </div>
                    <p style="font-size:1.1em">Hi,</p>
                    <p>Thank you for choosing R-Tracker. Use the following OTP to complete your Sign Up procedures. OTP is valid for <b>15 minutes</b></p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                    <p style="font-size:0.9em;">Regards,<br />R-Tracker</p>
                </div>
            </div>
        `
        // <p>Please follow this link below to verify your account.</p>
        //     <p><a href="${uri}">${uri}</a></p>
        //     <p>Link will be valid for <b>15 minutes</b></p>
        //     <br>
        //     <p>If you didn't request this, please ignore this email</p>
        //     <br>
        //     <p>Best regards,<br>
        //     R-Tracker</p>
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