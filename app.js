const express = require('express')
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Transaction = require('./models/transaction');
const Customer = require('./models/customer')
    // const port = 3000

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://brian:test123@node-tuts.ggxki.mongodb.net/node-tuts??authSource=node-tuts&w=1";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err));
// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

app.get('/', (req, res) => {
    // res.send('Hello World!')
    res.render('content');
})

app.get('/customers', (req, res) => {
    // res.send('Hello World!')
    res.render('customers');
})

app.get('/customerForm', (req, res) => {
    // res.send('Hello World!')
    res.render('customerForm');
})

app.get('/transactions', (req, res) => {
    // res.send('Hello World!')
    res.render('transactions');
})

app.get('/transactionForm', (req, res) => {
    // res.send('Hello World!')
    res.render('transactionForm');
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
// cutomer
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
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })