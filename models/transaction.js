const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    date: {
        type: Date,
    },
    sendername: {
        type: String,
        required: true,
    },
    beneficiary: {
        type: String,
        required: true,
    },
    transactiontype: {
        type: String,
        required: true
    },
    paymentmethods: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    referencenumber: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;