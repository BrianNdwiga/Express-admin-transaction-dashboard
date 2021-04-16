const express = require('express')
const app = express();
const morgan = require('morgan');
const port = 3000

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    // res.send('Hello World!')
    res.render('index');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})