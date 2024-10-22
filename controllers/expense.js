const Expense = require('../models/Expense');
const ExpenseCategory = require('../models/ExpenseCategory');

async function getCategories(req, res) {
    const categories = await ExpenseCategory.getCategoriesForUser();
    res.json({status: 200, msg: 'Categories retrieved successfully', categories});
}

async function getExpenses(req, res) {
    const expenses = await Expense.getExpenses(req.userId);
    res.json({status: 200, msg: 'Expenses retrieved successfully', expenses});
}

module.exports = {getCategories, getExpenses};