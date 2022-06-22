const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isVip: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});
const Customer = mongoose.model('Customer', customerSchema);

function validated(customer) {
    const customerSchema = {
        name: Joi.string().required().min(5).max(50),
        isVip: Joi.boolean().required(),
        phone: Joi.string().min(5).max(50).required()       
    };
    return Joi.validate(customer, customerSchema);
}

exports.Customer = Customer;
exports.validated = validated;