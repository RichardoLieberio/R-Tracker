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

async function addExpense(req, res) {
    const expense = await Expense.addExpense(req.data, req.userId);
    res.json({status: 201, msg: 'New expense added', expense});
}

module.exports = {getCategories, getExpenses, addExpense};