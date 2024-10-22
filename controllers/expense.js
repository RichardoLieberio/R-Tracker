const ExpenseCategory = require('../models/ExpenseCategory');

async function getCategories(req, res) {
    const categories = await ExpenseCategory.getCategories();
    res.json({status: 200, msg: 'Categories retrieved successfully', categories});
}

module.exports = {getCategories};