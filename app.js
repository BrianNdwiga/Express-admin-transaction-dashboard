const express = require('express')
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dashboardRoutes = require('./routes/dashboardRoutes')


const dotenv = require("dotenv");
dotenv.config();

const User = require("./models/user");
// connect to mongodb & listen for requests
const db = process.env.db;
const port = process.env.PORT;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(port), console.log('connected'))
    .catch(err => console.log(err));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// register view engine
app.set('view engine', 'ejs');

// middleware & static files
// app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'));
// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());


// initialize express-session to allow us track the logged-in user across sessions.
app.use(
    session({
        key: "user_sid",
        secret: "somerandonstuffs",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 300000,
        },
    })
);

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie("user_sid");
    }
    next();
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect("/dashboard");
    } else {
        next();
    }
};

// Login
// route for user signup
app
    .route("/signup")
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + "/public/signup.html");
    })
    .post((req, res) => {

        var user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        user.save((err, docs) => {
            if (err) {
                res.redirect("/signup");
                // save new user
            } else {
                console.log(docs)
                req.session.user = docs;
                res.redirect("/dashboard");
            }
        });
    });

// route for user Login
app
    .route("/login")
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + "/public/login.html");
    })
    .post(async(req, res) => {
        var username = req.body.username,
            password = req.body.password;

        try {
            var user = await User.findOne({ username: username }).exec();
            if (!user) {
                res.redirect("/login");
            }
            user.comparePassword(password, (error, match) => {
                if (!match) {
                    res.redirect("/login");
                }
            });
            req.session.user = user;
            res.redirect("/dashboard");
        } catch (error) {
            console.log(error)
        }
    });
// route for user's dashboard
app.get("/", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + "/public/home.html");
    } else {
        res.redirect("/login");
    }
});

// route for user logout
app.get("/logout", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie("user_sid");
        res.redirect("/");
    } else {
        res.redirect("/login");
    }
});

// dashboard routes controller
// use the routes after /dashboard
app.use('/dashboard', dashboardRoutes);

// route for handling 404 requests(unavailable routes)
app.use(function(req, res, next) {
    res.status(404).send("Sorry can't find that!");
});