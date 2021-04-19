const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
    },
    currency: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    group: {
        type: String,
    },
    status: {
        type: String,
    }
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;