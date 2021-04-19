const express = require('express')
const router = express();
const dashboardController = require('../controllers/dashboardController')
    // Dashboard
router.get('/', dashboardController.dashboard_content);

// customers
router.get('/customers', dashboardController.dashboard_customers_get);

router.get('/customerForm', dashboardController.dashboard_customerform);

// customer
router.post('/customers', dashboardController.dashboard_customers_post);

router.get('/customers/:id', dashboardController.dashboard_customers_id);

router.delete('/customers/:id', dashboardController.dashboard_customers_delete);

// transactions
router.get('/transactionForm', dashboardController.dashboard_transactionform)

router.get('/transactions', dashboardController.dashboard_transactions);

// post
router.post('/transactions', dashboardController.dashboard_transactions_post);

router.get('/transactions/:id', dashboardController.dashboard_transactions_id);

router.delete('/transactions/:id', dashboardController.dashboard_transactions_delete);

module.exports = router;