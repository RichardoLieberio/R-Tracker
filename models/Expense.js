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

expenseSchema.statics.getExpenses = async function(user_id) {
    return await this.find({user_id});
}

expenseSchema.statics.addExpense = async function(data, user_id) {
    const {expense, expenseDate: expense_date, category: category_id} = data;
    return await this.create({expense, expense_date, user_id, category_id});
}

expenseSchema.statics.editExpense = async function(_id, user_id, data) {
    const {expense, expenseDate: expense_date, category: category_id} = data;
    return await this.findOneAndUpdate({_id, user_id}, {expense, expense_date, category_id});
}

expenseSchema.statics.deleteExpense = async function(_id, user_id) {
    return !!await this.findOneAndDelete({_id, user_id});
}

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;