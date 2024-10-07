const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    expense: {
        type: String,
        maxlength: 255,
        required: true
    },
    expense_date: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'ExpenseCategory',
        required: true
    }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;