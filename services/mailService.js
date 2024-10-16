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
            transporter.sendMail(createAccountVerificationOptions(mail.to, mail.name, mail.otp), function(error) {
                error ? console.log(`Failed to send verification email to ${mail.to}`) : console.log(`Sucessfully sent verification email to ${mail.to}`);
            });
            break;
        case 'account-verified':
            transporter.sendMail(createAccountVerifiedOptions(mail.to, mail.name), function(error) {
                error ? console.log(`Failed to send welcoming email to ${mail.to}`) : console.log(`Sucessfully sent welcoming email to ${mail.to}`);
            });
            break;
        case 'pwd-reset':
            transporter.sendMail(createPwdResetOptions(mail.to, mail.otp), function(error) {
                error ? console.log(`Failed to send password reset email to ${mail.to}`) : console.log(`Sucessfully sent password reset email to ${mail.to}`);
            });
            break;
        case 'pwd-successfully-reset':
            transporter.sendMail(createPwdSuccessfullyResetOptions(mail.to), function(error) {
                error ? console.log(`Failed to send password successfully reset email to ${mail.to}`) : console.log(`Sucessfully sent password successfully reset email to ${mail.to}`);
            });
            break;
        default:
            console.log('Invalid email type');
            break;
    }
}

function createAccountVerificationOptions(to, name, otp) {
    return {
        from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_ADDRESS}>`,
        to,
        subject: 'Account Verification Code',
        html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">${process.env.EMAIL_NAME}</a>
                    </div>
                    <p style="font-size:1.1em">Hi ${name},</p>
                    <p>Thank you for choosing ${process.env.EMAIL_NAME}. Use the following OTP to complete your Sign Up procedures. OTP will be valid for <b>15 minutes</b></p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                    <p>If you didn't request this, please ignore this email</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <p style="font-size:0.9em;">Regards,<br />${process.env.EMAIL_NAME}</p>
                    <br>
                    <a href="${process.env.GITHUB_URI}" target="_blank">
                        <img src="${process.env.SERVER_URI}/public/email/github.png" alt="Github" width="24" height="24">
                    </a>
                    <a href="${process.env.LINKEDIN_URI}" target="_blank">
                        <img src="${process.env.SERVER_URI}/public/email/linkedin.png" alt="LinkedIn" width="24" height="24">
                    </a>
                    <a href="${process.env.INSTAGRAM_URI}" target="_blank">
                        <img src="${process.env.SERVER_URI}/public/email/instagram.png" alt="Instagram" width="24" height="24">
                    </a>
                </div>
            </div>
        `
    };
}

function createAccountVerifiedOptions(to, name) {
    return {
        from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_ADDRESS}>`,
        to,
        subject: 'Account Successfully Verified',
        html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">${process.env.EMAIL_NAME}</a>
                    </div>
                    <p style="font-size:1.1em">Hi ${name},</p>
                    <p>We’re excited to let you know that your account has been successfully verified!</p>
                    <p>You can now enjoy all the features and services we have to offer</p>
                    <p>Thank you for being part of ${process.env.EMAIL_NAME}!</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <p style="font-size:0.9em;">Regards,<br />${process.env.EMAIL_NAME}</p>
                    <br>
                    <a href="${process.env.GITHUB_URI}" target="_blank">
                        <img src="${process.env.SERVER_URI}/public/email/github.png" alt="Github" width="24" height="24">
                    </a>
                    <a href="${process.env.LINKEDIN_URI}" target="_blank">
                        <img src="${process.env.SERVER_URI}/public/email/linkedin.png" alt="LinkedIn" width="24" height="24">
                    </a>
                    <a href="${process.env.INSTAGRAM_URI}" target="_blank">
                        <img src="${process.env.SERVER_URI}/public/email/instagram.png" alt="Instagram" width="24" height="24">
                    </a>
                </div>
            </div>
        `
    };
}

function createPwdResetOptions(to, otp) {
    return {
        from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_ADDRESS}>`,
        to,
        subject: 'Password Reset Code',
        html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">${process.env.EMAIL_NAME}</a>
                    </div>
                    <p>We received a request to reset the password for your account. Please use the code below to continue. OTP will be valid for <b>15 minutes</b></p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                    <p>If you didn't request this, please ignore this email</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <p style="font-size:0.9em;">Regards,<br />${process.env.EMAIL_NAME}</p>
                    <br>
                    <a href="${process.env.GITHUB_URI}" target="_blank">
                        <img src="${process.env.SERVER_URI}/public/email/github.png" alt="Github" width="24" height="24">
                    </a>
                    <a href="${process.env.LINKEDIN_URI}" target="_blank">
                        <img src="${process.env.SERVER_URI}/public/email/linkedin.png" alt="LinkedIn" width="24" height="24">
                    </a>
                    <a href="${process.env.INSTAGRAM_URI}" target="_blank">
                        <img src="${process.env.SERVER_URI}/public/email/instagram.png" alt="Instagram" width="24" height="24">
                    </a>
                </div>
            </div>
        `
    };
}

function createPwdSuccessfullyResetOptions(to) {
    return {
        from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_ADDRESS}>`,
        to,
        subject: 'Your Password Has Been Successfully Reset',
        html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">${process.env.EMAIL_NAME}</a>
                    </div>
                    <p>We wanted to let you know that your account password was successfully changed. If you made this change, no further action is needed.</p>
                    <p>Thank you for being part of ${process.env.EMAIL_NAME}!</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <p style="font-size:0.9em;">Regards,<br />${process.env.EMAIL_NAME}</p>
                    <br>
                    <a href="${process.env.GITHUB_URI}" target="_blank">
                        <img src="${process.env.SERVER_URI}/public/email/github.png" alt="Github" width="24" height="24">
                    </a>
                    <a href="${process.env.LINKEDIN_URI}" target="_blank">
                        <img src="${process.env.SERVER_URI}/public/email/linkedin.png" alt="LinkedIn" width="24" height="24">
                    </a>
                    <a href="${process.env.INSTAGRAM_URI}" target="_blank">
                        <img src="${process.env.SERVER_URI}/public/email/instagram.png" alt="Instagram" width="24" height="24">
                    </a>
                </div>
            </div>
        `
    };
}

module.exports = sendMail;