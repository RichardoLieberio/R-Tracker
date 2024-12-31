const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const TransactionError = require('../services/TransactionError');
const mongooseIdValidation = require('../services/mongooseIdValidation');

const ExpenseCategory = require('../models/ExpenseCategory');

async function getCategories(req, res) {
    const categories = await ExpenseCategory.getCategoriesForAdmin();
    res.json({status: 200, msg: 'Categories retrieved successfully.', categories});
}

async function addCategory(req, res) {
    const {file_name, base64Data} = getIconConfiguration(req.data.icon);
    const [data] = await ExpenseCategory.addCategory(req.data, file_name, req.userId, req.mongooseSession);

    const iconPath = path.join(__dirname, '..', 'public', 'expense', file_name);
    await uploadFile(iconPath, base64Data);

    res.json({status: 201, msg: 'Expense category created successfully.', data});
}

async function getCategory(req, res) {
    if (!mongooseIdValidation(req.params.id)) return res.json({status: 404, msg: 'Expense category not found.'});
    const category = await ExpenseCategory.getCategory(req.params.id);
    category ? res.json({status: 200, msg: 'Category retrieved successfully.', category}) : res.json({status: 404, msg: 'Expense category not found.'});
}

async function editCategory(req, res) {
    if (!mongooseIdValidation(req.params.id)) return res.json({status: 404, msg: 'Failed to edit. Expense category not found.'});

    let file_name, base64Data;
    if (req.data.icon) {
        ({file_name, base64Data} = getIconConfiguration(req.data.icon));
        req.data.icon = file_name;
    }

    const {oldData, newData} = await ExpenseCategory.editCategory(req.params.id, req.data, req.userId, req.mongooseSession);
    if (!newData) throw new TransactionError({status: 404, msg: 'Failed to edit. Expense category not found.'});

    if (req.data.icon) {
        const newIconPath = path.join(__dirname, '..', 'public', 'expense', req.data.icon);
        const oldIconPath = path.join(__dirname, '..', 'public', 'expense', oldData.icon);

        await uploadFile(newIconPath, base64Data);
        deleteFile(oldIconPath);
    }

    res.json({status: 200, msg: 'Expense category updated successfully.', data: newData});
}

async function deleteCategory(req, res) {
    if (!mongooseIdValidation(req.params.id)) return res.json({status: 404, msg: 'Failed to delete. Expense category not found.'});

    const data = await ExpenseCategory.deleteCategory(req.params.id);
    if (!data) return res.json({status: 404, msg: 'Failed to delete. Expense category not found.'});

    const iconPath = path.join(__dirname, '..', 'public', 'expense', data.icon);
    deleteFile(iconPath);

    res.json({status: 200, msg: 'Expense category deleted successfully.', id: data._id});
}

async function hideCategory(req, res) {
    if (!mongooseIdValidation(req.params.id)) return res.json({status: 404, msg: 'Failed to hide. Expense category not found.'});

    const data = await ExpenseCategory.hideCategory(req.params.id, req.userId);
    if (!data) return res.json({status: 404, msg: 'Failed to hide. Expense category not found.'});

    res.json({status: 200, msg: 'Expense category hid successfully.', data});
}

async function unhideCategory(req, res) {
    if (!mongooseIdValidation(req.params.id)) return res.json({status: 404, msg: 'Failed to unhide. Expense category not found.'});

    const data = await ExpenseCategory.unhideCategory(req.params.id, req.userId);
    if (!data) return res.json({status: 404, msg: 'Failed to unhide. Expense category not found.'});

    res.json({status: 200, msg: 'Expense category unhid successfully.', data});
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
            if (error) return reject(new TransactionError({status: 500, msg: 'Failed to save image to the server.'}));
            resolve();
        });
    });
}

async function deleteFile(path) {
    fs.unlink(path, function(error) {
        if (error) console.log(`Failed to delete file: ${path}. Error: ${error.message}`);
    });
}

module.exports = {getCategories, addCategory, getCategory, editCategory, deleteCategory, hideCategory, unhideCategory};