const fs = require('fs');
const path = require('path');

const csvFilePath = path.join(__dirname, '../../feedback.csv');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    let { name, email, message } = JSON.parse(event.body);
    name = name ? name.replace(/\r?\n|,/g, ' ') : '';
    email = email ? email.replace(/\r?\n|,/g, ' ') : '';
    message = message ? message.replace(/\r?\n|,/g, ' ') : '';
    const date = new Date().toISOString();

    const row = `"${date}","${name}","${email}","${message}"
`;

    // If file doesn't exist, add header
    if (!fs.existsSync(csvFilePath)) {
        fs.writeFileSync(csvFilePath, 'Date,Name,Email,Message\n');
    }
    fs.appendFileSync(csvFilePath, row);

    return {
        statusCode: 200,
        body: 'Feedback saved',
    };
};
