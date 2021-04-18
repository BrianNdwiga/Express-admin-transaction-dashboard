const express = require('express')
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()

const Transaction = require('./models/transaction');
const Customer = require('./models/customer')
    // connect to mongodb & listen for requests
const dbURI = process.env.db;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000), console.log('connected'))
    .catch(err => console.log(err));
// register view engine
app.set('view engine', 'ejs');

// middleware & static files
// app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

app.get('/', (req, res) => {
    // res.send('Hello World!')
    res.render('content');
});

app.get('/customers', (req, res) => {
    Customer.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('customers', { customers: result });
        })
        .catch(err => {
            console.log(err);
        });
})

app.get('/customerForm', (req, res) => {
    // res.send('Hello World!')
    res.render('customerForm');
})

// customer
app.post('/customers', (req, res) => {
    // console.log(req.body);
    const customer = new Customer(req.body);

    customer.save()
        .then(result => {
            res.redirect('/customers');
        })
        .catch(err => {
            console.log(err);
        });
});

// transactions
app.get('/transactionForm', (req, res) => {
    res.render('transactionForm');

})

app.get('/transactions', (req, res) => {
    Transaction.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('transactions', { transactions: result });
        })
        .catch(err => {
            console.log(err);
        });
})

// post
app.post('/transactions', (req, res) => {
    // console.log(req.body);
    const transaction = new Transaction(req.body);

    transaction.save()
        .then(result => {
            res.redirect('/transactions');
        })
        .catch(err => {
            console.log(err);
        });
});


app.get('/transactions/:id', (req, res) => {
    const id = req.params.id;
    Transaction.findById(id)
        .then(result => {
            res.render('updateTransactions', { transaction: result });
        })
        .catch(err => {
            console.log(err);
        });
});

app.put('/transactions/:id', (req, res) => {
    updateRecord(req, res);
    res.redirect('/transactions');
})

function updateRecord() {
    Transaction.updateOne({ _id: req.params.id }, transaction).then(
        () => {
            res.redirect('/transactions');
        }
    ).catch(
        (error) => {
            console.log(err);
        }
    );

};

app.delete('/transactions/:id', (req, res) => {
    const id = req.params.id;

    Transaction.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/transactions' });
        })
        .catch(err => {
            console.log(err);
        });
});