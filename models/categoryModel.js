const Joi = require('joi');
const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});
const Category = mongoose.model('Category', categorySchema);

function validated(category) {
    const categorySchema = {
        name: Joi.string().required().min(3)       
    };
    return Joi.validate(category, categorySchema);
}

exports.Category = Category;
exports.categorySchema = categorySchema;
exports.validated = validated;