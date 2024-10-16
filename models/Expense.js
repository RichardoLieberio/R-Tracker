const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    expense: {
        type: String,
        maxlength: 255,
        trim: true,
        required: true
    },
    expense_date: {
        type: Date,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExpenseCategory',
        trim: true,
        required: true
    }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;