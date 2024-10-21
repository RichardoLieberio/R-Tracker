const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const TransactionError = require('../services/TransactionError');

const ExpenseCategory = require('../models/ExpenseCategory');

async function addCategory(req, res) {
    const {name, icon} = req.data;

    const matches = icon.match(/^data:(image\/\w+);base64,(.+)$/);
    const format = matches[1].split('/')[1];
    const base64Data = matches[2];
    const file_name = `${getRandomString(+process.env.EXPENSE_CATEGORY_FILE_NAME_LENGTH)}.${format}`;

    await ExpenseCategory.addCategory(name, file_name, req.userId, req.mongooseSession);

    const expensePath = path.join(__dirname, '..', 'public', 'expense', file_name);
    await uploadFile(expensePath, base64Data);

    res.json({status: 201, msg: 'Category created successfully'});
}

function getRandomString(length) {
    return crypto.randomBytes(length).toString('hex');
}

async function uploadFile(path, base64Data) {
    await new Promise(function(resolve, reject) {
        fs.writeFile(path, base64Data, 'base64', function(error) {
            if (error) return reject(new TransactionError({status: 500, msg: 'Failed to save image to the server'}));
            resolve();
        });
    });
}

module.exports = {addCategory};