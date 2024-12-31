const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    expense: {
        type: String,
        maxlength: 255,
        trim: true,
        required: true
    },
    amount: {
        type: Number,
        min: 0,
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
    const {expense, amount, expenseDate: expense_date, category: category_id} = data;
    return await this.create([{expense, amount, expense_date, user_id, category_id}]);
}

expenseSchema.statics.editExpense = async function(_id, user_id, data) {
    const {expense, amount, expenseDate: expense_date, category: category_id} = data;
    return await this.findOneAndUpdate({_id, user_id}, {expense, amount, expense_date, category_id}, {new: true});
}

expenseSchema.statics.deleteExpense = async function(_id, user_id) {
    return !!await this.findOneAndDelete({_id, user_id});
}

expenseSchema.statics.deleteAllExpense = async function(user_id, session) {
    await this.deleteMany({user_id}, {session});
}

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;