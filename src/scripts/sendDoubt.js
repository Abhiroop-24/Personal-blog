const nodemailer = require('nodemailer');

// Replace with your email and app password (for Gmail, use App Passwords)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abhiroopsanil24@gmail.com',
        pass: 'YOUR_APP_PASSWORD' // Replace with your app password
    }
});

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    const { email, message } = JSON.parse(event.body);

    if (!message) {
        return {
            statusCode: 400,
            body: 'Message is required',
        };
    }

    const mailOptions = {
        from: email || 'no-reply@yourdomain.com',
        to: 'abhiroopsanil24@gmail.com',
        subject: 'New Doubt from Blog Contact Form',
        text: `Message: ${message}\nFrom: ${email || 'Anonymous'}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: 'Message sent successfully',
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Failed to send message',
        };
    }
};
