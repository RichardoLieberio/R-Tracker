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
        uppercase: true,
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
    return await this.find().sort({created_at: -1}).populate('created_by', 'name').populate('updated_by', 'name');
}

expenseCategorySchema.statics.getCategoriesForUser = async function() {
    return await this.find({hidden: false}).select('name icon color').sort({created_at: -1});
}

expenseCategorySchema.statics.getCategory = async function(id) {
    return await this.findById(id);
}

expenseCategorySchema.statics.addCategory = async function(data, icon, created_by, session) {
    return await this.create([{...data, icon, created_by}], {session});
}

expenseCategorySchema.statics.editCategory = async function(_id, data, updated_by, session) {
    return await this.findOneAndUpdate({_id}, {...data, updated_by, updated_at: Date.now()}, {session});
}

expenseCategorySchema.statics.hideCategory = async function(_id, updated_by) {
    return await this.findOneAndUpdate({_id}, {hidden: true, updated_by, updated_at: Date.now()}, {new: true}).populate('created_by', 'name').populate('updated_by', 'name');
}

expenseCategorySchema.statics.unhideCategory = async function(_id, updated_by) {
    return await this.findOneAndUpdate({_id}, {hidden: false, updated_by, updated_at: Date.now()}, {new: true}).populate('created_by', 'name').populate('updated_by', 'name');
}

expenseCategorySchema.statics.deleteCategory = async function(id) {
    return await this.findByIdAndDelete(id);
}

const ExpenseCategory = mongoose.model('ExpenseCategory', expenseCategorySchema);

module.exports = ExpenseCategory;