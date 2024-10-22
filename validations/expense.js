const mongooseIdValidation = require('../services/mongooseIdValidation');

const ExpenseCategory = require('../models/ExpenseCategory');

async function addExpense(req, res, next) {
    const {expense, expenseDate, category} = req.body;
    const errorMsg = {};
    req.data = {};

    const expenseValidation = validateExpense(expense);
    expenseValidation.error
    ? errorMsg['expense'] = expenseValidation.error
    : req.data['expense'] = expenseValidation.expense;

    const expenseDateValidation = validateExpenseDate(expenseDate);
    expenseDateValidation.error
    ? errorMsg['expenseDate'] = expenseDateValidation.error
    : req.data['expenseDate'] = expenseDateValidation.expenseDate;

    const categoryValidation = await validateCategory(category);
    categoryValidation.error
    ? errorMsg['category'] = categoryValidation.error
    : req.data['category'] = categoryValidation.category;

    if (Object.entries(errorMsg).length) return res.json({status: 422, msg: errorMsg});
    next();
}

async function editExpense(req, res, next) {
    const {expense, expenseDate, category} = req.body;
    const errorMsg = {};
    req.data = {};

    const expenseValidation = validateExpense(expense);
    expenseValidation.error
    ? errorMsg['expense'] = expenseValidation.error
    : req.data['expense'] = expenseValidation.expense;

    const expenseDateValidation = validateExpenseDate(expenseDate);
    expenseDateValidation.error
    ? errorMsg['expenseDate'] = expenseDateValidation.error
    : req.data['expenseDate'] = expenseDateValidation.expenseDate;

    const categoryValidation = await validateCategory(category);
    categoryValidation.error
    ? errorMsg['category'] = categoryValidation.error
    : req.data['category'] = categoryValidation.category;

    if (Object.entries(errorMsg).length) return res.json({status: 422, msg: errorMsg});
    next();
}

function validateExpense(expense) {
    if (!expense) return {error: 'Expense is required'};
    if (typeof(expense) !== 'string') return {error: 'Expense must be string'};

    expense = expense.trim().replace(/\s+/g, ' ');

    if (!expense) return {error: 'Expense is required'};
    if (expense.length > 255) return {error: 'Expense length exceeds 255 characters'};

    return {expense};
}

function validateExpenseDate(expenseDate) {
    if (!expenseDate) return {error: 'Expense date is required'};
    if (typeof(expenseDate) !== 'string') return {error: 'Expense date must be string'};

    expenseDate = expenseDate.trim();

    const isoFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$|^\d{4}-\d{2}-\d{2}$/;
    if (!isoFormatRegex.test(expenseDate) || isNaN(new Date(expenseDate).getTime())) return {error: 'Expense date is invalid'};

    return {expenseDate};
}

async function validateCategory(category) {
    if (!category) return {error: 'Category is required'};
    if (typeof(category) !== 'string') return {error: 'Category must be string'};

    category = category.trim();

    if (!category) return {error: 'Category is required'};
    if (!mongooseIdValidation(category) || !await ExpenseCategory.isCategoryUseable(category)) return {error: 'Category is invalid'};

    return {category};
}

module.exports = {addExpense, editExpense};