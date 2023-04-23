require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
//const cors = require("cors");
var session = require('express-session');
const config = require("./config/config.js");
var path = require('path');
const {
    db
} = require('./config/config.js');
const {
    prototype
} = require('events');

//session connection
var user;
var login;

//connection to mysql
var connection = mysql.createConnection({
    host: db.DB_HOST,
    user: db.DB_USER,
    password: db.DB_PASS,
    database: db.DB_NAME
});

const app = express();

//set up templates
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// LOGIN PAGE
app.get("/", (req, res) => {
    //res.sendFile(path.join(__dirname + '/login.html'));
    if (login == true && user == req.session.username)
        res.redirect('/home');
    else
        res.render(__dirname + '/views/login');
    /*connection.connect((err) => {
        if (err) throw err
        else
            console.log("connected")
    })*/
    //console.log("login")
});

//VERIFY LOGIN
app.post('/auth', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM account WHERE username = ? AND password = ? AND (roles = "SUPER_ADMIN" OR roles = "SUPER_SUPER_ADMIN")', [username, password], function (err, results, fields) {
            if (err) throw err
            if (results.length > 0) {
                request.session.loggedin = true;
                login = true;
                request.session.username = username;
                user = username;
                response.status(200).send(results);
            } else {
                response.status(401);
            }
            //response.end();
        });
    } else {
        response.status(401);
        //response.end();
    }
});

//HOME PAGE
app.get('/home', function (request, response) {
    if (request.session.loggedin) {
        connection.query('SELECT id, firstname, lastname FROM account WHERE username = ? AND (roles = "SUPER_ADMIN" OR roles = "SUPER_SUPER_ADMIN")', [request.session.username], function (err, results, fields) {
            if (err) throw err;
            //console.log(results);
            response.status(200); //('Welcome back, ' + request.session.username + '!<br><a href="/logout">Logout</a>');
        });
    } else {
        response.status(401);
    }
    //console.log("home")
    //response.end();
});

//call route to display all clients on backoffice homepage (home.ejs)
app.get('/api/clients', function (req, res) {
    connection.query('SELECT * FROM account WHERE roles = "ROLE_ADMIN"', function (err, results) {
        if (err)
            throw err;
        else
            res.status(200).send(results);
    });
});

//POST ADD CLIENT
app.post('/api/clients', function (req, res) {
    //console.log(req.body);
    var client = {
        roles: req.body.roles,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender_id: req.body.gender_id,
        username: req.body.username,
        password: req.body.lastname,
        registration_date: '2021-05-22 22:12:20',
        address: req.body.address,
        postal_code: req.body.postal_code,
        cgu_status: 1,
        enabled: 1,
        birthdate: '2021-05-22 22:12:20',
        restaurant_id: 3
    }
    connection.query('INSERT INTO account SET ?', client, function (err, results) {
        if (err)
            throw err;
        else
            res.status(200).send(results);
    });
});

//UPDATE CLIENT INFO
app.put('/api/clients/:id', function (req, res) {
    //console.log(req.body);
    var client = {
        roles: req.body.roles,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender_id: req.body.gender_id,
        username: req.body.username,
        password: req.body.lastname,
        registration_date: '2021-05-22 22:12:20',
        address: req.body.address,
        postal_code: req.body.postal_code,
        cgu_status: 1,
        enabled: 1,
        birthdate: '2021-05-22 22:12:20',
        restaurant_id: 3
    }
    connection.query('UPDATE account SET ? WHERE id = ?', [client, req.params.id], function (err, results) {
        if (err)
            throw err;
        else
            res.status(200).send(results);
    });
});

app.get('/restaurants', (req, res) => {
    if (login == true && user == req.session.username) {
        console.log(req.body);
        connection.query('SELECT * FROM restaurant', null, function (err, results) {
            if (err)
                throw err;
            else
                console.log(results);
        });
    } else
        res.send('login first bitch');
});

app.get('/orders', (req, res) => {
    if (login == true && user == req.session.username) {
        console.log(req.body);
        connection.query('SELECT * FROM site_order', null, function (err, results) {
            if (err)
                throw err;
            else
                console.log(results);
        });
    } else
        res.send('login first bitch');
});

app.get('/restaurants', (req, res) => {
    if (login == true && user == req.session.username) {
        console.log(req.body);
        connection.query('SELECT * FROM restaurant', null, function (err, results) {
            if (err)
                throw err;
            else
                console.log(results);
        });
    } else
        res.send('login first bitch');
});

app.get('/dishes', (req, res) => {
    if (login == true && user == req.session.username) {
        console.log(req.body);
        connection.query('SELECT * FROM dish', null, function (err, results) {
            if (err)
                throw err;
            else
                console.log(results);
        });
    } else
        res.send('login first bitch');
});

//DELETE CLIENT
app.delete('/api/clients/:id', function (req, res) {
    //console.log(req.body);
    connection.query('DELETE FROM account WHERE id = ?', [req.params.id], function (err, results) {
        if (err)
            throw err;
        else
            res.status(200).send(results);
    });
});

//LOGOUT
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/"); //Inside a callback… bulletproof!
    });
});

// set port, listen for requests
const PORT = process.env.PORT;
module.exports = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})