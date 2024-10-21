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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true
    },
    updated_at: {
        type: Date
    }
});

expenseCategorySchema.statics.getCategories = async function() {
    return await this.find();
}

expenseCategorySchema.statics.addCategory = async function(name, icon_path, created_by, session) {
    await this.create([{name, icon_path, created_by}], {session});
}

const ExpenseCategory = mongoose.model('ExpenseCategory', expenseCategorySchema);

module.exports = ExpenseCategory;