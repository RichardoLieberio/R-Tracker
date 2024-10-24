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
    const options = createOptions(type, mail);
    options && transporter.sendMail(options, function(error) {
        console.log(`${error ? 'Failed to send' : 'Successfully sent'} ${type} email to ${mail.to}`);
    });
}

function createOptions(type, mail) {
    const from = `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_ADDRESS}>`;
    let subject;
    let html;

    switch (type) {
        case 'account-verification':
            subject = 'Account Verification Code';
            html = `
                <p style="font-size:1.1em">Hi ${mail.name},</p>
                <p>Thank you for choosing ${process.env.EMAIL_NAME}. Use the following OTP to complete your Sign Up procedures. OTP will be valid for <b>15 minutes</b></p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${mail.otp}</h2>
                <p>If you didn't request this, please ignore this email</p>
            `;
            break;
        case 'account-verified':
            subject = 'Account Successfully Verified';
            html = `
                <p style="font-size:1.1em">Hi ${mail.name},</p>
                <p>We’re excited to let you know that your account has been successfully verified!</p>
                <p>You can now enjoy all the features and services we have to offer</p>
                <p>Thank you for being part of ${process.env.EMAIL_NAME}!</p>
            `;
            break;
        case 'pwd-reset':
            subject = 'Password Reset Code';
            html = `
                <p>We received a request to reset the password for your account. Please use the code below to continue. OTP will be valid for <b>15 minutes</b></p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${mail.otp}</h2>
                <p>If you didn't request this, please ignore this email</p>
            `;
            break;
        case 'pwd-successfully-reset':
            subject = 'Your Password Has Been Successfully Reset';
            html = `
                <p>We wanted to let you know that your account password was successfully changed.</p>
                <p>If you made this change, no further action is needed.</p>
                <p>Thank you for being part of ${process.env.EMAIL_NAME}!</p>
            `;
            break;
        case 'new-email-verification':
            subject = 'New Email Verification Code';
            html = `
                <p>We received a request to change the email associated with your account. Please use the OTP below to verify your new email address. OTP will be valid for <b>15 minutes</b></p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${mail.otp}</h2>
                <p>If you didn't request this, please ignore this email</p>
            `;
            break;
        case 'new-email-verified':
            subject = 'Your Email Has Been Changed';
            html = `
                <p>We wanted to let you know that the email address associated with your account has been successfully updated. From now on, all account-related communications will be sent to this email address.</p>
                <p>If you made this change, no further action is needed.</p>
                <p>Thank you for being part of ${process.env.EMAIL_NAME}!</p>
            `;
            break;
        case 'account-deleted':
            subject = 'Account Deletion';
            html = `
                <p style="font-size:1.1em">Dear ${mail.name},</p>
                <p>We’re writing to confirm that your account with ${process.env.EMAIL_NAME} has been successfully deleted. We’re sorry to see you go, but we respect your decision.</p>
                <p>If you have any feedback on your experience or if there’s anything we could have done better, we would love to hear from you. Your input is valuable to us and helps improve our services.</p>
                <p>Thank you for being a part of ${process.env.EMAIL_NAME}. We wish you all the best in the future.</p>
            `;
            break;
        default:
            console.log('Invalid email type');
            return null;
    }

    html = `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">${process.env.EMAIL_NAME}</a>
                </div>
                ${html}
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
                <a href="${process.env.WHATSAPP_URI}" target="_blank">
                    <img src="${process.env.SERVER_URI}/public/email/whatsapp.png" alt="Whatsapp" width="24" height="24">
                </a>
            </div>
        </div>
    `;

    return {from, to: mail.to, subject, html};
}

module.exports = sendMail;