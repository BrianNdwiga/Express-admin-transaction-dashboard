const Transaction = require('../models/transaction');
const Customer = require('../models/customer');
// dashboard_customer, dashboard_customerform, dashboard_delete
const dashboard_content = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        Transaction.estimatedDocumentCount()
        Customer.estimatedDocumentCount()
            .then(result => {
                res.render('content', { transactioncount: result, customercount: result });
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        res.redirect("/login");
    }
}

const dashboard_customers_get = (req, res) => {
    Customer.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('customers', { customers: result });
        })
        .catch(err => {
            console.log(err);
        });
}

const dashboard_customerform = (req, res) => {
    res.render('customerForm');
}

const dashboard_customers_post = (req, res) => {
    const customer = new Customer(req.body);

    customer.save()
        .then(result => {
            res.redirect('/dashboard/customers');
        })
        .catch(err => {
            console.log(err);
        });
}
const dashboard_customers_id = (req, res) => {
    const id = req.params.id;
    Customer.findById(id)
        .then(result => {
            res.render('updateCustomers', { customer: result });
        })
        .catch(err => {
            console.log(err);
        });
};
const dashboard_customers_delete = (req, res) => {
    const id = req.params.id;

    Customer.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/dashboard/customers' });
        })
        .catch(err => {
            console.log(err);
        });
};

// transaction controllers
const dashboard_transactionform = (req, res) => {
    res.render('transactionForm');
};

const dashboard_transactions = (req, res) => {
    Transaction.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('transactions', { transactions: result });
        })
        .catch(err => {
            console.log(err);
        });
};

const dashboard_transactions_post = (req, res) => {
    const transaction = new Transaction(req.body);

    transaction.save()
        .then(result => {
            res.redirect('/dashboard/transactions');
        })
        .catch(err => {
            console.log(err);
        });
};

const dashboard_transactions_id = (req, res) => {
    const id = req.params.id;
    Transaction.findById(id)
        .then(result => {
            res.render('updateTransactions', { transaction: result });
        })
        .catch(err => {
            console.log(err);
        });
}

const dashboard_transactions_delete = (req, res) => {
    const id = req.params.id;

    Transaction.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/dashboard/transactions' });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    dashboard_content,
    dashboard_customers_get,
    dashboard_customerform,
    dashboard_customers_post,
    dashboard_customers_id,
    dashboard_customers_delete,
    dashboard_transactionform,
    dashboard_transactions,
    dashboard_transactions_post,
    dashboard_transactions_id,
    dashboard_transactions_delete
}