const mongoose = require('mongoose');

const expenseCategorySchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 30,
        trim: true,
        required: true
    },
    icon: {
        type: String,
        trim: true,
        required: true
    },
    color: {
        type: String,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 6,
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

expenseCategorySchema.statics.isCategoryUseable = async function(_id) {
    return !!await this.findOne({_id, hidden: false});
}

expenseCategorySchema.statics.getCategoriesForAdmin = async function() {
    return await this.find();
}

expenseCategorySchema.statics.getCategoriesForUser = async function() {
    return await this.find({hidden: false}).select('name icon color');
}

expenseCategorySchema.statics.getCategory = async function(id) {
    return await this.findById(id);
}

expenseCategorySchema.statics.addCategory = async function(data, icon, created_by, session) {
    await this.create([{...data, icon, created_by}], {session});
}

expenseCategorySchema.statics.editCategory = async function(_id, data, updated_by, session) {
    return await this.findOneAndUpdate({_id}, {...data, updated_by, updated_at: Date.now()}, {session});
}

expenseCategorySchema.statics.deleteCategory = async function(id) {
    return await this.findByIdAndDelete(id);
}

const ExpenseCategory = mongoose.model('ExpenseCategory', expenseCategorySchema);

module.exports = ExpenseCategory;