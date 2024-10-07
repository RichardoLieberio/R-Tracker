const mongoose = require('mongoose');

const expenseCategorySchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 30,
        trim: true,
        required: true
    },
    icon_path: {
        type: String,
        trim: true,
        required: true
    },
    hidden: {
        type: Boolean,
        default: false,
        required: true
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    updated_by: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    updated_at: {
        type: Date
    }
});

const ExpenseCategory = mongoose.model('ExpenseCategory', expenseCategorySchema);

module.exports = ExpenseCategory;