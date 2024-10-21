const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const TransactionError = require('../services/TransactionError');
const mongooseIdValidation = require('../services/mongooseIdValidation');

const ExpenseCategory = require('../models/ExpenseCategory');

async function getCategories(req, res) {
    const categories = await ExpenseCategory.getCategories();
    res.json({status: 200, msg: 'Categories retrieved successfully', categories});
}

async function addCategory(req, res) {
    const {name, icon} = req.data;

    const {file_name, base64Data} = getIconConfiguration(icon);
    await ExpenseCategory.addCategory(name, file_name, req.userId, req.mongooseSession);

    const expensePath = path.join(__dirname, '..', 'public', 'expense', file_name);
    await uploadFile(expensePath, base64Data);

    res.json({status: 201, msg: 'Expense category created successfully'});
}

async function editCategory(req, res) {
    if (!mongooseIdValidation(req.params.id)) return res.json({status: 404, msg: 'Expense category not found'});
    let file_name, base64Data;

    if (req.data.icon) {
        const iconConfiguration = getIconConfiguration(req.data.icon);
        file_name = iconConfiguration.file_name;
        base64Data = iconConfiguration.base64Data;

        req.data.icon_path = iconConfiguration.file_name;
        delete req.data.icon;
    }

    const data = await ExpenseCategory.editCategory(req.params.id, req.data, req.userId);
    if (!data) return res.json({status: 404, msg: 'Expense category not found'});

    if (req.data.icon_path) {
        const expensePath = path.join(__dirname, '..', 'public', 'expense', file_name);
        await uploadFile(expensePath, base64Data);
    }

    res.json({status: 200, msg: 'Expense category updated successfully', data})
}

function getIconConfiguration(icon) {
    const matches = icon.match(/^data:(image\/\w+);base64,(.+)$/);
    const format = matches[1].split('/')[1];
    const base64Data = matches[2];
    const file_name = `${crypto.randomBytes(+process.env.EXPENSE_CATEGORY_FILE_NAME_LENGTH).toString('hex')}.${format}`;
    return {file_name, base64Data};
}

async function uploadFile(path, base64Data) {
    await new Promise(function(resolve, reject) {
        fs.writeFile(path, base64Data, 'base64', function(error) {
            if (error) return reject(new TransactionError({status: 500, msg: 'Failed to save image to the server'}));
            resolve();
        });
    });
}

module.exports = {getCategories, addCategory, editCategory};